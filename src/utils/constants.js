/**
 * @fileoverview Application constants and configuration.
 * Central repository for static data and configuration values.
 * @version 1.0.0
 */

/**
 * Site metadata for SEO.
 * Per SRS Section 3.2.2 (NFR-2.1 through NFR-2.13).
 */
export const SITE_META = {
    title: 'Andalusian Castle | Luxury Hotel in Andalusia, Spain',
    description: 'Experience timeless elegance at Andalusian Castle, a five-star luxury hotel offering world-class accommodations, spa, dining, and unforgettable experiences in the heart of Andalusia.',
    keywords: 'luxury hotel, Andalusia, Spain, five-star, spa, fine dining, boutique hotel, castle hotel',
    ogImage: '/images/og-image.jpg',
    twitterHandle: '@andalusiancastle',
};

/**
 * Navigation section IDs.
 */
export const SECTION_IDS = [
    'home',
    'rooms',
    'amenities',
    'dining',
    'gallery',
    'testimonials',
    'offers',
    'location',
    'contact',
];

/**
 * Breakpoints matching global.css variables.
 * Per SRS Section 3.2.3 (NFR-3.2).
 */
export const BREAKPOINTS = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
};

/**
 * Animation durations in milliseconds.
 */
export const ANIMATION_DURATIONS = {
    fast: 150,
    base: 300,
    slow: 500,
};

/**
 * Z-index layers.
 */
export const Z_INDEX = {
    base: 1,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    tooltip: 600,
};
