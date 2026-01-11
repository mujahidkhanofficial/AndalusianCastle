/**
 * @fileoverview Dining Section with Venue Cards and PDF Menu Links.
 * Implements FR-5.1 through FR-5.5 from SRS Section 3.1.5.
 * Features card-based layout for restaurants, bars, and room service.
 * @version 3.0.0
 */

import React, { useState, useEffect, useRef } from 'react';

/**
 * Dining venues data.
 * @type {Array<Object>}
 */
const DINING_DATA = [
    {
        id: 'la-terraza',
        name: 'La Terraza',
        type: 'Fine Dining Restaurant',
        cuisine: 'Mediterranean Fusion',
        ambiance: 'Elegant rooftop setting with panoramic views, candlelit tables, and live piano music creating an unforgettable romantic atmosphere.',
        hours: {
            breakfast: '7:00 AM - 10:30 AM',
            lunch: '12:00 PM - 3:00 PM',
            dinner: '7:00 PM - 11:00 PM',
        },
        image: '/images/dining/terraza.webp',
        featuredDish: '/images/dining/terraza-dish.webp',
        featuredDishName: 'Andalusian Seafood Paella',
        menuUrl: '/menus/la-terraza-menu.pdf',
        featured: true,
        dressCode: 'Smart Elegant',
    },
    {
        id: 'azure-bar',
        name: 'Azure Bar',
        type: 'Cocktail Lounge',
        cuisine: 'Artisan Cocktails & Light Bites',
        ambiance: 'Sophisticated lounge with handcrafted cocktails, extensive wine selection, and tapas in an intimate setting with live jazz on weekends.',
        hours: {
            evening: '5:00 PM - 1:00 AM',
            weekend: '5:00 PM - 2:00 AM (Fri-Sat)',
        },
        image: '/images/dining/bar.webp',
        featuredDish: '/images/dining/bar-cocktail.webp',
        featuredDishName: 'Signature Golden Sunset Cocktail',
        menuUrl: '/menus/azure-bar-menu.pdf',
        featured: false,
        dressCode: 'Smart Casual',
    },
    {
        id: 'in-room',
        name: 'In-Room Dining',
        type: '24/7 Room Service',
        cuisine: 'International & Local Favorites',
        ambiance: 'Enjoy exquisite cuisine in the privacy of your suite. Our chefs prepare your selections fresh, delivered with impeccable service any hour.',
        hours: {
            service: '24 Hours, 7 Days a Week',
        },
        image: '/images/dining/room-service.webp',
        featuredDish: '/images/dining/room-dish.webp',
        featuredDishName: 'Champagne Breakfast in Bed',
        menuUrl: '/menus/room-service-menu.pdf',
        featured: false,
        dressCode: 'None',
    },
];

/**
 * Special dining experiences.
 * @type {Array<Object>}
 */
const DINING_EXPERIENCES = [
    {
        id: 'private',
        title: 'Private Dining',
        description: 'Exclusive culinary experiences for special occasions',
        icon: '🍽️',
    },
    {
        id: 'wine',
        title: 'Wine Tasting',
        description: 'Curated selections from our sommelier',
        icon: '🍷',
    },
    {
        id: 'chef',
        title: "Chef's Table",
        description: 'Interactive dining with our executive chef',
        icon: '👨‍🍳',
    },
];

/**
 * Dining section component.
 * 
 * Features (per SRS Section 3.1.5):
 * - FR-5.1: Showcase multiple dining options
 * - FR-5.2: Each venue: name, cuisine, ambiance, hours
 * - FR-5.3: Featured dish images
 * - FR-5.4: Link to downloadable menu (PDF)
 * - FR-5.5: Special dining experiences highlighted
 * 
 * @component
 * @returns {React.ReactElement} Dining section element
 */
function Dining() {
    const [visibleCards, setVisibleCards] = useState(new Set());
    const cardsRef = useRef([]);

    // Intersection Observer for fade-in animations
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
            id="dining"
            className="dining section section--dark"
            aria-labelledby="dining-title"
        >
            <div className="container">
                {/* Section Header */}
                <header className="section-header text-center">
                    <h2 id="dining-title" className="section-title">
                        Culinary <span className="text-gold">Excellence</span>
                    </h2>
                    <div className="divider-gold" aria-hidden="true" />
                    <p className="section-subtitle">
                        Embark on a gastronomic journey through exceptional flavors,
                        crafted by world-renowned chefs in stunning settings.
                    </p>
                </header>

                {/* Dining Venues Grid - FR-5.1 */}
                <div className="dining__grid">
                    {DINING_DATA.map((venue, index) => (
                        <article
                            key={venue.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            data-index={index}
                            className={`dining__card ${venue.featured ? 'dining__card--featured' : ''} ${visibleCards.has(String(index)) ? 'dining__card--visible' : ''}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Featured Badge - FR-5.5 */}
                            {venue.featured && (
                                <span className="dining__badge">Chef's Recommendation</span>
                            )}

                            {/* Venue Image */}
                            <div className="dining__card-image">
                                <img
                                    src={venue.image}
                                    alt={`${venue.name} at Andalusian Castle`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            {/* Card Content - FR-5.2 */}
                            <div className="dining__card-content">
                                <span className="dining__card-type">{venue.type}</span>
                                <h3 className="dining__card-name">{venue.name}</h3>
                                <p className="dining__card-cuisine">{venue.cuisine}</p>

                                <p className="dining__card-ambiance">{venue.ambiance}</p>

                                {/* Operating Hours - FR-5.2 */}
                                <div className="dining__hours">
                                    <h4 className="dining__hours-title">Hours</h4>
                                    <ul className="dining__hours-list">
                                        {Object.entries(venue.hours).map(([key, value]) => (
                                            <li key={key}>
                                                <span className="dining__hours-label">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                                </span>
                                                <span className="dining__hours-time">{value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Dress Code */}
                                {venue.dressCode !== 'None' && (
                                    <p className="dining__dress-code">
                                        <strong>Dress Code:</strong> {venue.dressCode}
                                    </p>
                                )}

                                {/* Featured Dish - FR-5.3 */}
                                <div className="dining__featured-dish">
                                    <img
                                        src={venue.featuredDish}
                                        alt={venue.featuredDishName}
                                        loading="lazy"
                                    />
                                    <span className="dining__dish-name">{venue.featuredDishName}</span>
                                </div>

                                {/* Menu Download - FR-5.4 */}
                                <a
                                    href={venue.menuUrl}
                                    className="btn btn-secondary dining__menu-btn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    aria-label={`Download ${venue.name} menu (PDF)`}
                                >
                                    <span aria-hidden="true">📄</span> View Menu
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Special Dining Experiences - FR-5.5 */}
                <div className="dining__experiences">
                    <h3 className="dining__experiences-title">
                        Special <span className="text-gold">Experiences</span>
                    </h3>
                    <div className="dining__experiences-grid">
                        {DINING_EXPERIENCES.map((exp) => (
                            <div key={exp.id} className="dining__experience-card">
                                <span className="dining__experience-icon" aria-hidden="true">
                                    {exp.icon}
                                </span>
                                <h4>{exp.title}</h4>
                                <p>{exp.description}</p>
                                <a href="#contact" className="btn btn-primary btn-sm">
                                    Inquire
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dining Section Styles */}
            <style>{`
        .dining {
          background: var(--gradient-dark);
        }

        .dining .section-subtitle {
          color: var(--cream-elegant);
        }

        /* Dining Grid */
        .dining__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
          margin-bottom: var(--space-16);
        }

        @media (min-width: 768px) {
          .dining__grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-6);
          }
        }

        /* Dining Card */
        .dining__card {
          position: relative;
          background: var(--charcoal-deep);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: var(--radius-lg);
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease,
                      box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .dining__card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dining__card:hover {
          box-shadow: var(--shadow-xl), var(--shadow-gold);
          border-color: var(--luxe-gold);
        }

        .dining__card--featured {
          border: 2px solid var(--luxe-gold);
        }

        /* Featured Badge */
        .dining__badge {
          position: absolute;
          top: var(--space-4);
          left: var(--space-4);
          background: var(--gradient-gold);
          color: var(--charcoal-darker);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-montserrat-semibold);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          z-index: 2;
        }

        /* Card Image */
        .dining__card-image {
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        .dining__card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .dining__card:hover .dining__card-image img {
          transform: scale(1.08);
        }

        /* Card Content */
        .dining__card-content {
          padding: var(--space-6);
        }

        .dining__card-type {
          display: inline-block;
          font-size: var(--text-xs);
          font-weight: var(--font-weight-montserrat-semibold);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          color: var(--luxe-gold);
          margin-bottom: var(--space-2);
        }

        .dining__card-name {
          font-family: var(--font-primary);
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-playfair-bold);
          color: var(--pure-white);
          margin-bottom: var(--space-1);
        }

        .dining__card-cuisine {
          font-family: var(--font-primary);
          font-style: italic;
          color: var(--champagne);
          margin-bottom: var(--space-4);
        }

        .dining__card-ambiance {
          font-size: var(--text-sm);
          color: var(--cream-elegant);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-4);
          opacity: 0.9;
        }

        /* Hours */
        .dining__hours {
          margin-bottom: var(--space-4);
          padding: var(--space-4);
          background: rgba(212, 175, 55, 0.1);
          border-radius: var(--radius-md);
        }

        .dining__hours-title {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-montserrat-semibold);
          color: var(--luxe-gold);
          margin-bottom: var(--space-2);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
        }

        .dining__hours-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .dining__hours-list li {
          display: flex;
          justify-content: space-between;
          font-size: var(--text-sm);
          color: var(--cream-elegant);
          padding: var(--space-1) 0;
        }

        .dining__hours-label {
          color: var(--cream-elegant);
          opacity: 0.7;
        }

        .dining__hours-time {
          color: var(--pure-white);
        }

        .dining__dress-code {
          font-size: var(--text-sm);
          color: var(--cream-elegant);
          margin-bottom: var(--space-4);
        }

        /* Featured Dish - FR-5.3 */
        .dining__featured-dish {
          position: relative;
          margin-bottom: var(--space-4);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .dining__featured-dish img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
        }

        .dining__dish-name {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: var(--pure-white);
          font-size: var(--text-sm);
          font-style: italic;
          padding: var(--space-6) var(--space-4) var(--space-3);
        }

        /* Menu Button - FR-5.4 */
        .dining__menu-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
        }

        /* Special Experiences - FR-5.5 */
        .dining__experiences {
          text-align: center;
        }

        .dining__experiences-title {
          font-family: var(--font-primary);
          font-size: var(--text-2xl);
          color: var(--pure-white);
          margin-bottom: var(--space-8);
        }

        .dining__experiences-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }

        @media (min-width: 768px) {
          .dining__experiences-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .dining__experience-card {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          transition: border-color 0.3s ease, transform 0.3s ease;
        }

        .dining__experience-card:hover {
          border-color: var(--luxe-gold);
          transform: translateY(-4px);
        }

        .dining__experience-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: var(--space-3);
        }

        .dining__experience-card h4 {
          font-family: var(--font-primary);
          font-size: var(--text-lg);
          color: var(--pure-white);
          margin-bottom: var(--space-2);
        }

        .dining__experience-card p {
          font-size: var(--text-sm);
          color: var(--cream-elegant);
          margin-bottom: var(--space-4);
        }

        @media (prefers-reduced-motion: reduce) {
          .dining__card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
        </section>
    );
}

export default Dining;
