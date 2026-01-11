/**
 * @fileoverview Testimonials Section with Auto-Rotating Carousel.
 * Implements FR-7.1 through FR-7.5 from SRS Section 3.1.7.
 * Features quotes, ratings, review badges, and touch/swipe support.
 * @version 3.0.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Testimonials data with 6 quotes.
 * @type {Array<Object>}
 */
const TESTIMONIALS_DATA = [
    {
        id: 't1',
        quote: 'An absolutely magical experience from start to finish. The attention to detail and level of personalized service exceeded all our expectations. The Royal Suite was breathtaking, and we will treasure these memories forever.',
        name: 'Elizabeth & James Thompson',
        location: 'London, United Kingdom',
        rating: 5,
        avatar: '/images/testimonials/avatar-1.webp',
    },
    {
        id: 't2',
        quote: 'The most luxurious hotel we have ever stayed in. From the stunning architecture to the impeccable service, every moment was perfect. The spa treatments were divine, and La Terraza serves the best food in Andalusia.',
        name: 'Robert Martinez',
        location: 'New York, USA',
        rating: 5,
        avatar: '/images/testimonials/avatar-2.webp',
    },
    {
        id: 't3',
        quote: 'A hidden gem that delivers true five-star luxury. The staff remembered every preference, the rooms are immaculate, and the grounds are like a private paradise. C\'est magnifique!',
        name: 'Sophie & Pierre Dubois',
        location: 'Paris, France',
        rating: 5,
        avatar: '/images/testimonials/avatar-3.webp',
    },
    {
        id: 't4',
        quote: 'We celebrated our 25th anniversary here and it was unforgettable. The private dinner on the terrace, champagne breakfast in bed, and sunset views from our suite made us feel like royalty.',
        name: 'Michael & Sarah Wilson',
        location: 'Sydney, Australia',
        rating: 5,
        avatar: '/images/testimonials/avatar-4.webp',
    },
    {
        id: 't5',
        quote: 'Breathtaking views, exceptional cuisine, and the most comfortable bed I have ever slept in. The concierge arranged incredible local experiences. A true five-star gem worth every penny.',
        name: 'Maria García Fernández',
        location: 'Madrid, Spain',
        rating: 5,
        avatar: '/images/testimonials/avatar-5.webp',
    },
    {
        id: 't6',
        quote: 'From check-in to checkout, every moment was perfection. The wellness facilities rival any luxury resort, and the historical ambiance is unmatched. Already planning our return visit.',
        name: 'Hans & Greta Müller',
        location: 'Munich, Germany',
        rating: 5,
        avatar: '/images/testimonials/avatar-6.webp',
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
                <span
                    key={i}
                    className={`testimonials__star ${i < rating ? 'testimonials__star--filled' : ''}`}
                    aria-hidden="true"
                >
                    ★
                </span>
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

    // Touch handling for swipe
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Carousel container ref
    const carouselRef = useRef(null);

    // Navigation functions
    const goToSlide = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) =>
            prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1
        );
    }, []);

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
                    <h2 id="testimonials-title" className="section-title">
                        Guest <span className="text-gold">Experiences</span>
                    </h2>
                    <div className="divider-gold" aria-hidden="true" />
                    <p className="section-subtitle">
                        Discover what our distinguished guests have to say about their
                        unforgettable stay at Andalusian Castle.
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
                        className="testimonials__slide"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Testimonial ${currentIndex + 1} of ${TESTIMONIALS_DATA.length}`}
                    >
                        {/* Quote Mark */}
                        <span className="testimonials__quote-mark" aria-hidden="true">"</span>

                        {/* Quote */}
                        <blockquote className="testimonials__quote">
                            <p>{currentTestimonial.quote}</p>
                        </blockquote>

                        {/* Star Rating - FR-7.2 */}
                        <StarRating rating={currentTestimonial.rating} />

                        {/* Guest Info - FR-7.2 */}
                        <footer className="testimonials__author">
                            <div className="testimonials__avatar">
                                <img
                                    src={currentTestimonial.avatar}
                                    alt=""
                                    loading="lazy"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="testimonials__info">
                                <cite className="testimonials__name">{currentTestimonial.name}</cite>
                                <span className="testimonials__location">{currentTestimonial.location}</span>
                            </div>
                        </footer>
                    </article>

                    {/* Navigation Arrows */}
                    <button
                        className="testimonials__nav testimonials__nav--prev"
                        onClick={prevSlide}
                        aria-label="Previous testimonial"
                    >
                        ‹
                    </button>
                    <button
                        className="testimonials__nav testimonials__nav--next"
                        onClick={nextSlide}
                        aria-label="Next testimonial"
                    >
                        ›
                    </button>
                </div>

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
                    className="testimonials__play-toggle"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>

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
          background: var(--gradient-dark);
          overflow: hidden;
        }

        .testimonials .section-subtitle {
          color: var(--cream-elegant);
        }

        /* Carousel Container */
        .testimonials__carousel {
          position: relative;
          max-width: 900px;
          margin: 0 auto var(--space-8);
          padding: var(--space-8);
          outline: none;
        }

        .testimonials__carousel:focus-visible {
          box-shadow: 0 0 0 2px var(--luxe-gold);
          border-radius: var(--radius-lg);
        }

        /* Slide */
        .testimonials__slide {
          text-align: center;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .testimonials__quote-mark {
          display: block;
          font-family: var(--font-primary);
          font-size: 6rem;
          line-height: 1;
          color: var(--luxe-gold);
          opacity: 0.3;
          margin-bottom: -2rem;
        }

        .testimonials__quote {
          margin: 0 0 var(--space-6);
        }

        .testimonials__quote p {
          font-family: var(--font-primary);
          font-size: var(--text-xl);
          font-style: italic;
          font-weight: var(--font-weight-playfair-regular);
          color: var(--cream-elegant);
          line-height: var(--leading-relaxed);
          margin: 0;
        }

        @media (min-width: 768px) {
          .testimonials__quote p {
            font-size: var(--text-2xl);
          }
        }

        /* Star Rating */
        .testimonials__stars {
          display: flex;
          justify-content: center;
          gap: var(--space-1);
          margin-bottom: var(--space-6);
        }

        .testimonials__star {
          font-size: 1.5rem;
          color: var(--charcoal-deep);
          transition: color 0.3s ease;
        }

        .testimonials__star--filled {
          color: var(--luxe-gold);
        }

        /* Author Info */
        .testimonials__author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
        }

        .testimonials__avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--luxe-gold);
        }

        .testimonials__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .testimonials__info {
          text-align: left;
        }

        .testimonials__name {
          display: block;
          font-family: var(--font-primary);
          font-size: var(--text-lg);
          font-style: normal;
          font-weight: var(--font-weight-playfair-semibold);
          color: var(--pure-white);
        }

        .testimonials__location {
          font-size: var(--text-sm);
          color: var(--luxe-gold);
        }

        /* Navigation Arrows */
        .testimonials__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--luxe-gold);
          color: var(--luxe-gold);
          font-size: 2rem;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: none;
        }

        @media (min-width: 768px) {
          .testimonials__nav {
            display: block;
          }
        }

        .testimonials__nav:hover {
          background: var(--luxe-gold);
          color: var(--charcoal-darker);
        }

        .testimonials__nav:focus-visible {
          outline: 2px solid var(--pure-white);
          outline-offset: 4px;
        }

        .testimonials__nav--prev {
          left: 0;
        }

        .testimonials__nav--next {
          right: 0;
        }

        /* Dots Navigation */
        .testimonials__dots {
          display: flex;
          justify-content: center;
          gap: var(--space-2);
          margin-bottom: var(--space-8);
        }

        .testimonials__dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--luxe-gold);
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .testimonials__dot:hover,
        .testimonials__dot--active {
          background: var(--luxe-gold);
        }

        .testimonials__dot:focus-visible {
          outline: 2px solid var(--pure-white);
          outline-offset: 3px;
        }

        /* Play/Pause Toggle */
        .testimonials__play-toggle {
          display: block;
          margin: 0 auto var(--space-10);
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .testimonials__play-toggle:hover {
          opacity: 1;
        }

        .testimonials__play-toggle:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 4px;
          border-radius: var(--radius-sm);
        }

        /* Review Badges - FR-7.4 */
        .testimonials__badges {
          display: flex;
          justify-content: center;
          gap: var(--space-8);
          flex-wrap: wrap;
        }

        .testimonials__badge {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: var(--radius-lg);
          padding: var(--space-4) var(--space-6);
          transition: border-color 0.3s ease;
        }

        .testimonials__badge:hover {
          border-color: var(--luxe-gold);
        }

        .testimonials__badge-icon {
          flex-shrink: 0;
        }

        .testimonials__badge-info {
          text-align: left;
        }

        .testimonials__badge-name {
          display: block;
          font-size: var(--text-sm);
          font-weight: var(--font-weight-montserrat-semibold);
          color: var(--pure-white);
        }

        .testimonials__badge-rating {
          font-size: var(--text-xs);
          color: var(--luxe-gold);
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonials__slide {
            animation: none;
          }
        }
      `}</style>
        </section>
    );
}

export default Testimonials;
