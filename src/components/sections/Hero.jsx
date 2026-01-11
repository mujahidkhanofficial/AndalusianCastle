/**
 * @fileoverview Hero Section Component - "Vibe Coding" Edition.
 * Implements immersive, emotionally engaging first impression with:
 * - Typewriter text reveal
 * - Dynamic time-based greetings
 * - Mouse-follow parallax
 * - Premium animations and interactions
 * @version 4.0.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowDown, ArrowRight, Loader2 } from 'lucide-react';

/**
 * Rotating subheadlines for emotional impact.
 */
const ROTATING_MESSAGES = [
  "Where Luxury Meets Comfort in the Heart of Lahore",
  "Your story begins here — in the heart of Lahore.",
  "Where every stay feels like coming home… to royalty.",
  "Escape the ordinary. Indulge in the extraordinary.",
  "Welcome, traveler — we’ve saved you a throne."
];

/**
 * Hero Component
 * @param {Object} props - Component props
 */
function Hero({
  backgroundVideo,
  ctaHref = '#rooms',
}) {
  // --- State Management ---
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [subheadlineIndex, setSubheadlineIndex] = useState(0);
  const [isHoveringCta, setIsHoveringCta] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroRef = useRef(null);
  const fullTitle = "Andalusian Castle";

  // --- Dynamic Greeting ---
  useEffect(() => {
    const hours = new Date().getHours();
    let timeGreeting = "Good evening";
    if (hours < 12) timeGreeting = "Good morning";
    else if (hours < 18) timeGreeting = "Good afternoon";

    setGreeting(timeGreeting);
  }, []);

  // --- Typewriter Effect ---
  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullTitle.length) {
        setText(fullTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
      }
    }, 80); // 80ms delay per letter

    return () => clearInterval(typeInterval);
  }, []);

  // --- Rotating Subheadline ---
  useEffect(() => {
    if (!isTypingComplete) return;

    const interval = setInterval(() => {
      setSubheadlineIndex((prev) => (prev + 1) % ROTATING_MESSAGES.length);
    }, 8000); // Rotate every 8s

    return () => clearInterval(interval);
  }, [isTypingComplete]);

  // --- Mouse Parallax ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;

      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20; // -10px to 10px
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- Scroll Effect ---
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Handlers ---
  const handleCtaClick = (e) => {
    if (ctaHref && ctaHref.startsWith('http')) {
      // For external links (WhatsApp), skip internal scroll logic
      return;
    }

    e.preventDefault();
    setIsLoading(true);
    // Simulate async action
    setTimeout(() => {
      setIsLoading(false);
      const target = document.querySelector(ctaHref);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  const activeMessage = ROTATING_MESSAGES[subheadlineIndex];

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero"
      aria-label="Welcome to Andalusian Castle"
    >
      {/* Dynamic Background with Parallax */}
      <div
        className="hero__background-wrapper"
        style={{
          transform: `translate3d(${mousePosition.x * -1}px, ${mousePosition.y * -1}px, 0) scale(1.1)`
        }}
      >
        <div className="hero__overlay" style={{ opacity: 0.4 + (scrollProgress * 0.6) }} />
        {backgroundVideo && (
          <video
            className="hero__media"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={process.env.PUBLIC_URL + backgroundVideo} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Content Container */}
      <div
        className="hero__content container"
        style={{
          opacity: 1 - scrollProgress * 1.5,
          transform: `translateY(${scrollProgress * 100}px)`
        }}
      >
        {/* Typewriter Headline */}
        <h1 className="hero__title">
          <span className="sr-only">{fullTitle}</span>
          <span aria-hidden="true">
            {text.split(' ').map((word, i) => {
              const isCastle = word === 'Castle' || (text.includes('Castle') && i === 1);
              return (
                <span key={i} className={isCastle ? 'text-gold italic' : ''}>
                  {word}{' '}
                </span>
              );
            })}
            <span className={`cursor ${isTypingComplete ? 'cursor--hidden' : ''}`}>|</span>
          </span>
        </h1>

        {/* Dynamic Subheadline */}
        <div className={`hero__subtitle-wrapper ${isTypingComplete ? 'visible' : ''}`}>
          <p className="hero__subtitle">
            <span className="greeting">{greeting} — </span>
            <span key={subheadlineIndex} className="rotate-text">
              {activeMessage}
            </span>
          </p>
        </div>

        {/* CTA Button */}
        <div className={`hero__actions ${isTypingComplete ? 'visible-delayed' : ''}`}>
          <a
            href={ctaHref}
            className={`hero__btn ${isLoading ? 'loading' : ''}`}
            onClick={handleCtaClick}
            onMouseEnter={() => setIsHoveringCta(true)}
            onMouseLeave={() => setIsHoveringCta(false)}
            target={ctaHref.startsWith('http') ? "_blank" : undefined}
            rel={ctaHref.startsWith('http') ? "noopener noreferrer" : undefined}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "RESERVE YOUR EXPERIENCE"
            )}
            <div className="btn-glow" />
          </a>
        </div>
      </div>

      {/* Scroll Prompt */}
      <button
        className="scroll-prompt"
        onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down to discover more"
      >
        <span className="scroll-text">
          {isHoveringCta ? "See What Awaits" : "DISCOVER MORE"}
        </span>
        <span className="scroll-icon">
          {isHoveringCta ? <ArrowRight size={20} /> : <ArrowDown size={20} />}
        </span>
      </button>

      <style>{`
        /* --- Base & Layout --- */
        .hero {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--charcoal-deep);
        }

        .hero__background-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          will-change: transform;
          transition: transform 0.1s ease-out;
        }

        .hero__media {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background: #000;
          z-index: 1;
          transition: opacity 0.3s ease;
        }

        .hero__content {
          position: relative;
          z-index: 10;
          text-align: center;
          color: var(--pure-white);
          max-width: 1000px;
          padding: 0 20px;
          will-change: transform, opacity;
        }

        /* --- Typography --- */
        .hero__title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          min-height: 1.2em;
          color: #ffffff !important;
          text-shadow: 0 4px 30px rgba(0,0,0,0.8);
          animation: titlePulse 5s infinite ease-in-out 3s;
        }

        .hero .text-gold {
          background: linear-gradient(135deg,
            #FFD700 0%,
            #FDB931 25%,
            #FFFFFF 50%,
            #FDB931 75%,
            #FFD700 100%);
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
          background-size: 200% auto;
          transition: background-position 0.5s ease;
          /* Sharp, tight shadow for definition against dark background */
          filter: drop-shadow(0 2px 0px rgba(0,0,0,0.8));
          padding-bottom: 0.1em; /* Prevent descender clipping */
        }

        .hero .text-gold:hover {
          background-position: right center;
        }
        
        .hero .italic {
          font-style: italic;
          padding-right: 0.15em; /* Prevent cropping of last letter swash */
          display: inline-block; /* Ensure padding applies correctly */
        }

        .cursor {
          display: inline-block;
          width: 2px;
          background-color: var(--luxe-gold);
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
          height: 1em;
        }

        .cursor--hidden {
          display: none;
        }

        /* --- Subtitle --- */
        .hero__subtitle-wrapper {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 300;
          color: #f9f5f0 !important; /* Force cream-light */
          text-shadow: 0 2px 20px rgba(0,0,0,0.9); /* Strong shadow for readability */
          letter-spacing: 0.05em;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s ease-out;
          height: 2em;
          overflow: hidden;
        }

        .hero__subtitle-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .greeting {
          color: #FFD700 !important; /* Force gold */
          font-weight: 500;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }

        .rotate-text {
          display: inline-block;
          color: #ffffff !important; /* Force white */
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
          animation: slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* --- Button --- */
        .hero__actions {
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s ease 0.5s;
        }

        .hero__actions.visible-delayed {
          opacity: 1;
          transform: translateY(0);
        }

        .hero__btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 40px;
          background: var(--luxe-gold);
          color: var(--charcoal-deep);
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .hero__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
          background: #fff; /* Optional contrast shift on hover */
        }

        .btn-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .hero__btn:hover .btn-glow {
          width: 300px;
          height: 300px;
        }

        /* --- Scroll Prompt --- */
        .scroll-prompt {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: none;
          border: none;
          color: var(--cream-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          z-index: 10;
          transition: color 0.3s;
        }

        .scroll-prompt:hover {
          color: var(--luxe-gold);
        }

        .scroll-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .scroll-icon {
          animation: bounce 2s infinite;
        }

        .scroll-prompt:hover .scroll-icon {
          animation: none;
        }

        /* --- Keyframes --- */
        @keyframes blink {
          50% { opacity: 0; }
        }

        @keyframes titlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        /* --- Responsive --- */
        @media (max-width: 768px) {
          .hero__title {
            font-size: 2.5rem;
          }
          
          .hero__subtitle-wrapper {
            font-size: 1rem;
            margin-bottom: 2rem;
            height: auto;
          }

          .hero__btn {
            padding: 15px 30px;
            width: 100%;
            justify-content: center;
          }

          /* Disable complex animations on mobile */
          .hero__background-wrapper {
            transform: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;
