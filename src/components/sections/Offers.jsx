/**
 * @fileoverview Special Offers Section with Promotional Cards.
 * Implements FR-8.1 through FR-8.5 from SRS Section 3.1.8.
 * Features promotional grid, limited-time badges, and golden CTAs.
 * @version 3.0.0
 */

import React, { useState, useEffect, useRef } from 'react';

/**
 * Special offers data.
 * @type {Array<Object>}
 */
const OFFERS_DATA = [
    {
        id: 'honeymoon',
        title: 'Honeymoon Escape',
        description: 'Begin your forever with a romantic journey. Includes champagne arrival, couples spa treatment, candlelit dinner, and rose petal turndown service.',
        image: '/images/offers/honeymoon.webp',
        discount: '20% OFF',
        originalPrice: 1250,
        offerPrice: 999,
        validFrom: '2026-01-01',
        validTo: '2026-06-30',
        isLimited: true,
        terms: 'Minimum 3-night stay. Subject to availability. Cannot be combined with other offers.',
        includes: ['Royal Suite', 'Couples Spa', 'Private Dinner', 'Late Checkout'],
    },
    {
        id: 'summer',
        title: 'Summer Serenity',
        description: 'Escape the heat with our refreshing summer package. Pool access, daily breakfast, and evening cocktails included.',
        image: '/images/offers/summer.webp',
        discount: '25% OFF',
        originalPrice: 800,
        offerPrice: 599,
        validFrom: '2026-06-01',
        validTo: '2026-08-31',
        isLimited: true,
        terms: 'Minimum 2-night stay. Valid for bookings until August 15.',
        includes: ['Deluxe Room', 'Daily Breakfast', 'Pool Access', 'Welcome Cocktail'],
    },
    {
        id: 'wellness',
        title: 'Wellness Retreat',
        description: 'Rejuvenate your body and soul with our holistic wellness experience. Daily spa treatments and healthy dining options.',
        image: '/images/offers/spa.webp',
        discount: '15% OFF',
        originalPrice: 1100,
        offerPrice: 935,
        validFrom: '2026-01-01',
        validTo: '2026-12-31',
        isLimited: false,
        terms: 'Minimum 4-night stay. Spa treatments scheduled upon arrival.',
        includes: ['Executive Suite', 'Daily Spa', 'Wellness Menu', 'Yoga Classes'],
    },
    {
        id: 'business',
        title: 'Executive Package',
        description: 'Elevate your business travel with premium amenities. High-speed WiFi, meeting room access, and express services.',
        image: '/images/offers/business.webp',
        discount: '10% OFF',
        originalPrice: 550,
        offerPrice: 495,
        validFrom: '2026-01-01',
        validTo: '2026-12-31',
        isLimited: false,
        terms: 'Valid Sunday-Thursday. Airport transfer available at additional cost.',
        includes: ['Executive Suite', 'Meeting Room', 'Express Check-in', 'Business Lounge'],
    },
];

/**
 * Format date for display.
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

/**
 * Check if offer is expiring soon (within 30 days).
 * @param {string} validTo - End date string
 * @returns {boolean} True if expiring soon
 */
function isExpiringSoon(validTo) {
    const endDate = new Date(validTo);
    const today = new Date();
    const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
}

/**
 * Special Offers section component.
 * 
 * Features (per SRS Section 3.1.8):
 * - FR-8.1: Display current promotional offers
 * - FR-8.2: Validity dates and terms
 * - FR-8.3: "Limited Time" badges
 * - FR-8.4: "Book Offer" CTA buttons
 * - FR-8.5: Visually appealing presentation
 * 
 * @component
 * @returns {React.ReactElement} Offers section element
 */
function Offers() {
    const [visibleCards, setVisibleCards] = useState(new Set());
    const cardsRef = useRef([]);

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.dataset.index;
                        setVisibleCards((prev) => new Set([...prev, index]));
                    }
                });
            },
            { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="offers"
            className="offers section section--champagne"
            aria-labelledby="offers-title"
        >
            <div className="container">
                {/* Section Header */}
                <header className="section-header text-center">
                    <h2 id="offers-title" className="section-title">
                        Special <span className="text-gold">Offers</span>
                    </h2>
                    <div className="divider-gold" aria-hidden="true" />
                    <p className="section-subtitle">
                        Indulge in exclusive packages crafted to enhance your stay
                        with exceptional value and unforgettable experiences.
                    </p>
                </header>

                {/* Offers Grid - FR-8.1 */}
                <div className="offers__grid">
                    {OFFERS_DATA.map((offer, index) => (
                        <article
                            key={offer.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            data-index={index}
                            className={`offers__card ${visibleCards.has(String(index)) ? 'offers__card--visible' : ''}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Limited Time Badge - FR-8.3 */}
                            {offer.isLimited && (
                                <span className="offers__badge offers__badge--limited">
                                    Limited Time
                                </span>
                            )}
                            {isExpiringSoon(offer.validTo) && (
                                <span className="offers__badge offers__badge--expiring">
                                    Ending Soon!
                                </span>
                            )}

                            {/* Offer Image */}
                            <div className="offers__card-image">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Discount Badge */}
                                <span className="offers__discount">{offer.discount}</span>
                            </div>

                            {/* Card Content */}
                            <div className="offers__card-content">
                                <h3 className="offers__card-title">{offer.title}</h3>
                                <p className="offers__card-description">{offer.description}</p>

                                {/* Included Items */}
                                <ul className="offers__includes">
                                    {offer.includes.map((item) => (
                                        <li key={item}>
                                            <span aria-hidden="true">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Pricing */}
                                <div className="offers__pricing">
                                    <span className="offers__price-original">€{offer.originalPrice}</span>
                                    <span className="offers__price-offer">€{offer.offerPrice}</span>
                                    <span className="offers__price-per">/night</span>
                                </div>

                                {/* Validity Dates - FR-8.2 */}
                                <p className="offers__validity">
                                    <strong>Valid:</strong> {formatDate(offer.validFrom)} — {formatDate(offer.validTo)}
                                </p>

                                {/* Terms - FR-8.2 */}
                                <details className="offers__terms">
                                    <summary>View Terms & Conditions</summary>
                                    <p>{offer.terms}</p>
                                </details>

                                {/* CTA Button - FR-8.4 */}
                                <a
                                    href="#contact"
                                    className="btn btn-primary offers__cta"
                                    aria-label={`Book ${offer.title} offer`}
                                >
                                    Book This Offer
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Urgency Message */}
                <div className="offers__urgency">
                    <p>
                        <span aria-hidden="true">🔥</span>
                        Don't miss out! These exclusive offers won't last forever.
                        <span aria-hidden="true">🔥</span>
                    </p>
                </div>
            </div>

            {/* Offers Styles */}
            <style>{`
        .offers {
          background-color: var(--champagne);
        }

        /* Offers Grid */
        .offers__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
          margin-bottom: var(--space-10);
        }

        @media (min-width: 768px) {
          .offers__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .offers__grid {
            grid-template-columns: repeat(4, 1fr);
            gap: var(--space-6);
          }
        }

        /* Offer Card */
        .offers__card {
          position: relative;
          background: var(--pure-white);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease,
                      box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .offers__card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .offers__card:hover {
          box-shadow: var(--shadow-xl), var(--shadow-gold);
          border-color: var(--luxe-gold);
        }

        /* Badges - FR-8.3 */
        .offers__badge {
          position: absolute;
          top: var(--space-4);
          left: var(--space-4);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-montserrat-semibold);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          z-index: 2;
        }

        .offers__badge--limited {
          background: var(--gradient-gold);
          color: var(--charcoal-darker);
        }

        .offers__badge--expiring {
          background: #dc2626;
          color: var(--pure-white);
          top: auto;
          bottom: var(--space-4);
          left: var(--space-4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* Card Image */
        .offers__card-image {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        .offers__card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .offers__card:hover .offers__card-image img {
          transform: scale(1.08);
        }

        .offers__discount {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          background: var(--charcoal-darker);
          color: var(--luxe-gold);
          font-size: var(--text-lg);
          font-weight: var(--font-weight-montserrat-semibold);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-md);
        }

        /* Card Content */
        .offers__card-content {
          padding: var(--space-6);
        }

        .offers__card-title {
          font-family: var(--font-primary);
          font-size: var(--text-xl);
          font-weight: var(--font-weight-playfair-bold);
          color: var(--charcoal-darker);
          margin-bottom: var(--space-2);
        }

        .offers__card-description {
          font-size: var(--text-sm);
          color: var(--charcoal-deep);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-4);
        }

        /* Includes List */
        .offers__includes {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-4);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-2);
        }

        .offers__includes li {
          font-size: var(--text-xs);
          color: var(--charcoal-deep);
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .offers__includes li span {
          color: var(--luxe-gold);
          font-weight: bold;
        }

        /* Pricing */
        .offers__pricing {
          display: flex;
          align-items: baseline;
          gap: var(--space-2);
          margin-bottom: var(--space-3);
        }

        .offers__price-original {
          font-size: var(--text-lg);
          color: var(--charcoal-deep);
          text-decoration: line-through;
          opacity: 0.6;
        }

        .offers__price-offer {
          font-family: var(--font-primary);
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-playfair-bold);
          color: var(--luxe-gold);
        }

        .offers__price-per {
          font-size: var(--text-sm);
          color: var(--charcoal-deep);
          opacity: 0.7;
        }

        /* Validity - FR-8.2 */
        .offers__validity {
          font-size: var(--text-xs);
          color: var(--charcoal-deep);
          margin-bottom: var(--space-3);
        }

        /* Terms - FR-8.2 */
        .offers__terms {
          font-size: var(--text-xs);
          color: var(--charcoal-deep);
          margin-bottom: var(--space-4);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: var(--radius-sm);
          padding: var(--space-2);
        }

        .offers__terms summary {
          cursor: pointer;
          color: var(--luxe-gold);
          font-weight: var(--font-weight-montserrat-medium);
        }

        .offers__terms summary:hover {
          text-decoration: underline;
        }

        .offers__terms p {
          margin-top: var(--space-2);
          padding-top: var(--space-2);
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        /* CTA - FR-8.4 */
        .offers__cta {
          width: 100%;
        }

        /* Urgency Message */
        .offers__urgency {
          text-align: center;
          background: var(--charcoal-darker);
          color: var(--cream-elegant);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-lg);
          border: 1px solid var(--luxe-gold);
        }

        .offers__urgency p {
          margin: 0;
          font-size: var(--text-lg);
          font-weight: var(--font-weight-montserrat-medium);
        }

        @media (prefers-reduced-motion: reduce) {
          .offers__card {
            opacity: 1;
            transform: none;
          }
          .offers__badge--expiring {
            animation: none;
          }
        }
      `}</style>
        </section>
    );
}

export default Offers;
