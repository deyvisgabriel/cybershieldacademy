/**
 * CyberShield Academy - script.js
 * Interacciones, animaciones y lógica del frontend
 * Color: Navy Blue #1D4ED8
 */

/* =====================================================
   1. PARTICLE SYSTEM
   ===================================================== */

function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 55;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = i % 5 === 0 ? 'particle large' : 'particle';

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 20;

        // Random travel vectors
        const tx = (Math.random() - 0.5) * 200;
        const ty = -(Math.random() * 300 + 100);

        particle.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            --tx: ${tx}px;
            --ty: ${ty}px;
        `;

        container.appendChild(particle);
    }
}

/* =====================================================
   2. NAVBAR SCROLL BEHAVIOR
   ===================================================== */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (!ticking) {
            requestAnimationFrame(() => {
                if (currentScrollY > 60) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide navbar on fast scroll down, show on scroll up
                if (currentScrollY > lastScrollY + 80 && currentScrollY > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else if (currentScrollY < lastScrollY - 10 || currentScrollY < 100) {
                    navbar.style.transform = 'translateY(0)';
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
}

/* =====================================================
   3. MOBILE MENU
   ===================================================== */

function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!toggle || !menu) return;

    // Toggle menu
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.contains('open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    function openMobileMenu() {
        menu.classList.add('open');
        toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* =====================================================
   4. SMOOTH SCROLL
   ===================================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* =====================================================
   5. SCROLL REVEAL (INTERSECTION OBSERVER)
   ===================================================== */

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after first reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
}

/* =====================================================
   6. ANIMATED COUNTERS
   ===================================================== */

function animateCounter(element, target, duration = 2200) {
    let start = 0;
    const increment = target / (duration / 16);
    let current = 0;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const startTime = performance.now();

    const tick = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOut(progress);
        current = Math.round(easedProgress * target);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    requestAnimationFrame(tick);
}

function initCounters() {
    const counterElements = document.querySelectorAll('[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
                entry.target.setAttribute('data-counted', 'true');
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));

    // Also observe metric counters (without data-target, use different approach)
    const metricCounters = document.querySelectorAll('.metric-number[data-target]');
    metricCounters.forEach(el => {
        counterObserver.observe(el);
    });
}

/* =====================================================
   7. FLIP CARDS — Hover para Desktop / Clic para Móvil
   ===================================================== */

function initFlipCards() {
    const flipCards = document.querySelectorAll('.service-card-flip');

    // Función para detectar si estamos en un dispositivo móvil/táctil
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice()) {
        // --- COMPORTAMIENTO PARA TELÉFONOS / TABLETS (Clic) ---
        flipCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // No interferir con el botón "Inscribirme" del reverso
                if (e.target.closest('.service-cta-btn')) return;

                const isFlipped = card.classList.contains('flipped');

                // Cerrar cualquier otra tarjeta abierta
                flipCards.forEach(c => c.classList.remove('flipped'));

                // Si no estaba girada → girarla; si ya estaba → queda cerrada
                if (!isFlipped) {
                    card.classList.add('flipped');
                }
            });
        });

        // Clic en cualquier parte del documento para cerrar tarjetas
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.service-card-flip')) {
                flipCards.forEach(card => card.classList.remove('flipped'));
            }
        });

    } else {
        // --- COMPORTAMIENTO PARA COMPUTADORAS (Hover) ---
        // Ahora que los bugs de CSS están solucionados, el hover será estable.
        flipCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('flipped');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('flipped');
            });
        });
    }
}

/* =====================================================
   8. PARALLAX SCROLL
   ===================================================== */

function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    const heroBgGlow = document.querySelector('.hero-bg-glow');

    if (!heroVisual) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;

                if (heroVisual && scrolled < window.innerHeight) {
                    heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
                }

                if (heroBgGlow) {
                    heroBgGlow.style.transform = `translateY(${scrolled * 0.1}px)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* =====================================================
   9. CURSOR GLOW EFFECT
   ===================================================== */

function initCursorGlow() {
    // Only on desktop
    if ('ontouchstart' in window) return;

    const cursor = document.createElement('div');
    cursor.id = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(29, 78, 216, 0.06) 0%, transparent 70%);
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        z-index: 0;
        will-change: transform;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    const animateCursor = () => {
        curX += (mouseX - curX) * 0.08;
        curY += (mouseY - curY) * 0.08;
        cursor.style.transform = `translate(${curX - 150}px, ${curY - 150}px)`;
        requestAnimationFrame(animateCursor);
    };

    animateCursor();
}

/* =====================================================
   10. NAVBAR ACTIVE LINK ON SCROLL
   ===================================================== */

function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));

    // Active nav link style
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--text-primary);
        }
        .nav-link.active::after {
            width: 60%;
        }
    `;
    document.head.appendChild(style);
}

/* =====================================================
   11. COUNTRY PHONE PICKER
   ===================================================== */

const COUNTRIES = [
    { name: 'Afghanistan',            flag: '🇦🇫', dial: '+93'   },
    { name: 'Albania',                flag: '🇦🇱', dial: '+355'  },
    { name: 'Alemania',               flag: '🇩🇪', dial: '+49'   },
    { name: 'Arabia Saudita',         flag: '🇸🇦', dial: '+966'  },
    { name: 'Argentina',              flag: '🇦🇷', dial: '+54'   },
    { name: 'Australia',              flag: '🇦🇺', dial: '+61'   },
    { name: 'Austria',                flag: '🇦🇹', dial: '+43'   },
    { name: 'Bélgica',                flag: '🇧🇪', dial: '+32'   },
    { name: 'Bolivia',                flag: '🇧🇴', dial: '+591'  },
    { name: 'Brasil',                 flag: '🇧🇷', dial: '+55'   },
    { name: 'Canadá',                 flag: '🇨🇦', dial: '+1'    },
    { name: 'Chile',                  flag: '🇨🇱', dial: '+56'   },
    { name: 'China',                  flag: '🇨🇳', dial: '+86'   },
    { name: 'Colombia',               flag: '🇨🇴', dial: '+57'   },
    { name: 'Corea del Sur',          flag: '🇰🇷', dial: '+82'   },
    { name: 'Costa Rica',             flag: '🇨🇷', dial: '+506'  },
    { name: 'Cuba',                   flag: '🇨🇺', dial: '+53'   },
    { name: 'Dinamarca',              flag: '🇩🇰', dial: '+45'   },
    { name: 'Ecuador',                flag: '🇪🇨', dial: '+593'  },
    { name: 'Egipto',                 flag: '🇪🇬', dial: '+20'   },
    { name: 'El Salvador',            flag: '🇸🇻', dial: '+503'  },
    { name: 'Emiratos Árabes',        flag: '🇦🇪', dial: '+971'  },
    { name: 'España',                 flag: '🇪🇸', dial: '+34'   },
    { name: 'Estados Unidos',         flag: '🇺🇸', dial: '+1'    },
    { name: 'Filipinas',              flag: '🇵🇭', dial: '+63'   },
    { name: 'Finlandia',              flag: '🇫🇮', dial: '+358'  },
    { name: 'Francia',                flag: '🇫🇷', dial: '+33'   },
    { name: 'Ghana',                  flag: '🇬🇭', dial: '+233'  },
    { name: 'Guatemala',              flag: '🇬🇹', dial: '+502'  },
    { name: 'Honduras',               flag: '🇭🇳', dial: '+504'  },
    { name: 'India',                  flag: '🇮🇳', dial: '+91'   },
    { name: 'Indonesia',              flag: '🇮🇩', dial: '+62'   },
    { name: 'Irak',                   flag: '🇮🇶', dial: '+964'  },
    { name: 'Irán',                   flag: '🇮🇷', dial: '+98'   },
    { name: 'Irlanda',                flag: '🇮🇪', dial: '+353'  },
    { name: 'Israel',                 flag: '🇮🇱', dial: '+972'  },
    { name: 'Italia',                 flag: '🇮🇹', dial: '+39'   },
    { name: 'Japón',                  flag: '🇯🇵', dial: '+81'   },
    { name: 'Kazajistán',             flag: '🇰🇿', dial: '+7'    },
    { name: 'Kenya',                  flag: '🇰🇪', dial: '+254'  },
    { name: 'Malasia',                flag: '🇲🇾', dial: '+60'   },
    { name: 'Marruecos',              flag: '🇲🇦', dial: '+212'  },
    { name: 'México',                 flag: '🇲🇽', dial: '+52'   },
    { name: 'Nicaragua',              flag: '🇳🇮', dial: '+505'  },
    { name: 'Nigeria',                flag: '🇳🇬', dial: '+234'  },
    { name: 'Noruega',                flag: '🇳🇴', dial: '+47'   },
    { name: 'Nueva Zelanda',          flag: '🇳🇿', dial: '+64'   },
    { name: 'Países Bajos',           flag: '🇳🇱', dial: '+31'   },
    { name: 'Pakistán',               flag: '🇵🇰', dial: '+92'   },
    { name: 'Panamá',                 flag: '🇵🇦', dial: '+507'  },
    { name: 'Paraguay',               flag: '🇵🇾', dial: '+595'  },
    { name: 'Perú',                   flag: '🇵🇪', dial: '+51'   },
    { name: 'Polonia',                flag: '🇵🇱', dial: '+48'   },
    { name: 'Portugal',               flag: '🇵🇹', dial: '+351'  },
    { name: 'Puerto Rico',            flag: '🇵🇷', dial: '+1'    },
    { name: 'Reino Unido',            flag: '🇬🇧', dial: '+44'   },
    { name: 'República Dominicana',   flag: '🇩🇴', dial: '+1'    },
    { name: 'Rusia',                  flag: '🇷🇺', dial: '+7'    },
    { name: 'Singapur',               flag: '🇸🇬', dial: '+65'   },
    { name: 'Sudáfrica',              flag: '🇿🇦', dial: '+27'   },
    { name: 'Suecia',                 flag: '🇸🇪', dial: '+46'   },
    { name: 'Suiza',                  flag: '🇨🇭', dial: '+41'   },
    { name: 'Tailandia',              flag: '🇹🇭', dial: '+66'   },
    { name: 'Turquía',                flag: '🇹🇷', dial: '+90'   },
    { name: 'Ucrania',                flag: '🇺🇦', dial: '+380'  },
    { name: 'Uruguay',                flag: '🇺🇾', dial: '+598'  },
    { name: 'Venezuela',              flag: '🇻🇪', dial: '+58'   },
    { name: 'Vietnam',                flag: '🇻🇳', dial: '+84'   },
];

// Estado global del picker
let selectedCountry = COUNTRIES.find(c => c.name === 'Bolivia') || COUNTRIES[0];

function initCountryPicker() {
    const btn        = document.getElementById('country-picker-btn');
    const dropdown   = document.getElementById('country-dropdown');
    const list       = document.getElementById('country-list');
    const searchInput= document.getElementById('country-search');
    const flagEl     = document.getElementById('selected-flag');
    const dialEl     = document.getElementById('selected-dial');

    if (!btn || !dropdown || !list) return;

    // Render inicial
    renderCountryList(COUNTRIES);
    updatePickerDisplay();

    // Abrir / cerrar dropdown
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        closeDropdown();
        if (!isOpen) openDropdown();
    });

    // Buscar
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        const filtered = COUNTRIES.filter(c =>
            c.name.toLowerCase().includes(query) || c.dial.includes(query)
        );
        renderCountryList(filtered);
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDropdown();
    });

    function openDropdown() {
        dropdown.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        searchInput.value = '';
        renderCountryList(COUNTRIES);
        setTimeout(() => searchInput.focus(), 50);
        // Scroll al elemento seleccionado
        const selected = list.querySelector('.selected');
        if (selected) selected.scrollIntoView({ block: 'nearest' });
    }

    function closeDropdown() {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    }

    function renderCountryList(countries) {
        if (countries.length === 0) {
            list.innerHTML = '<li class="country-list-empty">Sin resultados</li>';
            return;
        }
        list.innerHTML = countries.map((c, i) => `
            <li class="country-item ${c.name === selectedCountry.name ? 'selected' : ''}"
                data-index="${COUNTRIES.indexOf(c)}"
                role="option"
                aria-selected="${c.name === selectedCountry.name}">
                <span class="ci-flag">${c.flag}</span>
                <span class="ci-name">${c.name}</span>
                <span class="ci-code">${c.dial}</span>
            </li>
        `).join('');

        // Click en item
        list.querySelectorAll('.country-item').forEach(item => {
            item.addEventListener('click', () => {
                const idx = parseInt(item.dataset.index);
                selectedCountry = COUNTRIES[idx];
                updatePickerDisplay();
                closeDropdown();
            });
        });
    }

    function updatePickerDisplay() {
        if (flagEl) flagEl.textContent = selectedCountry.flag;
        if (dialEl) dialEl.textContent = selectedCountry.dial;
    }
}

/* =====================================================
   12. FORM HANDLER — WhatsApp
   ===================================================== */

const WHATSAPP_NUMBER = '59177839461'; // Número destino de WhatsApp (sin el +)

function submitForm() {
    const nombreEl = document.getElementById('input-nombre');
    const emailEl = document.getElementById('input-email');
    const celularEl = document.getElementById('input-celular');
    const cursoEl = document.getElementById('input-curso');
    const btn = document.getElementById('btn-submit-form');

    const nombre = nombreEl?.value.trim();
    const email = emailEl?.value.trim();
    const localNumber = celularEl?.value.trim();
    const dialCode = selectedCountry ? selectedCountry.dial : '';
    const celular = localNumber ? `${dialCode} ${localNumber}` : '';
    const curso = cursoEl?.value;

    // --- Validaciones ---
    if (!nombre || !email || !localNumber || !curso) {
        showNotification('⚠️ Por favor completa todos los campos', 'warning');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('⚠️ Ingresa un email válido', 'warning');
        return;
    }

    if (!isValidPhone(localNumber)) {
        showNotification('⚠️ Ingresa un número de celular válido (mínimo 7 dígitos)', 'warning');
        return;
    }

    // --- Loading state ---
    if (btn) {
        btn.innerHTML = '<span>Redirigiendo...</span>';
        btn.disabled = true;
    }

    // --- Construir mensaje para WhatsApp ---
    const cursoLabel = cursoEl.options[cursoEl.selectedIndex]?.text || curso;
    const mensaje = `¡Hola! Me interesa reservar mi lugar en CyberShield Academy 🛡️

*Nombre:* ${nombre}
*Email:* ${email}
*Celular:* ${celular}
*Curso de interés:* ${cursoLabel}

Quedo a la espera de más información. ¡Gracias!`;

    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

    // --- Mostrar notificación y redirigir ---
    showNotification('✅ ¡Todo listo! Serás redirigido a WhatsApp.', 'success');

    setTimeout(() => {
        window.open(urlWhatsApp, '_blank');

        // Restaurar botón y limpiar formulario
        if (btn) {
            btn.innerHTML = `<span>Reservar Mi Lugar Ahora</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
            btn.disabled = false;
        }
        if (nombreEl) nombreEl.value = '';
        if (emailEl) emailEl.value = '';
        if (celularEl) celularEl.value = '';
        if (cursoEl) cursoEl.value = '';
    }, 1000);
}


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    // Acepta dígitos, espacios, guiones y el signo +; mínimo 7 dígitos
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7;
}

/* =====================================================
   12. NOTIFICATION SYSTEM
   ===================================================== */

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const colors = {
        success: { bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)', text: '#22C55E' },
        warning: { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', text: '#F59E0B' },
        info: { bg: 'rgba(29, 78, 216, 0.12)', border: 'rgba(29, 78, 216, 0.3)', text: '#3b82f6' }
    };

    const c = colors[type] || colors.info;

    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.style.cssText = `
        position: fixed;
        top: 90px;
        right: 24px;
        max-width: 380px;
        padding: 16px 20px;
        background: ${c.bg};
        border: 1px solid ${c.border};
        border-radius: 14px;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        color: ${c.text};
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5;
        z-index: 9999;
        transform: translateX(110%);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        cursor: pointer;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Show
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });

    // Auto-dismiss
    const dismissTimeout = setTimeout(() => {
        dismissToast(toast);
    }, 5000);

    // Manual dismiss
    toast.addEventListener('click', () => {
        clearTimeout(dismissTimeout);
        dismissToast(toast);
    });
}

function dismissToast(toast) {
    toast.style.transform = 'translateX(110%)';
    setTimeout(() => toast.remove(), 400);
}

/* =====================================================
   13. TYPING EFFECT (optional) for Hero Title
   ===================================================== */

// Subtle glitch effect on hero title gradient
function initGlitchEffect() {
    const titleGradients = document.querySelectorAll('.title-gradient');

    titleGradients.forEach(el => {
        setInterval(() => {
            el.style.filter = 'brightness(1.2)';
            setTimeout(() => {
                el.style.filter = '';
            }, 150);
        }, 4000 + Math.random() * 2000);
    });
}

/* =====================================================
   14. IMAGE LAZY LOADING
   ===================================================== */

function initLazyImages() {
    const images = document.querySelectorAll('img[src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.4s ease';
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => {
        img.style.opacity = '0';
        imageObserver.observe(img);
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

/* =====================================================
   15. SHOWCASE CARD HOVER GLOW
   ===================================================== */

function initCardHoverGlow() {
    // Excluir CUALQUIER elemento que esté dentro de .service-card-flip
    // Las tarjetas de cursos son 100% por clic, sin efectos de hover
    const allCards = document.querySelectorAll('.glass-card, .showcase-card');
    const cards = Array.from(allCards).filter(card => !card.closest('.service-card-flip'));

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.background = `
                radial-gradient(
                    circle at ${x}% ${y}%,
                    rgba(29, 78, 216, 0.1) 0%,
                    rgba(29, 78, 216, 0.05) 40%,
                    rgba(29, 78, 216, 0.03) 100%
                )
            `;
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
}

/* =====================================================
   INITIALIZE ALL
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initParticles();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initCountryPicker();
    initCounters();
    initFlipCards();
    initActiveNavLinks();

    // Visual enhancements
    initCursorGlow();
    initGlitchEffect();
    initLazyImages();
    initCardHoverGlow();

    // Parallax (only on non-mobile)
    if (window.innerWidth > 768) {
        initParallax();
    }

    console.log('%c🛡️ CyberShield Academy', 'color: #3b82f6; font-weight: bold; font-size: 18px;');
    console.log('%cWeb desarrollada con Dark Luxury Design System', 'color: #71717a; font-size: 12px;');
});

// Handle resize
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        initParallax();
    }
}, 300));

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
