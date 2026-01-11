/**
 * @fileoverview Testimonials Section with Auto-Rotating Carousel.
 * Implements FR-7.1 through FR-7.5 from SRS Section 3.1.7.
 * Features quotes, ratings, review badges, and touch/swipe support.
 * @version 3.0.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

/**
 * Testimonials data with 6 quotes.
 * @type {Array<Object>}
 */
const TESTIMONIALS_DATA = [
  {
    id: 't1',
    quote: 'Being a Lahori, I’ve seen many luxury hotels, but nothing compares to the Andalusian Castle. The fusion of Moorish architecture with our local hospitality is seamless. A truly royal experience right in my hometown.',
    name: 'Arsalan Ahmed',
    location: 'Lahore, Pakistan',
    rating: 5,
    avatar: '/images/testimonials/visitor-1.webp',
    tag: 'Local Corporate'
  },
  {
    id: 't2',
    quote: 'A spectacular oasis in Lahore. The attention to detail in the tile work and those grand arches... it felt like I was back in Granada. The service was impeccable, making my first trip to Pakistan truly special.',
    name: 'Sarah Jenkins',
    location: 'Melbourne, Australia',
    rating: 5,
    avatar: '/images/testimonials/visitor-2.webp',
    tag: 'International Traveler'
  },
  {
    id: 't3',
    quote: 'The perfect weekend escape. The spa facilities are world-class, and the peace you find in the courtyard is unmatched. It’s my new favorite sanctuary in the North. Simply breathless architecture!',
    name: 'Zainab Malik',
    location: 'Karachi, Pakistan',
    rating: 5,
    avatar: '/images/testimonials/visitor-3.webp',
    tag: 'Lifestyle Blogger'
  },
  {
    id: 't4',
    quote: 'As an architect, I am rarely impressed by modern interpretations of historical styles, but this place is a masterpiece. The scale, the materials, and the lighting are all handled with extraordinary care.',
    name: 'David Rossi',
    location: 'Rome, Italy',
    rating: 5,
    avatar: '/images/testimonials/visitor-4.webp',
    tag: 'Architect'
  },
  {
    id: 't5',
    quote: 'I travel frequently for business, and the Andalusian Castle stands out for its genuine warmth. It\'s not just a hotel; it feels like a private residence where every staff member knows your name. Excellence redefined.',
    name: 'Omar Al-Fayed',
    location: 'Dubai, UAE',
    rating: 5,
    avatar: '/images/testimonials/visitor-5.webp',
    tag: 'Frequent Flyer'
  },
  {
    id: 't6',
    quote: 'Hidden gem of Lahore! The cultural fusion here is brilliant. From the breakfast spread to the sunset views from the terrace, every moment felt curated for luxury. Highly recommended for art lovers.',
    name: 'Elena Petrova',
    location: 'Toronto, Canada',
    rating: 5,
    avatar: '/images/testimonials/visitor-6.webp',
    tag: 'Art Historian'
  },
];

/**
 * Auto-play interval in milliseconds.
 * @constant {number}
 */
const AUTOPLAY_INTERVAL = 6000;

/**
 * Render star rating component.
 * @param {number} rating - Rating value (1-5)
 * @returns {React.ReactElement[]} Star elements
 */
function StarRating({ rating }) {
  return (
    <div className="testimonials__stars" aria-label={`Rating: ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={18}
          className={`testimonials__star ${i < rating ? 'testimonials__star--filled' : ''}`}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

/**
 * Testimonials section component.
 * 
 * Features (per SRS Section 3.1.7):
 * - FR-7.1: Carousel displaying guest testimonials
 * - FR-7.2: Each testimonial: quote, name, location, rating
 * - FR-7.3: Auto-play with manual controls
 * - FR-7.4: Review platform badges (TripAdvisor, Google)
 * - FR-7.5: Minimum 6 curated testimonials
 * 
 * @component
 * @returns {React.ReactElement} Testimonials section element
 */
function Testimonials() {
  // Current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play state - FR-7.3
  const [isPlaying, setIsPlaying] = useState(true);

  // State for managing transition effect
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Touch handling for swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Carousel container ref
  const carouselRef = useRef(null);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    if (isTransitioning) return; // Prevent multiple transitions
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 400); // Match CSS transition duration
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % TESTIMONIALS_DATA.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = currentIndex === 0 ? TESTIMONIALS_DATA.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide]);

  // Auto-play effect - FR-7.3
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section
      id="testimonials"
      className="testimonials section section--dark"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        {/* Section Header */}
        <header className="section-header text-center">
          <span className="accent-text text-gold">Guest Voices</span>
          <h2 id="testimonials-title" className="section-title">
            Unforgettable <span className="text-gold">Experiences</span>
          </h2>
          <div className="divider-gold" aria-hidden="true" />
          <p className="section-subtitle">
            Stories of luxury, comfort, and the timeless charm of Andalusian hospitality
            from our cherished guests around the globe.
          </p>
        </header>

        {/* Carousel Container - FR-7.1 */}
        <div
          ref={carouselRef}
          className="testimonials__carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest testimonials"
        >
          {/* Testimonial Slide - FR-7.2 */}
          <article
            className={`testimonials__slide ${isTransitioning ? 'testimonials__slide--hidden' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${currentIndex + 1} of ${TESTIMONIALS_DATA.length}`}
          >
            {/* Quote Mark */}
            <div className="testimonials__quote-wrapper">
              <Quote className="testimonials__quote-icon" size={48} />
              {/* Quote */}
              <blockquote className="testimonials__quote">
                <p>"{currentTestimonial.quote}"</p>
              </blockquote>
            </div>

            {/* Star Rating - FR-7.2 */}
            <StarRating rating={currentTestimonial.rating} />

            {/* Guest Info - FR-7.2 */}
            <footer className="testimonials__author">
              <div className="testimonials__avatar-group">
                <div className="testimonials__avatar">
                  <img
                    src={process.env.PUBLIC_URL + currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    loading="lazy"
                  />
                </div>
                <div className="testimonials__tag">
                  {currentTestimonial.tag}
                </div>
              </div>
              <div className="testimonials__info">
                <cite className="testimonials__name">{currentTestimonial.name}</cite>
                <span className="testimonials__location">{currentTestimonial.location}</span>
              </div>
            </footer>
          </article>

          {/* Navigation Arrows */}
          <button
            className="testimonials__nav testimonials__nav--prev ghost-btn"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="testimonials__nav testimonials__nav--next ghost-btn"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Controls (Dots Navigation & Play/Pause Button) */}
        <div className="testimonials__controls">
          {/* Dots Navigation - FR-7.3 */}
          <nav className="testimonials__dots" aria-label="Testimonial navigation">
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                className={`testimonials__dot ${index === currentIndex ? 'testimonials__dot--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </nav>

          {/* Play/Pause Button */}
          <button
            className="testimonials__play-toggle hov-scale"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        {/* Review Platform Badges - FR-7.4 */}
        <div className="testimonials__badges">
          <div className="testimonials__badge">
            <div className="testimonials__badge-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="#34E0A1" />
                <path d="M12 6l1.5 3.5L17 10l-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L7 10l3.5-.5z" fill="#fff" />
              </svg>
            </div>
            <div className="testimonials__badge-info">
              <span className="testimonials__badge-name">TripAdvisor</span>
              <span className="testimonials__badge-rating">5.0 Excellent</span>
            </div>
          </div>
          <div className="testimonials__badge">
            <div className="testimonials__badge-icon">
              <svg viewBox="0 0 24 24" width="32" height="32">
                <path fill="#4285F4" d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10 10-4.5 10-10z" />
                <path fill="#fff" d="M12 6.5L13.5 10l3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L7 10l3.5-.5z" />
              </svg>
            </div>
            <div className="testimonials__badge-info">
              <span className="testimonials__badge-name">Google Reviews</span>
              <span className="testimonials__badge-rating">4.9 Stars</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Styles */}
      <style>{`
        .testimonials {
            background: var(--charcoal-darker);
            position: relative;
            z-index: 1;
        }

        .testimonials::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
            pointer-events: none;
        }

        .testimonials .section-subtitle {
          color: var(--cream-elegant);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Carousel Container */
        .testimonials__carousel {
            position: relative;
            max-width: 1100px;
            margin: var(--space-12) auto var(--space-4);
            padding: 0 var(--space-4);
            outline: none;
        }

        @media (min-width: 768px) {
            .testimonials__carousel {
                padding: 0 var(--space-20);
            }
        }

        @media (max-width: 1200px) {
            .testimonials__carousel {
                padding: 0 var(--space-12);
                max-width: 950px;
            }
        }

        /* Slide */
        .testimonials__slide {
            text-align: center;
            opacity: 1;
            transform: scale(1);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            padding: var(--space-8) 0;
        }

        .testimonials__slide--hidden {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
            pointer-events: none;
        }

        .testimonials__quote-wrapper {
            position: relative;
            display: inline-block;
            margin-bottom: var(--space-8);
        }

        .testimonials__quote-icon {
            color: var(--luxe-gold);
            opacity: 0.2;
            margin-bottom: var(--space-4);
        }

        .testimonials__quote {
            margin: 0;
            padding: 0 var(--space-4);
        }

        .testimonials__quote p {
            font-family: var(--font-primary);
            font-size: clamp(1.25rem, 4vw, 2rem);
            font-style: italic;
            font-weight: var(--font-weight-playfair-regular);
            color: var(--pure-white);
            line-height: 1.6;
            margin: 0;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        /* Star Rating */
        .testimonials__stars {
            display: flex;
            justify-content: center;
            gap: var(--space-1);
            margin-bottom: var(--space-8);
            color: var(--luxe-gold);
        }

        .testimonials__star--filled {
            filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.5));
        }

        /* Author Info */
        .testimonials__author {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-4);
        }

        @media (min-width: 768px) {
            .testimonials__author {
                flex-direction: row;
                justify-content: center;
                text-align: left;
                gap: var(--space-20);
                align-items: center;
            }
        }

        .testimonials__avatar-group {
            position: relative;
            margin-bottom: var(--space-2);
            flex-shrink: 0;
        }

        .testimonials__avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid var(--luxe-gold);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .testimonials__avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .testimonials__tag {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--luxe-gold);
            color: var(--charcoal-darker);
            font-size: 0.5rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 3px 10px;
            border-radius: 40px;
            letter-spacing: 0.05em;
            border: 2px solid var(--charcoal-darker);
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            z-index: 2;
        }

        .testimonials__info {
            padding-top: var(--space-2);
            min-width: 200px;
        }

        @media (min-width: 768px) {
            .testimonials__info {
                padding-top: 0;
                padding-left: 0;
            }
        }

        .testimonials__name {
            display: block;
            font-family: var(--font-primary);
            font-size: var(--text-lg);
            font-weight: var(--font-weight-playfair-semibold);
            color: var(--pure-white);
            margin-bottom: 2px;
            white-space: nowrap;
        }

        .testimonials__location {
            font-size: var(--text-sm);
            color: var(--luxe-gold);
            opacity: 0.8;
            letter-spacing: 1px;
            text-transform: uppercase;
            white-space: nowrap;
        }

        /* Navigation Arrows */
        .testimonials__nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 50%;
            color: var(--luxe-gold);
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
        }

        .testimonials__nav:hover {
            background: var(--luxe-gold);
            color: var(--charcoal-darker);
            border-color: var(--luxe-gold);
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }

        .testimonials__nav--prev { left: 0; }
        .testimonials__nav--next { right: 0; }

        @media (min-width: 1400px) {
            .testimonials__nav--prev { left: -40px; }
            .testimonials__nav--next { right: -40px; }
        }

        @media (max-width: 992px) {
            .testimonials__nav {
                width: 44px;
                height: 44px;
            }
            .testimonials__nav--prev { left: var(--space-2); }
            .testimonials__nav--next { right: var(--space-2); }
        }

        @media (max-width: 768px) {
            .testimonials__nav { display: none; }
        }

        /* Controls */
        .testimonials__controls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-6);
            margin-top: var(--space-8);
        }

        .testimonials__dots {
            display: flex;
            gap: var(--space-3);
        }

        .testimonials__dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(212, 175, 55, 0.2);
            border: 1px solid var(--luxe-gold);
            cursor: pointer;
            padding: 0;
            transition: all 0.3s ease;
        }

        .testimonials__dot--active {
            background: var(--luxe-gold);
            width: 24px;
            border-radius: 10px;
        }

        .testimonials__play-toggle {
            background: none;
            border: none;
            color: var(--luxe-gold);
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.3s ease;
            padding: 0;
            display: flex;
            align-items: center;
        }

        .testimonials__play-toggle:hover { opacity: 1; }

        /* Review Badges */
        .testimonials__badges {
          display: flex;
          justify-content: center;
          gap: var(--space-6);
          margin-top: var(--space-8);
          padding: var(--space-6) var(--space-4);
          border-top: 1px solid rgba(212, 175, 55, 0.05);
          flex-wrap: wrap;
        }

        @media (min-width: 768px) {
          .testimonials__badges {
            gap: var(--space-16);
            margin-top: var(--space-16);
            border-top-color: rgba(212, 175, 55, 0.1);
          }
        }

        .testimonials__badge {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .testimonials__badge:hover { opacity: 1; }

        .testimonials__badge-info { text-align: left; }
        .testimonials__badge-name {
          display: block;
          font-weight: 700;
          color: var(--pure-white);
          font-size: var(--text-sm);
        }
        .testimonials__badge-rating {
          color: var(--luxe-gold);
          font-size: var(--text-xs);
          letter-spacing: 1px;
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonials__slide {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
