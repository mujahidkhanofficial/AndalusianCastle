/**
 * @fileoverview Amenities & Facilities Section with Animated Counters.
 * Implements FR-4.1 through FR-4.5 from SRS Section 3.1.4.
 * Features responsive grid, category tiles, and count-up animations.
 * @version 3.0.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Shirt, UtensilsCrossed, Sparkles, Briefcase, Bell, Car } from 'lucide-react';

/**
 * Amenities data configuration.
 * @type {Array<Object>}
 */
const AMENITIES_DATA = [
  {
    id: 'laundry',
    name: 'Laundry on Demand',
    description: 'Professional laundry and dry cleaning services with same-day delivery to keep you looking your best.',
    icon: <Shirt size={32} />,
    image: '/images/Facilities/Laundry.webp',
  },
  {
    id: 'food',
    name: 'Food on Demand',
    description: 'Delicious local and international cuisine delivered right to your door, available 24/7 for your convenience.',
    icon: <UtensilsCrossed size={32} />,
    image: '/images/Facilities/Food.webp',
  },
  {
    id: 'spa',
    name: 'SPA on Demand',
    description: 'Indulge in a relaxing spa experience in the comfort of your room with our on-demand professional therapists available 24/7.',
    icon: <Sparkles size={32} />,
    image: '/images/Facilities/SPA.webp',
  },
  {
    id: 'business',
    name: 'Business Center',
    description: 'Fully equipped meeting rooms, high-speed connectivity, and professional support for your business needs.',
    icon: <Briefcase size={32} />,
    image: '/images/Facilities/business.webp',
  },
  {
    id: 'concierge',
    name: 'Concierge Services',
    description: 'Dedicated 24/7 concierge team to arrange excursions, reservations, and cater to your every requirement.',
    icon: <Bell size={32} />,
    image: '/images/Facilities/Concierge_desk.webp',
  },
  {
    id: 'parking',
    name: 'Valet Parking',
    description: 'Secure and convenient valet parking services available 24/7, ensuring your vehicle is always safe.',
    icon: <Car size={32} />,
    image: '/images/Facilities/parking.webp',
  },
];

/**
 * Statistics data for animated counters.
 * @type {Array<Object>}
 */
const STATS_DATA = [
  { id: 'rooms', endValue: 10, label: 'Luxury Rooms', suffix: '' },
  { id: 'guests', endValue: 1000, label: 'Happy Guests', suffix: '+' },
  { id: 'established', endValue: 2024, label: 'Established Since', suffix: '' },
  { id: 'rating', endValue: 49, label: 'Customer Rating', suffix: '/5', isDecimal: true },
];

/**
 * Custom hook for animated counter.
 * @param {number} endValue - Target value
 * @param {number} duration - Animation duration in ms
 * @param {boolean} shouldStart - Whether animation should start
 * @returns {number} Current animated value
 */
function useCountUp(endValue, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) return;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - percentage, 3);
      const currentValue = Math.floor(easeOutCubic * endValue);

      setCount(currentValue);

      if (percentage < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldStart, endValue, duration]);

  return count;
}

/**
 * Individual Stat Counter component.
 */
function StatCounter({ stat, isVisible }) {
  const count = useCountUp(stat.endValue, 2500, isVisible);

  return (
    <div className="amenities__stat">
      <span className="amenities__stat-value">
        {stat.isDecimal ? (count / 10).toFixed(1) : count}{stat.suffix}
      </span>
      <span className="amenities__stat-label">{stat.label}</span>
    </div>
  );
}

/**
 * Amenities & Facilities section component.
 * 
 * Features (per SRS Section 3.1.4):
 * - FR-4.1: Grid layout showcasing hotel facilities
 * - FR-4.2: Icons and descriptions for each amenity
 * - FR-4.3: Categories: Spa, Fitness, Pool, Business, Concierge
 * - FR-4.4: High-quality images for major amenities
 * - FR-4.5: Animated counters for statistics
 * 
 * @component
 * @returns {React.ReactElement} Amenities section element
 */
function Amenities() {
  // Intersection Observer states
  const [visibleTiles, setVisibleTiles] = useState(new Set());
  const [countersVisible, setCountersVisible] = useState(false);

  // Refs
  const tilesRef = useRef([]);
  const statsRef = useRef(null);

  // Intersection Observer for tile animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          setVisibleTiles((prev) => new Set([...prev, index]));
        }
      });
    }, observerOptions);

    tilesRef.current.forEach((tile) => {
      if (tile) observer.observe(tile);
    });

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="amenities"
      className="amenities section section--cream"
      aria-labelledby="amenities-title"
    >
      <div className="container">
        {/* Section Header */}
        <header className="section-header text-center">
          <h2 id="amenities-title" className="section-title">
            Amenities & <span className="text-gold">Facilities</span>
          </h2>
          <div className="divider-gold" aria-hidden="true" />
          <p className="section-subtitle">
            Indulge in our world-class facilities and services designed
            to elevate your stay to extraordinary heights.
          </p>
        </header>

        {/* Amenities Grid - FR-4.1 */}
        <div className="amenities__grid">
          {AMENITIES_DATA.map((amenity, index) => (
            <article
              key={amenity.id}
              ref={(el) => (tilesRef.current[index] = el)}
              data-index={index}
              className={`amenities__tile ${visibleTiles.has(String(index)) ? 'amenities__tile--visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Tile Image - FR-4.4 */}
              <div className="amenities__tile-image">
                <img
                  src={amenity.image}
                  alt={amenity.name}
                  loading="lazy"
                  decoding="async"
                />
                <div className="amenities__tile-overlay" />
              </div>

              {/* Tile Content - FR-4.2 */}
              <div className="amenities__tile-content">
                <span className="amenities__tile-icon" role="img" aria-hidden="true">
                  {amenity.icon}
                </span>
                <h3 className="amenities__tile-title">{amenity.name}</h3>
                <p className="amenities__tile-description">{amenity.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Statistics Section - FR-4.5 */}
        <div ref={statsRef} className="amenities__stats">
          {STATS_DATA.map((stat) => (
            <StatCounter key={stat.id} stat={stat} isVisible={countersVisible} />
          ))}
        </div>
      </div>

      {/* Amenities Section Styles */}
      <style>{`
        .amenities {
          background-color: var(--cream-elegant);
        }

        /* Amenities Grid - FR-4.1 */
        .amenities__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
          margin-bottom: var(--space-16);
        }

        @media (min-width: 640px) {
          .amenities__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .amenities__grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-8);
          }
        }

        @media (min-width: 1280px) {
          .amenities__grid {
            grid-template-columns: repeat(3, 1fr);
            max-width: 1200px;
            margin: 0 auto var(--space-16);
          }
        }

        /* Amenity Tile */
        .amenities__tile {
          position: relative;
          background: var(--pure-white);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: opacity 0.5s ease, transform 0.5s ease,
                      box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .amenities__tile--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .amenities__tile:hover {
          box-shadow: var(--shadow-xl), var(--shadow-gold);
          border-color: var(--luxe-gold);
        }

        /* Tile Image */
        .amenities__tile-image {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        .amenities__tile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .amenities__tile:hover .amenities__tile-image img {
          transform: scale(1.1);
        }

        .amenities__tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(26, 26, 26, 0.7) 100%
          );
        }

        /* Tile Content */
        .amenities__tile-content {
          padding: var(--space-6) var(--space-5) var(--space-8);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 240px;
        }

        .amenities__tile-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: rgba(212, 175, 55, 0.08);
          color: var(--luxe-gold);
          border-radius: 50%;
          margin-bottom: var(--space-5);
          transition: all 0.4s var(--ease-elegant);
          border: 1px solid rgba(212, 175, 55, 0.15);
        }

        .amenities__tile:hover .amenities__tile-icon {
          transform: translateY(-5px);
          background: var(--luxe-gold);
          color: var(--charcoal-darker);
          box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
        }

        .amenities__tile-title {
          font-family: var(--font-primary);
          font-size: var(--text-xl);
          font-weight: var(--font-weight-playfair-bold);
          color: var(--charcoal-darker);
          margin-bottom: var(--space-3);
          letter-spacing: 0.01em;
        }

        .amenities__tile-description {
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          color: var(--charcoal-deep);
          line-height: 1.7;
          opacity: 0.9;
          margin: 0;
          max-width: 90%;
        }

        /* Statistics Section - FR-4.5 */
        .amenities__stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
          padding: var(--space-12) var(--space-8);
          background: var(--gradient-dark);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        @media (min-width: 768px) {
          .amenities__stats {
            grid-template-columns: repeat(4, 1fr);
            padding: var(--space-12);
          }
        }

        .amenities__stat {
          text-align: center;
        }

        .amenities__stat-value {
          display: block;
          font-family: var(--font-primary);
          font-size: var(--text-4xl);
          font-weight: var(--font-weight-playfair-bold);
          color: var(--luxe-gold);
          line-height: 1;
          margin-bottom: var(--space-2);
        }

        @media (min-width: 768px) {
          .amenities__stat-value {
            font-size: clamp(2.5rem, 4vw, 3.5rem);
          }
        }

        .amenities__stat-label {
          font-family: var(--font-secondary);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-montserrat-medium);
          color: var(--cream-elegant);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
        }

        @media (prefers-reduced-motion: reduce) {
          .amenities__tile {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Amenities;
