# 🛡️ CyberShield Academy — Landing Page Premium

Centro de Capacitación en Seguridad de la Información  
**Modo Oscuro · Azul Marino · Dark Luxury Design**

---

## 📁 Estructura del Proyecto

```
Proyecto MKT/
├── index.html          # Página principal completa
├── styles.css          # Sistema de diseño completo (Dark Luxury)
├── script.js           # Interacciones y animaciones
├── README.md           # Esta documentación
└── images/
    ├── logo.png                  # Logo neon azul marino
    ├── hero_visual.png           # Escudo holográfico 3D
    ├── service_1.png             # Ethical Hacking & Pentesting
    ├── service_2.png             # Seguridad de Aplicaciones Web
    ├── service_3.png             # Análisis Forense Digital
    ├── service_4.png             # Criptografía y PKI
    ├── service_5.png             # Seguridad en Redes
    ├── service_6.png             # Cumplimiento y Normativas
    └── about_image.png           # Centro de Operaciones / About
```

---

## 🎨 Paleta de Colores

| Variable CSS | Valor HEX | Uso |
|---|---|---|
| `--accent` | `#1D4ED8` | Acento principal |
| `--accent-bright` | `#3B82F6` | Glow y efectos |
| `--accent-dim` | `#1e3a8a` | Gradientes profundos |
| `--bg-primary` | `#000000` | Fondo negro puro |
| `--bg-secondary` | `#09090B` | Secciones alternadas |
| `--bg-tertiary` | `#18181B` | Cards |
| `--text-primary` | `#FFFFFF` | Títulos |
| `--text-tertiary` | `#A1A1AA` | Subtítulos |

---

## 🏗️ Secciones

1. **🔝 Navbar** — Sticky con blur al scroll, logo + links
2. **🦸 Hero** — Full-screen con animación del shield, estadísticas contadas
3. **🤝 Social Proof** — Carrusel de certificaciones (EC-Council, ISACA, CompTIA...)
4. **📚 Cursos** — 6 Flip Cards interactivas con imágenes reales
5. **⚡ Por qué Elegirnos** — Grid de métricas + lista de features
6. **💬 Testimonios** — 3 tarjetas con estrellas y avatares
7. **👤 Sobre Nosotros** — Layout imagen + contenido
8. **🚀 CTA Final** — Formulario de inscripción con glowing button
9. **🦶 Footer** — Links organizados + redes sociales

---

## ✨ Características Técnicas

### Animaciones
- **55 partículas** flotantes generadas dinámicamente
- **Flip Cards 3D** con CSS `transform: rotateY(180deg)` (hover en desktop, tap en mobile)
- **Contadores animados** con easing cúbico
- **Scroll Reveal** con Intersection Observer
- **Parallax suave** en hero (0.15x velocidad)
- **Cursor glow** sutil que sigue al mouse
- **Floating animation** en imagen hero
- **Glitch effect** sutil en títulos degradados
- **Infinite marquee** en sección de partners

### Rendimiento
- `will-change` en elementos animados críticos
- `passive: true` en event listeners de scroll
- `requestAnimationFrame` para animaciones fluidas
- Debounce en evento resize
- Intersection Observer para lazy loading de imágenes

### Responsive
- **Desktop XL** (1440px+): Layout completo máximo
- **Desktop** (1024-1440px): Ajustes de espaciado
- **Tablet** (768-1023px): 2 columnas, menú visible
- **Mobile** (hasta 767px): 1 columna, hamburger menu, flip por tap

---

## 🎯 Cursos Incluidos

| # | Curso | Tags |
|---|---|---|
| 1 | Ethical Hacking & Pentesting | CEH, Metasploit, Kali Linux, OSCP |
| 2 | Seguridad de Aplicaciones Web | OWASP, Burp Suite, SAST/DAST, DevSecOps |
| 3 | Análisis Forense Digital | Autopsy, Volatility, CHFI, Malware |
| 4 | Criptografía y PKI | AES/RSA, TLS/SSL, PKI, Zero-Knowledge |
| 5 | Seguridad en Redes | Firewall, IDS/IPS, VPN, Network Forensics |
| 6 | Cumplimiento y Normativas | ISO 27001, PCI-DSS, GDPR, ISMS |

---

## 🛠️ Cómo Personalizar

### Cambiar nombre del negocio
Busca y reemplaza `CyberShield Academy` en `index.html`

### Cambiar color principal
En `styles.css`, actualiza la variable:
```css
--accent: #1D4ED8;         /* Tu color principal */
--accent-rgb: 29, 78, 216; /* En formato RGB */
```

### Cambiar información de contacto
En `index.html` busca la sección `footer-links footer-contact` y actualiza email, teléfono y ubicación.

### Agregar/quitar servicios
Las Flip Cards están en la sección `#servicios`. Cada card sigue esta estructura:
```html
<div class="service-card-flip">
    <div class="service-card-inner">
        <div class="service-card-front">
            <img src="images/service_X.png" ...>
            ...
        </div>
        <div class="service-card-back glass-card">
            ...
        </div>
    </div>
</div>
```

---

## 🚀 Para Publicar

### Opción 1: Netlify (recomendado, gratis)
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta del proyecto
3. ¡Listo! URL automática

### Opción 2: GitHub Pages
1. Sube a un repositorio GitHub
2. Settings > Pages > Main Branch
3. URL: `tu-usuario.github.io/repo`

### Opción 3: Hosting Tradicional
Sube todos los archivos via FTP al directorio raíz de tu servidor.

---

## 📊 Métricas de Rendimiento Esperadas

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Lighthouse Score**: 85-95+

---

© 2026 CyberShield Academy. Todos los derechos reservados.  
Desarrollado con **Dark Luxury Design System** — Azul Marino Edition
