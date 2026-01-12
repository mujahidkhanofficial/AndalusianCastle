/**
 * @fileoverview Hero Section Component - "Vibe Coding" Edition.
 * Implements immersive, emotionally engaging first impression with:
 * - Fade-in text reveal
 * - Dynamic time-based greetings
 * - Mouse-follow parallax
 * - Premium animations and interactions
 * @version 4.1.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Loader2 } from 'lucide-react';
import AdaptiveVideo from '../common/AdaptiveVideo';

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
  fullVideo,
  compressedVideo,
  posterImage,
  backgroundVideo, // Backwards compatibility
  ctaHref = '#apartments',
  onReady,
  startAnimation = false, // Controlled by App.js after preloader fades
}) {
  // --- State Management ---
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [areSubtitlesVisible, setAreSubtitlesVisible] = useState(false);
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
    if (!startAnimation) return;

    const hours = new Date().getHours();
    let timeGreeting = "Good evening";
    if (hours < 12) timeGreeting = "Good morning";
    else if (hours < 18) timeGreeting = "Good afternoon";

    // Small delay before greeting fades in
    const timer = setTimeout(() => setGreeting(timeGreeting), 500);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  // --- Animation Sequencing (Replaces Typewriter) ---
  useEffect(() => {
    if (!startAnimation) return;

    // 1. Fade in Title
    const titleTimer = setTimeout(() => {
      setIsTitleVisible(true);
    }, 100); // Immediate fade after curtain lift

    // 2. Fade in Subtitles & CTA
    const subtitleTimer = setTimeout(() => {
      setAreSubtitlesVisible(true);
    }, 1200); // 1.1s after title starts fading

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
    };
  }, [startAnimation]);

  // --- Rotating Subheadline ---
  useEffect(() => {
    if (!areSubtitlesVisible || !startAnimation) return;

    const interval = setInterval(() => {
      setSubheadlineIndex((prev) => (prev + 1) % ROTATING_MESSAGES.length);
    }, 8000); // Rotate every 8s

    return () => clearInterval(interval);
  }, [areSubtitlesVisible, startAnimation]);

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
        <div className="hero__vignette" />
        <div className="hero__noise" />

        <AdaptiveVideo
          fullVideoSrc={fullVideo || backgroundVideo}
          compressedVideoSrc={compressedVideo}
          posterSrc={posterImage || '/images/hero.webp'}
          className="hero__media"
          onReady={onReady}
        />
      </div>

      {/* Content Container */}
      <div
        className="hero__content container"
        style={{
          opacity: 1 - scrollProgress * 1.5,
          transform: `translateY(${scrollProgress * 100}px)`
        }}
      >
        {/* Fade-in Headline with Staggered Reveal */}
        <h1 className={`hero__title ${isTitleVisible ? 'visible' : ''}`}>
          <span className="sr-only">{fullTitle}</span>
          <span className="word-wrapper">
            <span className="word">Andalusian</span>
            <span className="word text-gold italic">Castle</span>
          </span>
        </h1>

        {/* Dynamic Subheadline with Progress */}
        <div className={`hero__subtitle-wrapper ${areSubtitlesVisible ? 'visible' : ''}`}>
          <p className="hero__subtitle">
            <span className="greeting">{greeting} — </span>
            <span key={subheadlineIndex} className="rotate-text">
              {activeMessage}
            </span>
          </p>
          <div className="message-progress">
            <div className="message-progress-bar" key={subheadlineIndex} style={{ animationDuration: '8s' }} />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`hero__actions ${areSubtitlesVisible ? 'visible-delayed' : ''}`}>
          <a
            href={ctaHref}
            className={`hero__btn hero__btn--primary ${isLoading ? 'loading' : ''}`}
            onClick={handleCtaClick}
            onMouseEnter={() => setIsHoveringCta(true)}
            onMouseLeave={() => setIsHoveringCta(false)}
            target={ctaHref.startsWith('http') ? "_blank" : undefined}
            rel={ctaHref.startsWith('http') ? "noopener noreferrer" : undefined}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "RESERVE YOUR STAY"
            )}
            <div className="btn-glow" />
          </a>

          <button
            onClick={() => {
              const target = document.getElementById('tour-guide');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero__btn hero__btn--secondary"
            onMouseEnter={() => setIsHoveringCta(true)}
            onMouseLeave={() => setIsHoveringCta(false)}
          >
            EXPLORE TOURS
            <div className="btn-glow" />
          </button>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <button
        className="scroll-prompt"
        onClick={() => document.getElementById('apartments')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down to discover more"
      >
        <div className="mouse-icon">
          <div className="mouse-wheel" />
        </div>
        <span className="scroll-text">
          {isHoveringCta ? "See What Awaits" : "DISCOVER MORE"}
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

        .hero__vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
          z-index: 2;
          pointer-events: none;
        }

        .hero__noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
          z-index: 3;
          pointer-events: none;
          mix-blend-mode: overlay;
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
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 2rem;
          color: #ffffff;
          perspective: 1000px;
        }

        .word-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2em;
        }

        @media (min-width: 1024px) {
          .word-wrapper {
            flex-direction: row;
            justify-content: center;
            gap: 0.4em;
            align-items: baseline; /* Align to font baseline */
          }
        }

        .word {
          display: inline-block;
          opacity: 0;
          transform: translateY(40px) rotateX(-20deg);
          transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .hero__title.visible .word:nth-child(1) {
          opacity: 1;
          transform: translateY(0) rotateX(0);
          transition-delay: 0.2s;
        }

        .hero__title.visible .word:nth-child(2) {
          opacity: 1;
          transform: translateY(0) rotateX(0);
          transition-delay: 0.5s;
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
          padding-right: 0.15em; /* Prevent cropping */
          display: inline-block;
          vertical-align: baseline; /* Stick to baseline */
        }

        /* --- Subtitle --- */
        .hero__subtitle-wrapper {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          font-weight: 300;
          color: #f9f5f0 !important;
          text-shadow: 0 2px 20px rgba(0,0,0,0.9);
          letter-spacing: 0.05em;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s ease-out 1s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .hero__subtitle-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .message-progress {
          width: 60px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
          border-radius: 2px;
        }

        .message-progress-bar {
          height: 100%;
          background: var(--luxe-gold);
          width: 100%;
          transform-origin: left;
          animation: progressLinear infinite linear;
        }

        @keyframes progressLinear {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
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

        /* --- Buttons --- */
        .hero__actions {
          display: flex;
          gap: 20px;
          justify-content: center;
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
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .hero__btn--primary {
          background: var(--luxe-gold);
          color: var(--charcoal-deep);
        }

        .hero__btn--secondary {
          background: rgba(255, 255, 255, 0.1);
          color: var(--pure-white);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .hero__btn--primary:hover {
          background: #fff;
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        }

        .hero__btn--secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: var(--luxe-gold);
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

        /* --- Premium Scroll Indicator --- */
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
          gap: 15px;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          opacity: 0.7;
        }

        .scroll-prompt:hover {
          color: var(--luxe-gold);
          opacity: 1;
          transform: translateX(-50%) translateY(-5px);
        }

        .mouse-icon {
          width: 24px;
          height: 40px;
          border: 2px solid currentColor;
          border-radius: 12px;
          position: relative;
        }

        .mouse-wheel {
          width: 2px;
          height: 8px;
          background: var(--luxe-gold);
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
          animation: mouseScroll 2s infinite ease-in-out;
        }

        @keyframes mouseScroll {
          0% { transform: translateX(-50%) translateY(0); opacity: 1; }
          100% { transform: translateX(-50%) translateY(12px); opacity: 0; }
        }

        .scroll-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 600;
        }

        /* --- Keyframes --- */
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

          .hero__actions {
            flex-direction: column;
            gap: 12px;
            width: 100%;
            padding: 0 20px;
          }

          .hero__btn {
            padding: 15px 25px;
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
