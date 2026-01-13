/**
 * @fileoverview Luxury Apartments Section with Interactive Cards and Lightbox.
 * Features lazy-loaded images, hover effects, and modal gallery.
 * @version 3.0.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Wifi, Tv, Lock, Snowflake, Bath, Sunset, Waves,
  ChevronLeft, ChevronRight, X, Maximize2
} from 'lucide-react';

/**
 * Apartment data with gallery images.
 * @type {Array<Object>}
 */
const APARTMENTS_DATA = [
  {
    id: 'luxury-apartment-40',
    name: 'Luxury Apartment',
    description: 'Experience the comfort of our luxury apartments, designed for relaxation and convenience. Perfect base for your stay in Lahore.',
    price: '7,500 PKR',
    originalPrice: '10,000 PKR',
    discount: '25% OFF',
    priceNote: 'All taxes included',
    image: '/images/dining/dining-03-feast.webp',
    amenities: ['wifi', 'tv', 'ac', 'shower'],
    features: ['Queen-size bed', '40 sq feet', 'City view', 'En-suite bathroom'],
    whatsappMessage: 'Hi! I would like to book the Luxury Apartment. Please let me know the availability.',
    gallery: [
      '/images/apartment_details/01.webp',
      '/images/apartment_details/02.webp',
      '/images/apartment_details/03.webp',
      '/images/apartment_details/04.webp',
    ],
  },
  {
    id: 'super-luxury-apartment-55',
    name: 'Super Luxury Apartment',
    description: 'Upgrade to our Super Luxury Apartment for an elevated experience. Premium furnishings, enhanced amenities, and superior views of Bahria Town.',
    price: '10,000 PKR',
    originalPrice: '12,500 PKR',
    discount: '20% OFF',
    priceNote: 'All taxes included',
    image: '/images/events/events-04-wedding.webp',
    amenities: ['wifi', 'tv', 'ac', 'bathtub'],
    features: ['King-size bed', '55 sq feet', 'Garden/City View', 'Complimentary Breakfast'],
    whatsappMessage: 'Hi! I am interested in booking the Super Luxury Apartment. Could you please provide more details?',
    gallery: [
      '/images/apartment_details/01.webp',
      '/images/apartment_details/02.webp',
      '/images/apartment_details/03.webp',
      '/images/apartment_details/04.webp',
    ],
  },
];

/**
 * Amenity icons mapping.
 */
const AMENITY_ICONS = {
  wifi: <Wifi size={20} />,
  tv: <Tv size={20} />,
  safe: <Lock size={20} />,
  ac: <Snowflake size={20} />,
  bathtub: <Bath size={20} />,
  terrace: <Sunset size={20} />,
  pool: <Waves size={20} />,
  shower: <Waves size={20} />,
};

/**
 * Apartments section component.
 * 
 * @component
 * @returns {React.ReactElement} Apartments section element
 */
function Apartments() {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    apartment: null,
    currentIndex: 0,
  });

  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const thumbsRef = useRef(null);

  // Touch tracking for swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const openLightbox = useCallback((apartment) => {
    setLightbox({
      isOpen: true,
      apartment,
      currentIndex: 0,
    });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  }, []);

  const navigateLightbox = useCallback((direction) => {
    setLightbox((prev) => {
      const totalImages = prev.apartment?.gallery.length || 0;
      let newIndex = prev.currentIndex + direction;
      if (newIndex < 0) newIndex = totalImages - 1;
      if (newIndex >= totalImages) newIndex = 0;
      return { ...prev, currentIndex: newIndex };
    });
  }, []);

  const goToSlide = (index) => {
    setLightbox(prev => ({ ...prev, currentIndex: index }));
  };

  // --- Swipe Logic ---
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigateLightbox(1);
      else navigateLightbox(-1);
    }
  };

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

  // Scroll active thumbnail into view
  useEffect(() => {
    const container = thumbsRef.current;
    if (lightbox.isOpen && container) {
      const activeThumb = container.querySelector('.rooms__thumb--active');
      if (activeThumb) {
        const scrollLeft = activeThumb.offsetLeft - (container.offsetWidth / 2) + (activeThumb.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [lightbox.currentIndex, lightbox.isOpen]);

  return (
    <section
      id="apartments"
      ref={sectionRef}
      className="rooms section"
      aria-labelledby="apartments-title"
    >
      <div className="container">
        <header className="section-header text-center">
          <h2 id="apartments-title" className="section-title">
            Luxury <span className="text-gold">Apartments</span>
          </h2>
          <div className="divider-gold" aria-hidden="true" />
          <p className="section-subtitle">
            Discover our collection of luxuriously appointed apartments,
            each designed for ultimate comfort and elegance.
          </p>
        </header>

        <div className="rooms__grid">
          {APARTMENTS_DATA.map((apartment, index) => (
            <article
              key={apartment.id}
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              className={`rooms__card ${visibleCards.has(String(index)) ? 'rooms__card--visible' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="rooms__card-image">
                <img
                  src={process.env.PUBLIC_URL + apartment.image}
                  alt={`${apartment.name} at Andalusian Castle`}
                  loading="lazy"
                  decoding="async"
                />
                {apartment.discount && (
                  <div className="rooms__discount-badge">
                    {apartment.discount}
                  </div>
                )}
                <div className="rooms__card-overlay">
                  <ul className="rooms__features-list">
                    {apartment.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-secondary"
                    onClick={() => openLightbox(apartment)}
                    aria-label={`View gallery for ${apartment.name}`}
                  >
                    View Gallery
                  </button>
                </div>
              </div>

              <div className="rooms__card-content">
                <h3 className="rooms__card-title">{apartment.name}</h3>
                <p className="rooms__card-description">{apartment.description}</p>

                <div className="rooms__amenities" aria-label="Apartment amenities">
                  {apartment.amenities.map((amenity) => (
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

                <div className="rooms__price">
                  <div className="rooms__price-row-top">
                    <span className="rooms__price-from">From</span>
                    {apartment.originalPrice && (
                      <span className="rooms__price-original">{apartment.originalPrice}</span>
                    )}
                  </div>
                  <div className="rooms__price-row-main">
                    <span className="rooms__price-amount">{apartment.price}</span>
                    <span className="rooms__price-per">/ night</span>
                  </div>
                </div>
                {apartment.priceNote && (
                  <div className="rooms__price-note" style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                    {apartment.priceNote}
                  </div>
                )}

                <div className="rooms__actions">
                  <button
                    className="btn btn-secondary rooms__cta"
                    onClick={() => openLightbox(apartment)}
                  >
                    View Details
                  </button>
                  <a
                    href={`https://wa.me/923166268625?text=${encodeURIComponent(apartment.whatsappMessage)}`}
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

      {/* WhatsApp Style Lightbox */}
      {lightbox.isOpen && lightbox.apartment && (
        <div
          className="rooms__lightbox"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="rooms__lightbox-top">
            <div className="rooms__info">
              <span className="rooms__lightbox-name">{lightbox.apartment.name}</span>
              <span className="rooms__counter">
                {lightbox.currentIndex + 1} / {lightbox.apartment.gallery.length}
              </span>
            </div>
            <button className="rooms__close-btn" onClick={closeLightbox}>
              <X size={28} />
            </button>
          </div>

          {/* Main Content Area */}
          <div
            className="rooms__lightbox-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button className="rooms__lb-nav rooms__lb-nav--prev" onClick={() => navigateLightbox(-1)}>
              <ChevronLeft size={36} />
            </button>

            <div className="rooms__main-image-wrapper">
              <img
                src={process.env.PUBLIC_URL + lightbox.apartment.gallery[lightbox.currentIndex]}
                alt={`${lightbox.apartment.name} - Image ${lightbox.currentIndex + 1}`}
                className="rooms__main-image"
              />
            </div>

            <button className="rooms__lb-nav rooms__lb-nav--next" onClick={() => navigateLightbox(1)}>
              <ChevronRight size={36} />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="rooms__lightbox-bottom">
            <div className="rooms__thumbs-container" ref={thumbsRef}>
              {lightbox.apartment.gallery.map((img, idx) => (
                <button
                  key={idx}
                  className={`rooms__thumb ${idx === lightbox.currentIndex ? 'rooms__thumb--active' : ''}`}
                  onClick={() => goToSlide(idx)}
                >
                  <img
                    src={process.env.PUBLIC_URL + img}
                    alt={`${lightbox.apartment.name} thumbnail`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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

        .rooms__price {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: var(--space-4);
        }

        .rooms__price-row-top {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: var(--charcoal-deep);
          opacity: 0.8;
        }

        .rooms__price-row-main {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .rooms__price-from {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .rooms__price-original {
          text-decoration: line-through;
          color: #999;
          font-size: 0.9rem;
        }

        .rooms__discount-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #D4AF37 0%, #B48F1F 100%);
          color: white;
          padding: 8px 16px;
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 4px;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .rooms__price-amount {
          font-family: var(--font-secondary);
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-montserrat-semibold);
          color: var(--luxe-gold);
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .rooms__price-per {
          font-size: var(--text-sm);
          color: var(--charcoal-deep);
          opacity: 0.7;
        }

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

        /* WhatsApp Style Lightbox */
        .rooms__lightbox {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 9999;
          display: flex;
          flex-direction: column;
        }

        .rooms__lightbox-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-6) var(--space-8);
          background: rgba(0,0,0,0.9);
          color: white;
          z-index: 20;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .rooms__info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rooms__counter {
          font-size: 0.85rem;
          opacity: 0.7;
          font-weight: 600;
          color: var(--luxe-gold);
        }

        .rooms__lightbox-name {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          font-family: var(--font-primary);
        }

        .rooms__close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .rooms__close-btn:hover { background: var(--luxe-gold); color: white; transform: rotate(90deg); border-color: var(--luxe-gold); }

        .rooms__lightbox-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #050505;
        }

        .rooms__main-image-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
          z-index: 5;
        }

        .rooms__main-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          box-shadow: 0 0 100px rgba(0,0,0,1);
          border-radius: var(--radius-sm);
          z-index: 10;
          position: relative;
        }

        .rooms__lb-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 30;
          backdrop-filter: blur(10px);
        }

        .rooms__lb-nav:hover { background: var(--luxe-gold); border-color: var(--luxe-gold); }
        .rooms__lb-nav--prev { left: var(--space-6); }
        .rooms__lb-nav--next { right: var(--space-6); }

        @media (max-width: 768px) {
          .rooms__lb-nav { display: none; }
        }

        /* Thumbstrip */
        .rooms__lightbox-bottom {
          padding: var(--space-6) 0;
          background: rgba(0,0,0,0.9);
          border-top: 1px solid rgba(255,255,255,0.1);
          z-index: 20;
        }

        .rooms__thumbs-container {
          display: flex;
          gap: 12px;
          padding: 0 var(--space-8);
          overflow-x: auto;
          scrollbar-width: none;
          justify-content: flex-start;
          width: max-content;
          margin: 0 auto;
          max-width: 90vw;
        }

        .rooms__thumbs-container::-webkit-scrollbar { display: none; }

        .rooms__thumb {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: #333;
          border: 2px solid transparent;
          cursor: pointer;
          opacity: 0.5;
          padding: 0;
          transition: all 0.3s ease;
        }

        .rooms__thumb img { width: 100%; height: 100%; object-fit: cover; }
        .rooms__thumb--active {
          opacity: 1;
          border-color: var(--luxe-gold);
          transform: scale(1.1);
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

export default Apartments;
