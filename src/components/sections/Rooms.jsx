/**
 * @fileoverview Rooms & Suites Section with Interactive Cards and Lightbox.
 * Implements FR-3.1 through FR-3.7 from SRS Section 3.1.3.
 * Features lazy-loaded images, hover effects, and modal gallery.
 * @version 3.0.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Wifi, Tv, Wine, Lock, Snowflake, Bath, Sunset, Waves } from 'lucide-react';

/**
 * Room data with gallery images.
 * @type {Array<Object>}
 */
const ROOMS_DATA = [
  {
    id: 'normal-room',
    name: 'Normal Room',
    description: 'Experience the comfort of our Normal Rooms, designed for relaxation and convenience. Perfect base for your stay in Lahore.',
    price: '₨7,500',
    priceNote: 'All taxes included',
    image: '/images/dining/dining-03-feast.webp',
    amenities: ['wifi', 'tv', 'ac', 'shower'],
    features: ['Queen-size bed', '35 sqm', 'City view', 'En-suite bathroom'],
    gallery: [
      '/images/rooms/rooms-01-luxury.webp',
      '/images/rooms/rooms-02-comfort.webp',
      '/images/rooms/rooms-03-stay.webp',
    ],
  },
  {
    id: 'luxury-suite',
    name: 'Luxury Suite',
    description: 'Upgrade to our Luxury Suite for an elevated experience. Premium furnishings, enhanced amenities, and superior views of Bahria Town.',
    price: '₨10,000',
    priceNote: 'All taxes included',
    image: '/images/events/events-04-wedding.webp',
    amenities: ['wifi', 'tv', 'minibar', 'ac', 'bathtub', 'breakfast'],
    features: ['King-size bed', '55 sqm', 'Garden/City View', 'Complimentary Breakfast'],
    gallery: [
      '/images/rooms/rooms-07-suite.webp',
      '/images/rooms/rooms-08-relax.webp',
      '/images/rooms/rooms-09-bed.webp',
      '/images/rooms/rooms-10-luxury.webp',
    ],
  },
];

/**
 * Amenity icons mapping.
 */
const AMENITY_ICONS = {
  wifi: <Wifi size={20} />,
  tv: <Tv size={20} />,
  minibar: <Wine size={20} />,
  safe: <Lock size={20} />,
  ac: <Snowflake size={20} />,
  bathtub: <Bath size={20} />,
  terrace: <Sunset size={20} />,
  pool: <Waves size={20} />,
  shower: <Waves size={20} />, // Fallback/reuse for shower if no specific icon
};

/**
 * Rooms & Suites section component.
 * 
 * Features (per SRS Section 3.1.3):
 * - FR-3.1: Display 4 room categories with images
 * - FR-3.2: Room cards with image, name, description, features, price
 * - FR-3.3: Hover effects revealing additional info
 * - FR-3.4: "View Details" button for each room
 * - FR-3.5: Image gallery modal for room photos
 * - FR-3.6: Room amenities icons
 * - FR-3.7: Staggered fade-in animation on scroll
 * 
 * @component
 * @returns {React.ReactElement} Rooms section element
 */
function Rooms() {
  // Lightbox state - FR-3.5
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    room: null,
    currentIndex: 0,
  });

  // Intersection Observer for animations - FR-3.7
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  // Setup Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          setVisibleCards((prev) => new Set([...prev, index]));
        }
      });
    }, observerOptions);

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Open lightbox gallery
  const openLightbox = useCallback((room) => {
    setLightbox({
      isOpen: true,
      room,
      currentIndex: 0,
    });
    document.body.style.overflow = 'hidden';
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  }, []);

  // Navigate lightbox
  const navigateLightbox = useCallback((direction) => {
    setLightbox((prev) => {
      const totalImages = prev.room?.gallery.length || 0;
      let newIndex = prev.currentIndex + direction;
      if (newIndex < 0) newIndex = totalImages - 1;
      if (newIndex >= totalImages) newIndex = 0;
      return { ...prev, currentIndex: newIndex };
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, navigateLightbox]);

  return (
    <section
      id="rooms"
      ref={sectionRef}
      className="rooms section"
      aria-labelledby="rooms-title"
    >
      <div className="container">
        {/* Section Header */}
        <header className="section-header text-center">
          <h2 id="rooms-title" className="section-title">
            Rooms & <span className="text-gold">Suites</span>
          </h2>
          <div className="divider-gold" aria-hidden="true" />
          <p className="section-subtitle">
            Discover our collection of luxuriously appointed accommodations,
            each designed for ultimate comfort and elegance.
          </p>
        </header>

        {/* Rooms Grid - FR-3.1 */}
        <div className="rooms__grid">
          {ROOMS_DATA.map((room, index) => (
            <article
              key={room.id}
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              className={`rooms__card ${visibleCards.has(String(index)) ? 'rooms__card--visible' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Room Image - FR-3.2, Lazy Load */}
              <div className="rooms__card-image">
                <img
                  src={process.env.PUBLIC_URL + room.image}
                  alt={`${room.name} at Andalusian Castle`}
                  loading="lazy"
                  decoding="async"
                />
                {/* Hover Overlay - FR-3.3 */}
                <div className="rooms__card-overlay">
                  <ul className="rooms__features-list">
                    {room.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-secondary"
                    onClick={() => openLightbox(room)}
                    aria-label={`View gallery for ${room.name}`}
                  >
                    View Gallery
                  </button>
                </div>
              </div>

              {/* Room Content - FR-3.2 */}
              <div className="rooms__card-content">
                <h3 className="rooms__card-title">{room.name}</h3>
                <p className="rooms__card-description">{room.description}</p>

                {/* Amenities Icons - FR-3.6 */}
                <div className="rooms__amenities" aria-label="Room amenities">
                  {room.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rooms__amenity"
                      title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                      role="img"
                      aria-label={amenity}
                    >
                      {AMENITY_ICONS[amenity] || '•'}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="rooms__price">
                  <span className="rooms__price-from">From</span>
                  <span className="rooms__price-amount">{room.price}</span>
                  <span className="rooms__price-per">/ night</span>
                </div>
                {room.priceNote && (
                  <div className="rooms__price-note" style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                    {room.priceNote}
                  </div>
                )}

                {/* CTA Buttons - FR-3.4 */}
                <div className="rooms__actions">
                  <button
                    className="btn btn-secondary rooms__cta"
                    onClick={() => openLightbox(room)}
                  >
                    View Details
                  </button>
                  <a
                    href="https://wa.me/923166268625"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary rooms__cta"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - FR-3.5 */}
      {lightbox.isOpen && lightbox.room && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.room.name} gallery`}
        >
          <div className="lightbox__backdrop" onClick={closeLightbox} />

          {/* Close Button */}
          <button
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            ✕
          </button>

          {/* Previous Button */}
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => navigateLightbox(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Image Container */}
          <div className="lightbox__content">
            <img
              src={process.env.PUBLIC_URL + lightbox.room.gallery[lightbox.currentIndex]}
              alt={`${lightbox.room.name} - Image ${lightbox.currentIndex + 1}`}
            />
            <div className="lightbox__caption">
              <h4>{lightbox.room.name}</h4>
              <span className="lightbox__counter">
                {lightbox.currentIndex + 1} / {lightbox.room.gallery.length}
              </span>
            </div>
          </div>

          {/* Next Button */}
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={() => navigateLightbox(1)}
            aria-label="Next image"
          >
            ›
          </button>

          {/* Thumbnails */}
          <div className="lightbox__thumbnails">
            {lightbox.room.gallery.map((img, idx) => (
              <button
                key={idx}
                className={`lightbox__thumb ${idx === lightbox.currentIndex ? 'lightbox__thumb--active' : ''}`}
                onClick={() => setLightbox((prev) => ({ ...prev, currentIndex: idx }))}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={process.env.PUBLIC_URL + img} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Rooms Section Styles */}
      <style>{`
        .rooms {
          background-color: var(--cream-light);
        }

        .rooms__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
        }

        @media (min-width: 768px) {
          .rooms__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .rooms__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-8);
            max-width: 1000px;
            margin: 0 auto;
          }
        }

        /* Room Card */
        .rooms__card {
          background: var(--pure-white);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease,
                      box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .rooms__card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .rooms__card:hover {
          box-shadow: var(--shadow-xl);
          border-color: var(--luxe-gold);
        }

        /* Card Image */
        .rooms__card-image {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .rooms__card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .rooms__card:hover .rooms__card-image img {
          transform: scale(1.1);
        }

        /* Hover Overlay - FR-3.3 */
        .rooms__card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(26, 26, 26, 0.95) 0%,
            rgba(26, 26, 26, 0.7) 50%,
            transparent 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: var(--space-6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .rooms__card:hover .rooms__card-overlay {
          opacity: 1;
        }

        .rooms__features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-4);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-2);
        }

        .rooms__features-list li {
          color: var(--cream-elegant);
          font-size: var(--text-sm);
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .rooms__features-list li::before {
          content: '✓';
          color: var(--luxe-gold);
          font-weight: bold;
        }

        /* Card Content */
        .rooms__card-content {
          padding: var(--space-6);
        }

        .rooms__card-title {
          font-family: var(--font-primary);
          font-size: var(--text-xl);
          font-weight: var(--font-weight-playfair-semibold);
          color: var(--charcoal-darker);
          margin-bottom: var(--space-3);
        }

        .rooms__card-description {
          color: var(--charcoal-deep);
          font-size: var(--text-sm);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-4);
          opacity: 0.85;
        }

        /* Amenities - FR-3.6 */
        .rooms__amenities {
          display: flex;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
          flex-wrap: wrap;
        }

        .rooms__amenity {
          font-size: 1.25rem;
          filter: grayscale(0.3);
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .rooms__card:hover .rooms__amenity {
          filter: grayscale(0);
        }

        .rooms__amenity:hover {
          transform: scale(1.2);
        }

        /* Price */
        .rooms__price {
          display: flex;
          align-items: baseline;
          gap: var(--space-1);
          margin-bottom: var(--space-4);
        }

        .rooms__price-from {
          font-size: var(--text-xs);
          color: var(--charcoal-deep);
          opacity: 0.7;
        }

        .rooms__price-amount {
          font-family: var(--font-primary);
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-playfair-bold);
          color: var(--luxe-gold);
        }

        .rooms__price-per {
          font-size: var(--text-sm);
          color: var(--charcoal-deep);
          opacity: 0.7;
        }

        /* Actions */
        .rooms__actions {
          display: flex;
          gap: var(--space-3);
          width: 100%;
          margin-top: var(--space-4);
        }

        .rooms__cta {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          padding: var(--space-3) var(--space-2);
          font-size: var(--text-sm);
        }

        /* Lightbox Modal */
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
        }

        .lightbox__close {
          position: absolute;
          top: var(--space-6);
          right: var(--space-6);
          background: none;
          border: none;
          color: var(--pure-white);
          font-size: var(--text-2xl);
          cursor: pointer;
          z-index: 10;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .lightbox__close:hover {
          background: var(--luxe-gold);
          color: var(--charcoal-darker);
        }

        .lightbox__close:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 4px;
        }

        .lightbox__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: var(--pure-white);
          font-size: 3rem;
          width: 60px;
          height: 80px;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .lightbox__nav:hover {
          background: var(--luxe-gold);
          color: var(--charcoal-darker);
        }

        .lightbox__nav:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 4px;
        }

        .lightbox__nav--prev {
          left: var(--space-4);
          border-radius: var(--radius-md);
        }

        .lightbox__nav--next {
          right: var(--space-4);
          border-radius: var(--radius-md);
        }

        .lightbox__content {
          position: relative;
          max-width: 90vw;
          max-height: 75vh;
          z-index: 5;
        }

        .lightbox__content img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-2xl);
        }

        .lightbox__caption {
          position: absolute;
          bottom: -50px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--cream-elegant);
        }

        .lightbox__caption h4 {
          font-family: var(--font-primary);
          font-size: var(--text-xl);
          color: var(--pure-white);
          margin: 0;
        }

        .lightbox__counter {
          font-size: var(--text-sm);
          color: var(--luxe-gold);
        }

        .lightbox__thumbnails {
          position: absolute;
          bottom: var(--space-6);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: var(--space-2);
          z-index: 10;
        }

        .lightbox__thumb {
          width: 60px;
          height: 45px;
          padding: 0;
          border: 2px solid transparent;
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.3s ease, border-color 0.3s ease;
        }

        .lightbox__thumb:hover,
        .lightbox__thumb--active {
          opacity: 1;
          border-color: var(--luxe-gold);
        }

        .lightbox__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 767px) {
          .lightbox__nav {
            width: 44px;
            height: 60px;
            font-size: 2rem;
          }

          .lightbox__thumbnails {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rooms__card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Rooms;
