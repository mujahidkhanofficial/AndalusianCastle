# Assets Directory

This directory contains all static assets for the Andalusian Castle website.

## Structure

```
/assets
├── /images          # All image files
│   ├── /rooms       # Room category images
│   ├── /dining      # Restaurant and food images
│   ├── /amenities   # Facilities images
│   ├── /gallery     # Gallery high-res images
│   └── /offers      # Special offer banners
├── /icons           # SVG icons and icon fonts
└── /styles          # CSS stylesheets
    └── global.css   # Main stylesheet with design tokens
```

## Image Guidelines (Per SRS Section 6.2)

- **Resolution:** Minimum 1920×1080px for hero/featured images
- **Format:** WebP preferred, with JPEG fallback
- **Optimization:** All images should be optimized for web
- **Total:** Minimum 40-50 images required

## Adding Images

Replace placeholder references in components with actual image paths:

```javascript
// In component files, update image sources:
const image = '/images/rooms/deluxe-suite.webp';
```
