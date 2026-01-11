# Andalusian Castle - Luxury Hotel Website

<div align="center">

![Andalusian Castle](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-Private-D4AF37?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-22c55e?style=for-the-badge)

**A luxury static single-page application for the Andalusian Castle hotel.**

[Live Demo](#) · [Features](#features) · [Getting Started](#getting-started) · [Deployment](#deployment)

</div>

---

## ✨ Features

- **Luxury Golden Theme** - Elegant design with Playfair Display & Montserrat typography
- **Parallax Hero** - Full-viewport hero with video/image support
- **Interactive Gallery** - 30+ images with masonry grid and lightbox
- **Auto-Rotating Testimonials** - Carousel with star ratings and review badges
- **Validated Contact Form** - Real-time validation with sanitization
- **Fully Responsive** - Mobile-first design (320px to 1920px+)
- **WCAG 2.1 AA Compliant** - Full accessibility support
- **SEO Optimized** - JSON-LD schema, meta tags, sitemap

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/andalusian-castle.git

# Navigate to project
cd andalusian-castle

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/      # Button, Card, GoldenDivider, etc.
│   ├── layout/      # Navigation, Header, Footer
│   └── sections/    # Hero, Rooms, Amenities, etc.
├── assets/
│   └── styles/      # global.css with design tokens
├── hooks/           # useScrollAnimation, useScrollPosition
└── utils/           # validation, performance, accessibility
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Gold | `#D4AF37` |
| Charcoal | `#1A1A1A` |
| Heading Font | Playfair Display |
| Body Font | Montserrat |

## 🌐 Deployment

### GitHub Pages (Automatic)

Push to `main` branch triggers automatic deployment via GitHub Actions.

### Manual Deployment

```bash
npm run build
# Upload /build folder to your host
```

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | >90 |
| Lighthouse Accessibility | >90 |
| Lighthouse SEO | >90 |
| TTI | <4s |
| LCP | <3s |

Run Lighthouse audit:
```bash
npm run lighthouse:local
```

## 📝 License

Private - All rights reserved © 2026 Andalusian Castle

---

<div align="center">
Made with ❤️ and ☕
</div>
