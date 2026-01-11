/**
 * @fileoverview Refined Photo Gallery Section with WhatsApp-style Lightbox.
 * Features a compact initial grid to minimize scrolling and a high-end
 * full-screen viewer with swipe support and a thumbnail navigation bar.
 * @version 4.0.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Image as ImageIcon,
  LayoutGrid
} from 'lucide-react';
import { GALLERY_IMAGES } from '../../data/content';

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'rooms', label: 'Suites & Rooms' },
  { id: 'dining', label: 'Dining & Cuisine' },
  { id: 'exterior', label: 'Exterior & Architecture' },
  { id: 'events', label: 'Events & Meetings' },
];

const INITIAL_VISIBLE_COUNT = 8;

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    currentIndex: 0,
  });

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const thumbsRef = useRef(null);
  const lightboxRef = useRef(null);

  // Filter images based on category
  const filteredImages = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const visibleImages = showAll ? filteredImages : filteredImages.slice(0, INITIAL_VISIBLE_COUNT);

  // --- Handlers ---
  const openLightbox = useCallback((index) => {
    setLightbox({ isOpen: true, currentIndex: index });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  }, []);

  const navigateLightbox = useCallback((direction) => {
    setLightbox(prev => {
      const total = filteredImages.length;
      let newIndex = prev.currentIndex + direction;
      if (newIndex < 0) newIndex = total - 1;
      if (newIndex >= total) newIndex = 0;
      return { ...prev, currentIndex: newIndex };
    });
  }, [filteredImages.length]);

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

  // --- Effects ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, navigateLightbox]);

  // Scroll active thumbnail into view locally (without page jump)
  useEffect(() => {
    const container = thumbsRef.current;
    if (lightbox.isOpen && container) {
      const activeThumb = container.querySelector('.gallery__thumb--active');
      if (activeThumb) {
        const scrollLeft = activeThumb.offsetLeft - (container.offsetWidth / 2) + (activeThumb.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [lightbox.currentIndex, lightbox.isOpen]);

  const currentImage = filteredImages[lightbox.currentIndex];

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        {/* Section Header */}
        <header className="section-header text-center">
          <span className="accent-text text-gold">Visual Journey</span>
          <h2 className="section-title">
            The <span className="text-gold">Andalusian</span> Gallery
          </h2>
          <div className="divider-gold" aria-hidden="true" />
          <p className="section-subtitle">
            A boutique collection of our elegant spaces and architectural details,
            crafted for those with a taste for refinement.
          </p>
        </header>

        {/* Categories Bar */}
        <nav className="gallery__nav">
          <ul className="gallery__filters">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <button
                  className={`gallery__filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowAll(false);
                  }}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Compact Grid */}
        <div className="gallery__grid">
          {visibleImages.map((image, index) => (
            <figure
              key={image.id}
              className="gallery__item"
              onClick={() => openLightbox(index)}
            >
              <img
                src={process.env.PUBLIC_URL + image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />
              <div className="gallery__overlay">
                <Maximize2 size={24} className="gallery__zoom-icon" />
                <span className="gallery__overlay-text">View Full Size</span>
              </div>
            </figure>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && filteredImages.length > INITIAL_VISIBLE_COUNT && (
          <div className="gallery__actions">
            <button
              className="gallery__view-all-btn"
              onClick={() => setShowAll(true)}
            >
              <LayoutGrid size={20} /> Explore All {filteredImages.length} Photos
            </button>
          </div>
        )}
      </div>

      {/* WhatsApp Style Lightbox */}
      {lightbox.isOpen && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="gallery__lightbox-top">
            <div className="gallery__info">
              <span className="gallery__counter">
                {lightbox.currentIndex + 1} / {filteredImages.length}
              </span>
            </div>
            <button className="gallery__close-btn" onClick={closeLightbox}>
              <X size={28} />
            </button>
          </div>

          {/* Main Content Area */}
          <div
            className="gallery__lightbox-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button className="gallery__lb-nav gallery__lb-nav--prev" onClick={() => navigateLightbox(-1)}>
              <ChevronLeft size={36} />
            </button>

            <div className="gallery__main-image-wrapper">
              {currentImage && (
                <img
                  src={process.env.PUBLIC_URL + currentImage.src}
                  alt={currentImage.alt}
                  className="gallery__main-image"
                />
              )}
            </div>

            <button className="gallery__lb-nav gallery__lb-nav--next" onClick={() => navigateLightbox(1)}>
              <ChevronRight size={36} />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="gallery__lightbox-bottom">
            <div className="gallery__thumbs-container" ref={thumbsRef}>
              {filteredImages.map((img, idx) => (
                <button
                  key={img.id}
                  className={`gallery__thumb ${idx === lightbox.currentIndex ? 'gallery__thumb--active' : ''}`}
                  onClick={() => goToSlide(idx)}
                >
                  <img
                    src={process.env.PUBLIC_URL + img.src}
                    alt={`${img.alt} thumbnail`}
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
        .gallery {
          background: #fafafa;
          position: relative;
        }

        .gallery__nav {
          margin-bottom: var(--space-4);
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 25px 10px;
        }

        .gallery__nav::-webkit-scrollbar { display: none; }

        .gallery__filters {
          display: flex;
          justify-content: center;
          gap: var(--space-3);
          list-style: none;
          padding: 0;
          min-width: max-content;
          margin: 0 auto;
        }

        .gallery__filter-btn {
          padding: 10px 24px;
          border-radius: var(--radius-full);
          border: 1px solid #e2e2e2;
          background: white;
          color: var(--charcoal-dark);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .gallery__filter-btn:hover {
          border-color: var(--luxe-gold);
          color: var(--luxe-gold);
          transform: translateY(-2px);
        }

        .gallery__filter-btn.active {
          background: var(--luxe-gold);
          color: white;
          border-color: var(--luxe-gold);
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
          transform: translateY(-1px);
        }

        /* Responsive Grid */
        .gallery__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          animation: fadeIn 0.8s ease backwards;
        }

        @media (min-width: 768px) {
          .gallery__grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-5);
          }
        }

        @media (min-width: 1024px) {
          .gallery__grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .gallery__item {
          position: relative;
          aspect-ratio: 1;
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          background: #eee;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          margin: 0;
        }

        .gallery__item:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 30px rgba(0,0,0,0.1);
          z-index: 2;
        }

        .gallery__item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .gallery__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .gallery__item:hover .gallery__overlay { opacity: 1; }
        .gallery__item:hover img { transform: scale(1.1); }

        .gallery__overlay-text {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-top: 10px;
          letter-spacing: 1px;
        }

        .gallery__actions {
          margin-top: var(--space-12);
          text-align: center;
        }

        .gallery__view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: white;
          border: 1px solid var(--luxe-gold);
          color: var(--luxe-gold);
          border-radius: var(--radius-full);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.1);
        }

        .gallery__view-all-btn:hover {
          background: var(--luxe-gold);
          color: white;
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
          transform: translateY(-2px);
        }

        /* WhatsApp Style Lightbox */
        .gallery__lightbox {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 9999;
          display: flex;
          flex-direction: column;
        }

        .gallery__lightbox-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-6) var(--space-8);
          background: rgba(0,0,0,0.9);
          color: white;
          z-index: 20;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .gallery__info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .gallery__counter {
          font-size: 0.85rem;
          opacity: 0.7;
          font-weight: 600;
          color: var(--luxe-gold);
        }

        .gallery__image-name {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          font-family: var(--font-primary);
        }

        .gallery__close-btn {
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
        .gallery__close-btn:hover { background: var(--luxe-gold); color: white; transform: rotate(90deg); border-color: var(--luxe-gold); }

        .gallery__lightbox-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #050505;
        }

        .gallery__main-image-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
          z-index: 5;
        }

        .gallery__main-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          box-shadow: 0 0 100px rgba(0,0,0,1);
          border-radius: var(--radius-sm);
          z-index: 10;
          position: relative;
        }

        .gallery__lb-nav {
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

        .gallery__lb-nav:hover { background: var(--luxe-gold); border-color: var(--luxe-gold); }
        .gallery__lb-nav--prev { left: var(--space-6); }
        .gallery__lb-nav--next { right: var(--space-6); }

        @media (max-width: 768px) {
          .gallery__lb-nav { display: none; }
        }

        /* Thumbstrip */
        .gallery__lightbox-bottom {
          padding: var(--space-6) 0;
          background: rgba(0,0,0,0.9);
          border-top: 1px solid rgba(255,255,255,0.1);
          z-index: 20;
        }

        .gallery__thumbs-container {
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

        .gallery__thumbs-container::-webkit-scrollbar { display: none; }

        .gallery__thumb {
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

        .gallery__thumb img { width: 100%; height: 100%; object-fit: cover; }
        .gallery__thumb--active {
          opacity: 1;
          border-color: var(--luxe-gold);
          transform: scale(1.1);
        }

      `}</style>
    </section>
  );
}

export default Gallery;
