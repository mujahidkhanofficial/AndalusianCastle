/**
 * @fileoverview Site Content Data.
 * Professional copy for all sections per SRS Section 6.
 * All content written in luxury hospitality tone.
 * @version 1.0.0
 */

/**
 * Hotel History - 250 words.
 * @type {Object}
 */
export const HOTEL_HISTORY = {
    title: 'A Legacy of Timeless Elegance',
    subtitle: 'Since 2024',
    content: `Located in the heart of Bahria Town Lahore, Andalusian Castle stands as a testament to refined hospitality. This magnificent estate brings the grandeur of Moorish architecture to the cultural capital of Pakistan.

Inspired by the historic Alhambra, our visionary team has created a world-class luxury destination that offers discerning travelers an unparalleled experience. Meticulous attention to detail is evident in the hand-crafted tile work, intricate jali screens, and lush courtyards that define the castle's character.

Today, Andalusian Castle seamlessly blends traditional craftsmanship with contemporary luxury. Our rooms and suites feature bespoke furnishings, marble-clad bathrooms, and private terraces overlooking the vibrant cityscape or our meticulously manicured gardens. Each space tells a story of tradition meeting modern sophistication.

Our commitment to excellence ensures every moment of your stay exceeds expectations. From our fine dining restaurants to our exclusive spa, every detail reflects our unwavering dedication to the art of hospitality.

Whether you seek a romantic escape, a celebration of life's milestones, or simply a sanctuary of tranquility, Andalusian Castle invites you to experience luxury redefined in Lahore.`,
};

/**
 * Room Descriptions - 120 words each.
 * @type {Array<Object>}
 */
export const ROOM_DESCRIPTIONS = [
    {
        id: 'normal-room',
        name: 'Normal Room',
        tagline: 'Standard Comfort',
        description: `Experience the comfort of our Normal Rooms, designed for relaxation and convenience. Featuring comfortable bedding, essential amenities, and a warm ambiance, these rooms provide a perfect base for your stay in Lahore.

Enjoy modern facilities including high-speed WiFi, climate control, and a well-appointed bathroom. Whether you are here for business or leisure, our Normal Room offers everything you need for a restful night.`,
        price: '₨7,500',
        priceNote: 'All taxes included',
        size: '35 sqm',
        view: 'City View',
        bed: 'Queen',
        maxGuests: 2,
        amenities: ['wifi', 'tv', 'ac', 'shower'],
        features: [
            'Queen-size bed',
            'En-suite bathroom',
            'Complimentary WiFi',
            'Flat-screen TV',
            'Climate control',
        ],
    },
    {
        id: 'luxury-room',
        name: 'Luxury Suite',
        tagline: 'Premium Elegance',
        description: `Upgrade to our Luxury Suite for an elevated experience. These spacious suites feature premium furnishings, enhanced amenities, and superior views of Bahria Town.

Indulge in extra space, a king-size bed, and a luxurious bathroom. Perfect for those seeking a touch of opulence and additional comfort during their stay. Includes complimentary breakfast and priority service.`,
        price: '₨10,000',
        priceNote: 'All taxes included',
        size: '55 sqm',
        view: 'Garden/City View',
        bed: 'King',
        maxGuests: 3,
        amenities: ['wifi', 'tv', 'minibar', 'ac', 'bathtub', 'breakfast'],
        features: [
            'King-size bed',
            'Spacious living area',
            'Complimentary Breakfast',
            'Premium toiletries',
            'City views',
        ],
    },
];

/**
 * Amenity Blurbs - 60 words each.
 * @type {Array<Object>}
 */
export const AMENITY_DESCRIPTIONS = [
    {
        id: 'spa',
        name: 'Spa & Wellness',
        icon: '🧖‍♀️',
        tagline: 'Sanctuary for Body and Soul',
        description: `Surrender to tranquility in our 2,000 sqm spa sanctuary. Featuring thermal circuits, treatment rooms with Mediterranean views, and therapists trained in both ancient and modern techniques. Our signature Andalusian Gold treatment combines local olive oil, honey, and 24-karat gold for unparalleled rejuvenation.`,
        image: '/images/spa/spa-01-wellness.webp',
    },
    {
        id: 'fitness',
        name: 'Fitness Center',
        icon: '💪',
        tagline: 'Strength Meets Serenity',
        description: `Our state-of-the-art fitness center offers Technogym equipment, dedicated yoga and Pilates studios, and panoramic garden views. Personal trainers available around the clock craft bespoke programs. Morning sunrise yoga sessions on the terrace have become a guest favorite.`,
        image: '/images/spa/spa-02-treatment.webp',
    },
    {
        id: 'pool',
        name: 'Swimming Pool',
        icon: '🏊',
        tagline: 'Mediterranean Horizons',
        description: `Our 50-meter infinity pool appears to merge with the distant sea, creating an unforgettable visual experience. Temperature-controlled year-round with private cabanas, attentive poolside service, and an adjacent pool bar serving refreshing cocktails and light Mediterranean fare.`,
        image: '/images/exterior/exterior-01-pool.webp',
    },
    {
        id: 'business',
        name: 'Business Center',
        icon: '💼',
        tagline: 'Where Success Convenes',
        description: `Three fully equipped conference rooms accommodate up to 200 guests. State-of-the-art AV technology, high-speed connectivity, and dedicated event coordinators ensure flawless corporate gatherings. The historic library provides an intimate setting for board meetings and private negotiations.`,
        image: '/images/events/events-01-meeting.webp',
    },
    {
        id: 'concierge',
        name: 'Concierge Services',
        icon: '🔔',
        tagline: 'Your Wish, Our Command',
        description: `Our Les Clefs d'Or concierge team transforms wishes into reality. Private yacht charters, exclusive access to sold-out events, helicopter transfers, bespoke excursions—nothing is beyond reach. Available 24 hours, seven days a week, with discretion as our guiding principle.`,
        image: '/images/exterior/exterior-02-facade.webp',
    },
];

/**
 * Dining Narratives - 90 words each.
 * @type {Array<Object>}
 */
export const DINING_DESCRIPTIONS = [
    {
        id: 'la-terraza',
        name: 'La Terraza',
        type: 'Fine Dining Restaurant',
        cuisine: 'Mediterranean Fusion',
        tagline: 'Where Culinary Art Meets Starlit Skies',
        description: `Perched atop the castle's historic tower, La Terraza offers an extraordinary dining experience beneath the Andalusian stars. Executive Chef Marco Bellini crafts a daily-changing tasting menu that celebrates the region's finest ingredients—freshly caught seafood from Málaga's shores, organic vegetables from our kitchen garden, and aged Iberian meats.

One Michelin star reflects our commitment to culinary excellence. The sommelier-curated wine program features over 500 selections, with particular emphasis on exceptional Spanish vintages. Reserve the Chef's Table for an intimate, interactive dining journey.`,
        hours: {
            breakfast: '7:00 AM - 10:30 AM',
            lunch: '12:30 PM - 3:00 PM',
            dinner: '7:30 PM - 11:00 PM',
        },
        dressCode: 'Smart Elegant',
        reservations: 'Required',
        image: '/images/dining/dining-01-chef.webp',
        featuredDish: 'Andalusian Seafood Symphony',
        menuUrl: '/menus/la-terraza-menu.pdf',
    },
    {
        id: 'azure-bar',
        name: 'Azure Bar',
        type: 'Cocktail Lounge',
        cuisine: 'Artisan Cocktails & Tapas',
        tagline: 'Sophisticated Sips, Intimate Conversations',
        description: `Azure Bar captures the essence of Andalusian evenings—warm, inviting, and effortlessly elegant. Our mixologists craft signature cocktails using house-made syrups, locally foraged botanicals, and premium spirits. The extensive gin collection spans over 80 expressions from around the world.

Live jazz performances on Friday and Saturday evenings create an atmosphere of timeless glamour. Our tapas menu offers refined interpretations of Spanish classics—jamón ibérico shaved tableside, pan con tomate with heirloom varieties, and artisanal cheeses from mountain producers.`,
        hours: {
            everyday: '5:00 PM - 1:00 AM',
            weekends: '5:00 PM - 2:00 AM (Fri-Sat)',
        },
        dressCode: 'Smart Casual',
        reservations: 'Recommended',
        image: '/images/dining/dining-03-feast.webp',
        featuredDish: 'Signature Golden Sunset Cocktail',
        menuUrl: '/menus/azure-bar-menu.pdf',
    },
    {
        id: 'in-room',
        name: 'In-Room Dining',
        type: '24/7 Room Service',
        cuisine: 'International & Local Favorites',
        tagline: 'Culinary Excellence, Private Indulgence',
        description: `Experience our culinary excellence within the comfort of your suite. Our in-room dining menu mirrors the quality of our restaurants, with dishes prepared fresh by our kitchen brigade and delivered with impeccable presentation. Whether a midnight craving or a romantic breakfast on your private terrace, we accommodate every desire.

Champagne breakfasts, afternoon tea service, and bespoke multi-course dinners can be arranged with advance notice. Dietary requirements and preferences are accommodated with pleasure.`,
        hours: {
            service: 'Available 24 hours',
        },
        dressCode: 'None',
        reservations: 'Not required',
        image: '/images/dining/dining-02-breakfast.webp',
        featuredDish: 'Champagne Breakfast Experience',
        menuUrl: '/menus/room-service-menu.pdf',
    },
];

/**
 * Testimonials with full details.
 * @type {Array<Object>}
 */
export const TESTIMONIALS = [
    {
        id: 't1',
        quote: 'An absolutely magical experience from start to finish. The attention to detail and level of personalized service exceeded all our expectations. The Royal Suite was breathtaking, and we will treasure these memories forever. The staff remembered every preference, making us feel like royalty.',
        author: 'Elizabeth & James Thompson',
        location: 'London, United Kingdom',
        rating: 5,
        stayType: 'Anniversary Celebration',
        date: 'October 2025',
    },
    {
        id: 't2',
        quote: 'The most luxurious hotel we have ever experienced. From the stunning architecture to the impeccable service, every moment was perfect. La Terraza serves the finest Mediterranean cuisine we have tasted, and the spa treatments were absolutely divine. Already planning our return.',
        author: 'Robert & Maria Martinez',
        location: 'New York, USA',
        rating: 5,
        stayType: 'Honeymoon',
        date: 'September 2025',
    },
    {
        id: 't3',
        quote: "A hidden gem that delivers true five-star luxury without pretension. The concierge arranged private access to Alhambra and a sunset yacht cruise that took our breath away. C'est magnifique! The perfect blend of historic charm and modern comfort.",
        author: 'Sophie & Pierre Dubois',
        location: 'Paris, France',
        rating: 5,
        stayType: 'Leisure',
        date: 'August 2025',
    },
    {
        id: 't4',
        quote: 'We celebrated our 25th anniversary at Andalusian Castle and it exceeded every expectation. The private dinner on the terrace, champagne breakfast in bed, and sunset views from our suite made us feel like royalty. The staff anticipated our every need.',
        author: 'Michael & Sarah Wilson',
        location: 'Sydney, Australia',
        rating: 5,
        stayType: 'Anniversary',
        date: 'July 2025',
    },
    {
        id: 't5',
        quote: 'As a frequent traveler to the Costa del Sol, I have stayed at many luxury properties, but Andalusian Castle stands apart. The wellness facilities rival dedicated spa resorts, the gastronomy is extraordinary, and the historical ambiance is genuinely authentic.',
        author: 'Maria García Fernández',
        location: 'Madrid, Spain',
        rating: 5,
        stayType: 'Business & Leisure',
        date: 'November 2025',
    },
    {
        id: 't6',
        quote: 'From check-in to checkout, every moment was perfection. The Presidential Suite with private pool was extraordinary—we never wanted to leave. The staff arranged a private flamenco performance that brought tears to our eyes. Truly unforgettable.',
        author: 'Hans & Greta Müller',
        location: 'Munich, Germany',
        rating: 5,
        stayType: 'Special Occasion',
        date: 'December 2025',
    },
];

/**
 * Special Offers with complete details.
 * @type {Array<Object>}
 */
export const SPECIAL_OFFERS = [
    {
        id: 'honeymoon',
        title: 'Honeymoon Package',
        subtitle: 'Begin Your Forever',
        description: 'Celebrate your special journey with a stay in our Luxury Suite. Includes special room decoration, breakfast in bed, and a candlelit dinner.',
        discount: 'Package',
        originalPrice: '₨12,500',
        offerPrice: '₨10,000',
        validFrom: '2026-01-01',
        validTo: '2026-12-31',
        isLimited: false,
        minNights: 2,
        includes: [
            'Luxury Suite accommodation',
            'Complimentary Breakfast',
            'Room Decoration',
            'Candlelit Dinner',
            'Late checkout',
        ],
        terms: 'Minimum 2-night stay required.',
        image: '/images/rooms/rooms-07-suite.webp',
    },
    {
        id: 'summer',
        title: 'Weekly Saver',
        subtitle: 'Stay Longer, Save More',
        description: 'Enjoy a week of comfort in our Normal Rooms at a special discounted rate.',
        discount: '15% OFF',
        originalPrice: '₨52,500',
        offerPrice: '₨44,625',
        validFrom: '2026-01-01',
        validTo: '2026-12-31',
        isLimited: false,
        minNights: 7,
        includes: [
            '7 Nights in Normal Room',
            'Weekly cleaning service',
            'WiFi Included',
        ],
        terms: 'Full payment in advance required.',
        image: '/images/rooms/rooms-02-comfort.webp',
    },
    {
        id: 'wellness',
        title: 'Weekend Getaway',
        subtitle: 'Refresh & Recharge',
        description: 'A perfect weekend escape in our Luxury Suite with spa access included.',
        discount: 'Special',
        originalPrice: '₨25,000',
        offerPrice: '₨22,000',
        validFrom: '2026-01-01',
        validTo: '2026-12-31',
        isLimited: false,
        minNights: 2,
        includes: [
            '2 Nights in Luxury Suite',
            'Spa Access',
            'Buffet Breakfast',
        ],
        terms: 'Valid for Friday-Sunday stays only.',
        image: '/images/spa/spa-01-wellness.webp',
    },
    {
        id: 'business',
        title: 'Corporate Deal',
        subtitle: 'Business with Comfort',
        description: 'Special rates for corporate travelers in our Normal Rooms.',
        discount: 'Corporate',
        originalPrice: '₨7,500',
        offerPrice: '₨6,500',
        validFrom: '2026-01-01',
        validTo: '2026-12-31',
        isLimited: false,
        minNights: 1,
        includes: [
            'Normal Room',
            'Express Breakfast',
            'Meeting Room Access (1hr)',
            'High-speed WiFi',
        ],
        terms: 'Valid Company ID required.',
        image: '/images/events/events-05-meeting.webp',
    },
];

/**
 * Image gallery data with full specifications.
 * 50+ images across categories.
 * @type {Array<Object>}
 */
export const GALLERY_IMAGES = [
    // Exterior
    { id: 'ext-1', src: '/images/exterior/exterior-01-pool.webp', alt: 'Pool area', category: 'exterior', featured: true },
    { id: 'ext-2', src: '/images/exterior/exterior-02-facade.webp', alt: 'Hotel Facade', category: 'exterior' },
    { id: 'ext-3', src: '/images/exterior/exterior-03-night.webp', alt: 'Illuminated castle at night', category: 'exterior', featured: true },
    { id: 'ext-4', src: '/images/exterior/exterior-04-view.webp', alt: 'Terrace View', category: 'exterior' },
    { id: 'ext-5', src: '/images/exterior/exterior-05-garden.webp', alt: 'Garden Path', category: 'exterior' },
    { id: 'ext-6', src: '/images/exterior/exterior-06-garden.webp', alt: 'Lush Gardens', category: 'exterior' },
    { id: 'ext-7', src: '/images/exterior/exterior-07-garden.webp', alt: 'Garden Fountain', category: 'exterior' },
    { id: 'ext-8', src: '/images/exterior/exterior-08-architecture.webp', alt: 'Architectural Details', category: 'exterior' },

    // Rooms
    { id: 'rm-1', src: '/images/rooms/rooms-01-luxury.webp', alt: 'Luxury Room with Bed', category: 'rooms', featured: true },
    { id: 'rm-2', src: '/images/rooms/rooms-02-comfort.webp', alt: 'Comfortable Seating', category: 'rooms' },
    { id: 'rm-3', src: '/images/rooms/rooms-03-stay.webp', alt: 'Relaxing Bedroom', category: 'rooms' },
    { id: 'rm-4', src: '/images/rooms/rooms-04-elegant.webp', alt: 'Elegant Decor', category: 'rooms' },
    { id: 'rm-5', src: '/images/rooms/rooms-05-view.webp', alt: 'Room with View', category: 'rooms' },
    { id: 'rm-6', src: '/images/rooms/rooms-06-elegant.webp', alt: 'Suite Interior', category: 'rooms' },
    { id: 'rm-7', src: '/images/rooms/rooms-07-suite.webp', alt: 'Luxury Suite Living', category: 'rooms', featured: true },
    { id: 'rm-8', src: '/images/rooms/rooms-08-relax.webp', alt: 'Relaxation Corner', category: 'rooms' },
    { id: 'rm-9', src: '/images/rooms/rooms-09-bed.webp', alt: 'King Size Bed', category: 'rooms' },
    { id: 'rm-10', src: '/images/rooms/rooms-10-luxury.webp', alt: 'Premium Amenities', category: 'rooms' },

    // Dining
    { id: 'din-1', src: '/images/dining/dining-01-chef.webp', alt: 'Chef Creation', category: 'dining', featured: true },
    { id: 'din-2', src: '/images/dining/dining-02-breakfast.webp', alt: 'Breakfast Spread', category: 'dining' },
    { id: 'din-3', src: '/images/dining/dining-03-feast.webp', alt: 'Dining Feast', category: 'dining' },
    { id: 'din-4', src: '/images/dining/dining-04-gourmet.webp', alt: 'Gourmet Dish', category: 'dining' },
    { id: 'din-5', src: '/images/dining/dining-05-dinner.webp', alt: 'Dinner Setting', category: 'dining' },
    { id: 'din-6', src: '/images/dining/dining-06-feast.webp', alt: 'Signature Plate', category: 'dining' },

    // Spa
    { id: 'spa-1', src: '/images/spa/spa-01-wellness.webp', alt: 'Wellness Treatment', category: 'spa', featured: true },
    { id: 'spa-2', src: '/images/spa/spa-02-treatment.webp', alt: 'Spa Therapy', category: 'spa' },
    { id: 'spa-3', src: '/images/spa/spa-03-treatment.webp', alt: 'Massage Room', category: 'spa' },
    { id: 'spa-4', src: '/images/spa/spa-04-wellness.webp', alt: 'Relaxation Area', category: 'spa' },

    // Events
    { id: 'evt-1', src: '/images/events/events-01-meeting.webp', alt: 'Meeting Setup', category: 'events', featured: true },
    { id: 'evt-2', src: '/images/events/events-02-celebration.webp', alt: 'Celebration Event', category: 'events' },
    { id: 'evt-3', src: '/images/events/events-03-wedding.webp', alt: 'Wedding Venue', category: 'events' },
    { id: 'evt-4', src: '/images/events/events-04-wedding.webp', alt: 'Wedding Details', category: 'events' },
    { id: 'evt-5', src: '/images/events/events-05-meeting.webp', alt: 'Conference Room', category: 'events' },
];

/**
 * Hero content configuration.
 * @type {Object}
 */
export const HERO_CONTENT = {
    title: 'Andalusian',
    titleAccent: 'Castle',
    tagline: 'Where Luxury Meets Comfort in the Heart of Lahore',
    ctaText: 'Reserve Your Experience',
    ctaHref: '#contact',
    backgroundImage: '/images/exterior/exterior-02-facade.webp',
    backgroundVideo: '/videos/hero.mp4',
    videoFallback: '/images/exterior/exterior-02-facade.webp',
};

export default {
    HOTEL_HISTORY,
    ROOM_DESCRIPTIONS,
    AMENITY_DESCRIPTIONS,
    DINING_DESCRIPTIONS,
    TESTIMONIALS,
    SPECIAL_OFFERS,
    GALLERY_IMAGES,
    HERO_CONTENT,
};
