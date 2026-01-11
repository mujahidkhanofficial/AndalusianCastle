/**
 * @fileoverview Gallery Section with Masonry Grid and Lightbox.
 * Implements FR-6.1 through FR-6.6 from SRS Section 3.1.6.
 * Features category filters, lazy loading, and keyboard navigation.
 * @version 3.0.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

import { GALLERY_IMAGES } from '../../data/content';

/**
 * Gallery categories.
 * @type {Array<Object>}
 */
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'dining', label: 'Dining' },
  { id: 'spa', label: 'Spa' },
  { id: 'events', label: 'Events' },
  { id: 'exterior', label: 'Exterior' },
];

/**
 * Gallery section component.
 * 
 * Features (per SRS Section 3.1.6):
 * - FR-6.1: Masonry/grid layout for photos
 * - FR-6.2: Lightbox functionality for full-size viewing
 * - FR-6.3: Categories: Rooms, Dining, Spa, Events, Exterior
 * - FR-6.4: Lazy loading for images
 * - FR-6.5: 30+ high-resolution images
 * - FR-6.6: Navigation arrows in lightbox
 * 
 * @component
 * @returns {React.ReactElement} Gallery section element
 */
function Gallery() {
  // Active category filter - FR-6.3
  const [activeCategory, setActiveCategory] = useState('all');

  // Lightbox state - FR-6.2
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    currentIndex: 0,
  });

  // Filtered images
  const filteredImages = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  // Refs
  const lightboxRef = useRef(null);

  // Open lightbox
  const openLightbox = useCallback((index) => {
    setLightbox({ isOpen: true, currentIndex: index });
    document.body.style.overflow = 'hidden';
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  }, []);

  // Navigate lightbox - FR-6.6
  const navigateLightbox = useCallback((direction) => {
    setLightbox((prev) => {
      const total = filteredImages.length;
      let newIndex = prev.currentIndex + direction;
      if (newIndex < 0) newIndex = total - 1;
      if (newIndex >= total) newIndex = 0;
      return { ...prev, currentIndex: newIndex };
    });
  }, [filteredImages.length]);

  // Keyboard navigation - FR-6.2
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox(-1);
          break;
        case 'ArrowRight':
          navigateLightbox(1);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, navigateLightbox]);

  // Focus trap in lightbox
  useEffect(() => {
    if (lightbox.isOpen && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [lightbox.isOpen]);

  return (
    <section
      id="gallery"
      className="gallery section"
      aria-labelledby="gallery-title"
    >
      <div className="container">
        {/* Section Header */}
        <header className="section-header text-center">
          <h2 id="gallery-title" className="section-title">
            Photo <span className="text-gold">Gallery</span>
          </h2>
          <div className="divider-gold" aria-hidden="true" />
          <p className="section-subtitle">
            Explore the timeless beauty and elegant spaces of Andalusian Castle
            through our curated collection.
          </p>
        </header>

        {/* Category Filter Tabs - FR-6.3 */}
        <nav className="gallery__filters" aria-label="Gallery category filter">
          <ul className="gallery__filter-list" role="tablist">
            {CATEGORIES.map((cat) => (
              <li key={cat.id} role="presentation">
                <button
                  className={`gallery__filter-btn ${activeCategory === cat.id ? 'gallery__filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  aria-controls="gallery-grid"
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Masonry Grid - FR-6.1 */}
        <div
          id="gallery-grid"
          className="gallery__grid"
          role="tabpanel"
          aria-label={`${CATEGORIES.find(c => c.id === activeCategory)?.label} photos`}
        >
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              className="gallery__item"
              onClick={() => openLightbox(index)}
              aria-label={`View ${image.alt}`}
              type="button"
            >
              {/* Lazy loaded image - FR-6.4 */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
              <div className="gallery__item-overlay">
                <span className="gallery__item-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - FR-6.2 */}
      {lightbox.isOpen && (
        <div
          ref={lightboxRef}
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          tabIndex={-1}
        >
          <div className="gallery__lightbox-backdrop" onClick={closeLightbox} />

          {/* Close Button */}
          <button
            className="gallery__lightbox-close"
            onClick={closeLightbox}
            aria-label="Close gallery (Escape)"
          >
            ✕
          </button>

          {/* Previous Arrow - FR-6.6 */}
          <button
            className="gallery__lightbox-nav gallery__lightbox-nav--prev"
            onClick={() => navigateLightbox(-1)}
            aria-label="Previous image (Left arrow)"
          >
            ‹
          </button>

          {/* Current Image */}
          <figure className="gallery__lightbox-content">
            <img
              src={filteredImages[lightbox.currentIndex]?.src}
              alt={filteredImages[lightbox.currentIndex]?.alt}
            />
            <figcaption className="gallery__lightbox-caption">
              <span className="gallery__lightbox-alt">
                {filteredImages[lightbox.currentIndex]?.alt}
              </span>
              <span className="gallery__lightbox-counter">
                {lightbox.currentIndex + 1} / {filteredImages.length}
              </span>
            </figcaption>
          </figure>

          {/* Next Arrow - FR-6.6 */}
          <button
            className="gallery__lightbox-nav gallery__lightbox-nav--next"
            onClick={() => navigateLightbox(1)}
            aria-label="Next image (Right arrow)"
          >
            ›
          </button>
        </div>
      )}

      {/* Gallery Styles */}
      <style>{`
        .gallery {
          background-color: var(--cream-light);
        }

        /* Category Filters - FR-6.3 */
        .gallery__filters {
          margin-bottom: var(--space-10);
        }

        .gallery__filter-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-2);
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .gallery__filter-btn {
          background: transparent;
          border: 1px solid var(--luxe-gold);
          color: var(--charcoal-deep);
          font-family: var(--font-secondary);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-montserrat-medium);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          padding: var(--space-2) var(--space-5);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gallery__filter-btn:hover,
        .gallery__filter-btn--active {
          background: var(--gradient-gold);
          color: var(--pure-white);
          border-color: transparent;
        }

        .gallery__filter-btn:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 3px;
        }

        /* Masonry Grid - FR-6.1 */
        .gallery__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
        }

        @media (min-width: 640px) {
          .gallery__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .gallery__grid {
            grid-template-columns: repeat(4, 1fr);
            gap: var(--space-5);
          }

          /* Masonry effect with varying heights */
          .gallery__item:nth-child(4n+1) { grid-row: span 2; }
          .gallery__item:nth-child(6n+3) { grid-row: span 2; }
        }

        @media (min-width: 1280px) {
          .gallery__grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        /* Gallery Item */
        .gallery__item {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          cursor: pointer;
          background: none;
          padding: 0;
          aspect-ratio: 1 / 1;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }

        .gallery__item:hover {
          border-color: var(--luxe-gold);
          transform: scale(1.02);
        }

        .gallery__item:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 3px;
        }

        .gallery__item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery__item:hover img {
          transform: scale(1.1);
        }

        .gallery__item-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26, 26, 26, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery__item:hover .gallery__item-overlay {
          opacity: 1;
        }

        .gallery__item-icon {
          color: var(--pure-white);
          background: var(--luxe-gold);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }

        .gallery__item:hover .gallery__item-icon {
          transform: scale(1);
        }

        /* Lightbox Modal - FR-6.2 */
        .gallery__lightbox {
          position: fixed;
          inset: 0;
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
        }

        .gallery__lightbox-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
        }

        .gallery__lightbox-close {
          position: absolute;
          top: var(--space-6);
          right: var(--space-6);
          background: transparent;
          border: 2px solid var(--cream-elegant);
          color: var(--cream-elegant);
          font-size: var(--text-xl);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .gallery__lightbox-close:hover {
          background: var(--luxe-gold);
          border-color: var(--luxe-gold);
          color: var(--charcoal-darker);
        }

        .gallery__lightbox-close:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 4px;
        }

        .gallery__lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: var(--pure-white);
          font-size: 3rem;
          width: 60px;
          height: 80px;
          border-radius: var(--radius-md);
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .gallery__lightbox-nav:hover {
          background: var(--luxe-gold);
          color: var(--charcoal-darker);
        }

        .gallery__lightbox-nav:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 4px;
        }

        .gallery__lightbox-nav--prev {
          left: var(--space-4);
        }

        .gallery__lightbox-nav--next {
          right: var(--space-4);
        }

        .gallery__lightbox-content {
          position: relative;
          max-width: 85vw;
          max-height: 80vh;
          z-index: 5;
          margin: 0;
        }

        .gallery__lightbox-content img {
          max-width: 100%;
          max-height: 75vh;
          object-fit: contain;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-2xl);
        }

        .gallery__lightbox-caption {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-4) 0;
        }

        .gallery__lightbox-alt {
          color: var(--cream-elegant);
          font-size: var(--text-sm);
        }

        .gallery__lightbox-counter {
          color: var(--luxe-gold);
          font-weight: var(--font-weight-montserrat-semibold);
        }

        @media (max-width: 767px) {
          .gallery__lightbox-nav {
            width: 44px;
            height: 60px;
            font-size: 2rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery__item,
          .gallery__item img,
          .gallery__item-overlay,
          .gallery__item-icon {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Gallery;
