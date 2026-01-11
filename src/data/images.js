/**
 * @fileoverview Image assets manifest with proper paths.
 * Documents 50+ required images with specifications.
 * @version 1.0.0
 */

/**
 * Image specifications and requirements.
 * All images should be:
 * - Minimum resolution: 1920×1080
 * - Format: WebP (primary), AVIF (optional), JPG (fallback)
 * - Style: Golden hour grading, warm tones, luxury aesthetic
 */

export const IMAGE_MANIFEST = {
    hero: {
        background: {
            path: '/images/hero/castle-sunset.webp',
            alt: 'Andalusian Castle at golden hour',
            minWidth: 1920,
            minHeight: 1080,
            aspectRatio: '16:9',
            notes: 'Main hero image, castle exterior at sunset',
        },
        video: {
            path: '/videos/hero-aerial.mp4',
            webm: '/videos/hero-aerial.webm',
            poster: '/images/hero/castle-sunset.webp',
            duration: '15-30 seconds',
            notes: 'Looping aerial drone footage of castle and grounds',
        },
    },

    rooms: {
        deluxe: {
            main: '/images/rooms/deluxe.webp',
            gallery: [
                '/images/rooms/deluxe-1.webp',
                '/images/rooms/deluxe-2.webp',
                '/images/rooms/deluxe-3.webp',
                '/images/rooms/deluxe-4.webp',
                '/images/rooms/deluxe-5.webp',
            ],
        },
        executive: {
            main: '/images/rooms/executive.webp',
            gallery: [
                '/images/rooms/executive-1.webp',
                '/images/rooms/executive-2.webp',
                '/images/rooms/executive-3.webp',
                '/images/rooms/executive-4.webp',
                '/images/rooms/executive-5.webp',
            ],
        },
        royal: {
            main: '/images/rooms/royal.webp',
            gallery: [
                '/images/rooms/royal-1.webp',
                '/images/rooms/royal-2.webp',
                '/images/rooms/royal-3.webp',
                '/images/rooms/royal-4.webp',
                '/images/rooms/royal-5.webp',
            ],
        },
        presidential: {
            main: '/images/rooms/presidential.webp',
            gallery: [
                '/images/rooms/presidential-1.webp',
                '/images/rooms/presidential-2.webp',
                '/images/rooms/presidential-3.webp',
                '/images/rooms/presidential-4.webp',
                '/images/rooms/presidential-5.webp',
            ],
        },
    },

    amenities: {
        spa: '/images/amenities/spa.webp',
        fitness: '/images/amenities/fitness.webp',
        pool: '/images/amenities/pool.webp',
        business: '/images/amenities/business.webp',
        concierge: '/images/amenities/concierge.webp',
    },

    dining: {
        terraza: {
            main: '/images/dining/terraza.webp',
            dish: '/images/dining/terraza-dish.webp',
        },
        bar: {
            main: '/images/dining/bar.webp',
            cocktail: '/images/dining/bar-cocktail.webp',
        },
        roomService: {
            main: '/images/dining/room-service.webp',
            dish: '/images/dining/room-dish.webp',
        },
    },

    offers: {
        honeymoon: '/images/offers/honeymoon.webp',
        summer: '/images/offers/summer.webp',
        spa: '/images/offers/spa.webp',
        business: '/images/offers/business.webp',
    },

    testimonials: {
        avatars: [
            '/images/testimonials/avatar-1.webp',
            '/images/testimonials/avatar-2.webp',
            '/images/testimonials/avatar-3.webp',
            '/images/testimonials/avatar-4.webp',
            '/images/testimonials/avatar-5.webp',
            '/images/testimonials/avatar-6.webp',
        ],
    },

    gallery: {
        total: 50,
        categories: ['exterior', 'rooms', 'dining', 'spa', 'events'],
        imagesPerCategory: 10,
    },

    og: {
        image: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        notes: 'OpenGraph sharing image',
    },
};

/**
 * Placeholder image until real images are added.
 */
export const PLACEHOLDER_IMAGE = 'https://placehold.co/1920x1080/1A1A1A/D4AF37?text=Andalusian+Castle';

/**
 * Generate srcset for responsive images.
 */
export function generateImageSrcset(basePath, widths = [640, 960, 1280, 1920]) {
    const extension = basePath.split('.').pop();
    const base = basePath.replace(`.${extension}`, '');

    return widths
        .map((w) => `${base}-${w}w.${extension} ${w}w`)
        .join(', ');
}

export default IMAGE_MANIFEST;
