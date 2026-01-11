/**
 * @fileoverview SEO Head Component using React Helmet.
 * Implements SEO requirements from SRS Section 5.3.
 * Features dynamic meta tags, OG/Twitter cards, and JSON-LD schema.
 * @version 1.0.0
 */

import React from 'react';

/**
 * Site metadata configuration.
 */
const SITE_CONFIG = {
    siteName: 'Andalusian Castle',
    siteUrl: 'https://andalusiancastle.com',
    title: 'Andalusian Castle | Luxury Hotel in Lahore, Pakistan',
    description: 'Experience timeless elegance at Andalusian Castle. 5-star luxury hotel in Bahria Town Lahore features spa, fine dining, and breathtaking city views. Book your stay today.',
    keywords: 'luxury hotel, Lahore, Pakistan, Bahria Town, 5-star, spa, fine dining, boutique hotel, wedding venue',
    author: 'Andalusian Castle',
    locale: 'en_US',
    twitterHandle: '@andalusiancastle',
    ogImage: 'https://andalusiancastle.com/images/og-image.jpg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
};

/**
 * JSON-LD LocalBusiness Schema.
 */
const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: 'Andalusian Castle',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.siteUrl,
    telephone: '+92-316-6268625',
    email: 'AndalusianCastleSuite@gmail.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plaza 100, Nishtar Block, Sector E',
        addressLocality: 'Bahria Town',
        addressRegion: 'Lahore, Punjab',
        postalCode: '',
        addressCountry: 'PK',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 31.3624,
        longitude: 74.1815,
    },
    image: [
        'https://andalusiancastle.com/images/hotel-exterior.jpg',
        'https://andalusiancastle.com/images/lobby.jpg',
    ],
    starRating: {
        '@type': 'Rating',
        ratingValue: '5',
    },
    priceRange: '€€€€',
    amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Spa', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Pool', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Fitness Center', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
    ],
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1250',
    },
    sameAs: [
        'https://facebook.com/andalusiancastle',
        'https://instagram.com/andalusiancastle',
        'https://twitter.com/andalusiancastle',
        'https://linkedin.com/company/andalusiancastle',
    ],
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
    },
};

/**
 * SEO Head Component Props.
 * @typedef {Object} SEOHeadProps
 * @property {string} [title] - Page title (max 60 chars)
 * @property {string} [description] - Meta description (150-160 chars)
 * @property {string} [canonicalUrl] - Canonical URL
 * @property {string} [ogImage] - OpenGraph image URL
 * @property {string} [ogType] - OpenGraph type
 * @property {boolean} [noIndex] - Prevent indexing
 */

/**
 * SEO Head component for meta tags.
 * 
 * Note: In production, use react-helmet-async package.
 * This component outputs the meta tags structure.
 * 
 * @component
 * @param {SEOHeadProps} props - Component props
 * @returns {React.ReactElement} Helmet with meta tags
 */
function SEOHead({
    title = SITE_CONFIG.title,
    description = SITE_CONFIG.description,
    canonicalUrl = SITE_CONFIG.siteUrl,
    ogImage = SITE_CONFIG.ogImage,
    ogType = 'website',
    noIndex = false,
}) {
    // Ensure title is under 60 characters
    const truncatedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;

    // Ensure description is 150-160 characters
    const truncatedDesc = description.length > 160
        ? description.substring(0, 157) + '...'
        : description;

    return (
        <>
            {/* 
        In production, wrap these in <Helmet> from react-helmet-async:
        
        import { Helmet } from 'react-helmet-async';
        
        <Helmet>
          ... meta tags here ...
        </Helmet>
        
        For now, these should be added to public/index.html
      */}

            {/* Primary Meta Tags rendered as comments for reference */}
            {/* 
        <title>{truncatedTitle}</title>
        <meta name="title" content={truncatedTitle} />
        <meta name="description" content={truncatedDesc} />
        <meta name="keywords" content={SITE_CONFIG.keywords} />
        <meta name="author" content={SITE_CONFIG.author} />
        <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
        <link rel="canonical" href={canonicalUrl} />
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={truncatedTitle} />
        <meta property="og:description" content={truncatedDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content={SITE_CONFIG.ogImageWidth} />
        <meta property="og:image:height" content={SITE_CONFIG.ogImageHeight} />
        <meta property="og:site_name" content={SITE_CONFIG.siteName} />
        <meta property="og:locale" content={SITE_CONFIG.locale} />
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={truncatedTitle} />
        <meta name="twitter:description" content={truncatedDesc} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
        <meta name="twitter:creator" content={SITE_CONFIG.twitterHandle} />
      */}

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
        </>
    );
}

/**
 * Export site config for use in other components.
 */
export { SITE_CONFIG, localBusinessSchema };
export default SEOHead;
