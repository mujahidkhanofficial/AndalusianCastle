/**
 * @fileoverview Navigation Component with Full Interactivity.
 * Implements FR-2.1 through FR-2.7 from SRS Section 3.1.2.
 * Features sticky behavior, active section highlighting, and mobile menu.
 * @version 3.0.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Navigation items configuration.
 * @type {Array<{id: string, label: string, href: string}>}
 */
const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'apartments', label: 'Apartments', href: '#apartments' },
  { id: 'amenities', label: 'Amenities', href: '#amenities' },
  { id: 'tour-guide', label: 'Tour Guide', href: '#tour-guide' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'location', label: 'Location', href: '#location' },
];

/**
 * Navigation component props.
 * @typedef {Object} NavigationProps
 * @property {string} [logoText='Andalusian Castle'] - Logo text
 * @property {string} [ctaText='Book Now'] - CTA button text
 * @property {string} [ctaHref='#contact'] - CTA button link
 * @property {number} [scrollThreshold=100] - Pixels to scroll before nav becomes solid
 */

/**
 * Sticky navigation with scroll effects and mobile menu.
 * 
 * Features (per SRS Section 3.1.2):
 * - FR-2.1: Fixed/sticky navigation bar on scroll
 * - FR-2.2: Smooth scroll to sections
 * - FR-2.3: Active section highlighting
 * - FR-2.4: Mobile hamburger menu (accessible)
 * - FR-2.5: Hotel logo linking to top
 * - FR-2.6: Standard navigation items
 * - FR-2.7: Transparent on hero, solid with shadow on scroll
 * 
 * @component
 * @param {NavigationProps} props - Component props
 * @returns {React.ReactElement} Navigation element
 */
function Navigation({
  logoText = 'Andalusian Castle',
  ctaText = 'Book Now',
  ctaHref = 'https://wa.me/923166268625',
  scrollThreshold = 100,
}) {
  // Scroll state for nav appearance - FR-2.1, FR-2.7
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile menu state - FR-2.4
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active section tracking - FR-2.3
  const [activeSection, setActiveSection] = useState('home');

  // Track if nav is hidden (for scroll direction)
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Refs for mobile menu accessibility
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Handle scroll for sticky nav and hide on scroll down - FR-2.1, FR-2.7
  useEffect(() => {
    const SCROLL_DELTA_THRESHOLD = 10; // Minimum scroll delta to trigger hide/show

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      // Determine if scrolled past threshold
      setIsScrolled(currentScrollY > scrollThreshold);

      // Hide nav on scroll down, show on scroll up (only when scrolled)
      // Added delta threshold to prevent micro-scroll jitter
      if (currentScrollY > scrollThreshold) {
        if (scrollDelta > SCROLL_DELTA_THRESHOLD && currentScrollY > 300) {
          setIsHidden(true);
        } else if (scrollDelta < -SCROLL_DELTA_THRESHOLD) {
          setIsHidden(false);
        }
        // If delta is small, maintain current state (no change)
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  // Intersection Observer for active section - FR-2.3
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(item => item.id);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Handle smooth scroll to section - FR-2.2
  const handleNavClick = useCallback((e, href) => {
    if (href.startsWith('http')) {
      // Allow external links (WhatsApp, etc.) to function normally
      setIsMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const navHeight = navRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    // Close mobile menu after click
    setIsMobileMenuOpen(false);
  }, []);

  // Toggle mobile menu - FR-2.4
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Build nav class names
  const navClasses = [
    'nav',
    isScrolled ? 'nav--scrolled' : '',
    isHidden ? 'nav--hidden' : '',
    isMobileMenuOpen ? 'nav--menu-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header ref={navRef} className={navClasses} role="banner">
        <nav aria-label="Main navigation" className="nav__container container">
          {/* Logo - FR-2.5 */}
          <a
            href="#home"
            className="nav__logo"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label={`${logoText} - Go to homepage`}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt={logoText}
              className="nav__logo-img"
            />
            <span className="nav__logo-text">
              <span className="nav__logo-text--desktop">{logoText}</span>
              <span className="nav__logo-text--mobile">AC</span>
            </span>
          </a>

          {/* Desktop Navigation - FR-2.6 */}
          <ul className="nav__list" role="menubar">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="nav__item" role="none">
                <a
                  href={item.href}
                  className={`nav__link ${activeSection === item.id ? 'nav__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  role="menuitem"
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href={ctaHref}
            className="nav__cta btn btn-primary"
            onClick={(e) => handleNavClick(e, ctaHref)}
            target={ctaHref.startsWith('http') ? "_blank" : undefined}
            rel={ctaHref.startsWith('http') ? "noopener noreferrer" : undefined}
          >
            {ctaText}
          </a>

          {/* Mobile Hamburger Button - FR-2.4 */}
          <button
            ref={hamburgerRef}
            className={`nav__hamburger ${isMobileMenuOpen ? 'nav__hamburger--open' : ''}`}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            type="button"
          >
            <span className="nav__hamburger-line" aria-hidden="true" />
            <span className="nav__hamburger-line" aria-hidden="true" />
            <span className="nav__hamburger-line" aria-hidden="true" />
          </button>
        </nav>

        {/* Mobile Menu Overlay - FR-2.4 */}
        <div
          className={`nav__mobile-overlay ${isMobileMenuOpen ? 'nav__mobile-overlay--visible' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Menu Panel */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`nav__mobile ${isMobileMenuOpen ? 'nav__mobile--open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <ul className="nav__mobile-list" role="menu">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="nav__mobile-item" role="none">
                <a
                  href={item.href}
                  className={`nav__mobile-link ${activeSection === item.id ? 'nav__mobile-link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  role="menuitem"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav__mobile-item nav__mobile-item--cta" role="none">
              <a
                href={ctaHref}
                className="btn btn-primary btn-lg"
                onClick={(e) => handleNavClick(e, ctaHref)}
                role="menuitem"
              >
                {ctaText}
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* Navigation Styles */}
      <style>{`
        /* Skip Link */
        .skip-link {
          position: fixed;
          top: -100%;
          left: var(--space-4);
          background: var(--charcoal-darker);
          color: var(--pure-white);
          padding: var(--space-3) var(--space-6);
          border-radius: var(--radius-md);
          z-index: calc(var(--z-max) + 1);
          font-weight: var(--font-weight-montserrat-semibold);
          transition: top var(--transition-fast);
        }

        .skip-link:focus {
          top: var(--space-4);
        }

        /* Navigation Header */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-fixed);
          padding: var(--space-4) 0;
          transition: background-color 0.4s ease, 
                      box-shadow 0.4s ease,
                      padding 0.3s ease,
                      transform 0.3s ease;
        }

        .nav--scrolled {
          background-color: rgba(26, 26, 26, 0.65); /* High transparency for glass feel */
          backdrop-filter: blur(20px) saturate(180%); /* Strong blur + saturation boost */
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); /* Deep glass shadow */
          border-bottom: 1px solid rgba(255, 255, 255, 0.08); /* Frosted edge */
          padding: var(--space-3) 0;
        }

        .nav--hidden {
          transform: translateY(-100%);
        }

        .nav__container {
          display: grid;
          grid-template-columns: 60px 1fr 60px; /* Mobile: Logo, Brand(Centered), Hamburger */
          align-items: center;
          width: 100%;
          max-width: none;
          padding: 0 var(--space-4);
        }

        @media (min-width: 1024px) {
          .nav__container {
            grid-template-columns: auto 1fr auto; /* Desktop: Logo, Menu(Fills space), CTA */
            padding: 0 var(--space-8);
            gap: var(--space-4);
          }
        }

        @media (min-width: 1440px) {
          .nav__container {
            padding: 0 var(--space-12);
            gap: var(--space-8);
          }
        }

        /* Logo */
        .nav__logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--pure-white);
          text-decoration: none;
          transition: transform var(--transition-fast);
          justify-self: start;
        }

        @media (max-width: 1023px) {
          .nav__logo {
            display: contents; /* Grid members on mobile only */
          }
        }

        .nav__logo:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 4px;
          border-radius: var(--radius-sm);
        }

        .nav__logo-img {
          height: 50px;
          width: auto;
          display: block;
          transition: transform var(--transition-fast);
        }

        @media (max-width: 1023px) {
          .nav__logo-img {
            grid-column: 1; /* Left pinned on mobile grid */
          }
        }

        @media (min-width: 768px) {
          .nav__logo-img {
            height: 60px;
          }
        }

        .nav__logo-text {
          font-family: 'Sail', cursive;
          font-size: 32px;
          font-weight: 400;
          letter-spacing: 0.03em;
          color: var(--pure-white);
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2); /* Enhanced for depth */
          white-space: nowrap;
          text-transform: none;
          line-height: 1.1;
          margin-top: 0;
        }

        .nav__logo-text--desktop { display: inline; }
        .nav__logo-text--mobile { display: none; }

        @media (max-width: 1023px) {
          .nav__logo-text {
            grid-column: 2; /* Center on mobile grid */
            text-align: center;
            font-size: 42px; /* Increased for mobile visibility as requested */
          }
          .nav__logo-text--desktop { display: none; }
          .nav__logo-text--mobile { display: inline; }
        }

        @media (min-width: 1024px) {
          .nav__logo-text {
             font-size: 30px; /* Slightly decreased from 34px */
             margin-top: 2px;
          }
        }

        @media (min-width: 1280px) {
          .nav__logo-text { font-size: 38px; } /* Slightly decreased from 42px */
        }

        @media (min-width: 1440px) {
          .nav__logo-text { font-size: 46px; margin-top: 6px; } /* Slightly decreased from 52px */
        }

        .nav--scrolled .nav__logo-img {
          height: 48px;
        }

        .nav--scrolled .nav__logo-text {
          font-size: 32px; /* Compact when scrolled */
          color: var(--luxe-gold);
        }

        @media (min-width: 1440px) {
          .nav--scrolled .nav__logo-text {
            font-size: 42px;
          }
          .nav--scrolled .nav__logo-img {
            height: 50px;
          }
        }

        .nav__logo:hover .nav__logo-img {
          transform: scale(1.05);
        }

        /* Desktop Navigation List */
        .nav__list {
          display: none;
          list-style: none;
          margin: 0;
          padding: 0;
          justify-content: center; /* Center in its container */
        }

        @media (min-width: 1024px) {
          .nav__list {
            display: flex;
            gap: var(--space-2);
            grid-column: 2; /* Explicitly mapped to center column */
            justify-self: center;
          }
        }

        .nav__link {
          position: relative;
          display: block;
          padding: var(--space-2) var(--space-2); /* Tight padding */
          color: var(--cream-elegant);
          font-family: var(--font-secondary);
          font-size: 13px; /* Slightly smaller base text */
          font-weight: 700; /* Bold for visibility despite small size */
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: var(--transition-base);
          text-shadow: 0 2px 10px rgba(0,0,0,0.5); /* Improved contrast */
        }

        @media (min-width: 1024px) {
          .nav__link {
             font-size: 15px; /* Increased from base */
             padding: var(--space-2) var(--space-3);
          }
        }

        @media (min-width: 1280px) {
          .nav__link {
             font-size: 16px; /* Increased from 14px */
             padding: var(--space-2) var(--space-4);
          }
        }

        @media (min-width: 1440px) {
          .nav__link {
             font-size: 18px; /* Increased from 14px range */
             padding: var(--space-2) var(--space-5);
          }
        }

        .nav__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--gradient-gold);
          transition: width 0.3s ease, left 0.3s ease;
        }

        .nav__link:hover {
          color: var(--luxe-gold);
        }

        .nav__link:hover::after,
        .nav__link--active::after {
          width: 60%;
          left: 20%;
        }

        .nav__link--active {
          color: var(--luxe-gold);
        }

        .nav__link:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 4px;
          border-radius: var(--radius-sm);
        }

        /* CTA Button in Nav */
        .nav__cta {
          display: none;
        }

        @media (min-width: 1024px) {
          .nav__cta {
            display: inline-flex;
            grid-column: 3; /* Explicitly mapped to right column */
            justify-self: end;
            padding: 12px 28px; /* Increased from standard btn */
            font-size: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Subtle depth */
          }
        }

        @media (min-width: 1440px) {
          .nav__cta {
            padding: 14px 36px;
            font-size: 16px;
            letter-spacing: 0.15em;
          }
        }

        /* Hamburger Button */
        .nav__hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 32px;
          height: 32px;
          padding: 4px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: calc(var(--z-modal) + 1);
        }

        @media (max-width: 1023px) {
          .nav__hamburger {
            grid-column: 3; /* Pinned right on mobile grid */
            justify-self: end;
          }
        }

        @media (min-width: 1024px) {
          .nav__hamburger {
            display: none;
          }
        }

        .nav__hamburger:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 4px;
          border-radius: var(--radius-sm);
        }

        .nav__hamburger-line {
          width: 100%;
          height: 2px;
          background-color: var(--pure-white);
          border-radius: var(--radius-full);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .nav__hamburger--open .nav__hamburger-line:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .nav__hamburger--open .nav__hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .nav__hamburger--open .nav__hamburger-line:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile Menu Overlay */
        .nav__mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          z-index: var(--z-modal-backdrop);
        }

        .nav__mobile-overlay--visible {
          opacity: 1;
          visibility: visible;
        }

        /* Mobile Menu Panel */
        .nav__mobile {
          position: fixed;
          top: 0;
          right: 0;
          width: min(320px, 85vw);
          height: 100vh;
          background: var(--charcoal-darker);
          padding: var(--space-20) var(--space-8) var(--space-8);
          transform: translateX(100%);
          transition: transform 0.4s var(--ease-elegant);
          z-index: var(--z-modal);
          overflow-y: auto;
        }

        .nav__mobile--open {
          transform: translateX(0);
        }

        .nav__mobile-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav__mobile-item {
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .nav__mobile-item--cta {
          border-bottom: none;
          padding-top: var(--space-6);
        }

        .nav__mobile-link {
          display: block;
          padding: var(--space-4) 0;
          color: var(--cream-elegant);
          font-family: var(--font-primary);
          font-size: var(--text-xl);
          font-weight: var(--font-weight-playfair-medium);
          text-decoration: none;
          transition: color var(--transition-fast), padding-left var(--transition-fast);
        }

        .nav__mobile-link:hover,
        .nav__mobile-link--active {
          color: var(--luxe-gold);
          padding-left: var(--space-3);
        }

        .nav__mobile-link:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 4px;
          border-radius: var(--radius-sm);
        }

        /* Logo accent on scroll */
        .nav--scrolled .nav__logo-text {
          color: var(--luxe-gold);
        }

        @media (prefers-reduced-motion: reduce) {
          .nav,
          .nav__link::after,
          .nav__hamburger-line,
          .nav__mobile-overlay,
          .nav__mobile {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}

export default Navigation;
