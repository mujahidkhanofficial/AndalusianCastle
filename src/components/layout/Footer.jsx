/**
 * @fileoverview Footer Component with Multi-Column Layout.
 * Implements FR-10.1 through FR-10.7 from SRS Section 3.1.10.
 * Features quick links, newsletter, social icons, and award badges.
 * @version 3.0.0
 */

import React, { useState, useCallback } from 'react';

/**
 * Footer navigation links.
 * @type {Object}
 */
const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Rooms & Suites', href: '#rooms' },
    { label: 'Tour Guide', href: '#tour-guide' },
    { label: 'Laundry & Food', href: '#amenities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Special Offers', href: '#offers' },
  ],
  services: [
    { label: 'Reservations', href: '#contact' },
    { label: 'Concierge', href: '#amenities' },
    { label: 'Events & Weddings', href: '#contact' },
    { label: 'Gift Cards', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
};

/**
 * Contact information.
 */
const CONTACT = {
  address: 'Plaza 100, Nishtar Block, Sector E',
  city: 'Bahria Town, Lahore, Pakistan',
  phone: '+92 316 6268625',
  email: 'AndalusianCastleSuite@gmail.com',
};

/**
 * Social media links.
 */
const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://facebook.com/andalusiancastle', icon: 'FB' },
  { name: 'Instagram', url: 'https://instagram.com/andalusiancastle', icon: 'IG' },
  { name: 'Twitter', url: 'https://twitter.com/andalusiancastle', icon: 'X' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/andalusiancastle', icon: 'LI' },
  { name: 'YouTube', url: 'https://youtube.com/andalusiancastle', icon: 'YT' },
];

/**
 * Award badges.
 */
const AWARDS = [
  { name: 'TripAdvisor Excellence', year: '2025' },
  { name: 'Forbes Travel Guide', year: '5-Star' },
  { name: 'Condé Nast', year: "Reader's Choice" },
];

/**
 * Footer component.
 * 
 * Features (per SRS Section 3.1.10):
 * - FR-10.1: Multi-column footer layout
 * - FR-10.2: Quick navigation links
 * - FR-10.3: Repeated contact information
 * - FR-10.4: Newsletter subscription form
 * - FR-10.5: Social media icons
 * - FR-10.6: Copyright notice
 * - FR-10.7: Privacy links
 * 
 * @component
 * @returns {React.ReactElement} Footer element
 */
function Footer() {
  // Newsletter state - FR-10.4
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle newsletter submission
  const handleSubscribe = useCallback(async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setSubscribeStatus('invalid');
      return;
    }

    setIsSubmitting(true);
    setSubscribeStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', email);
      setSubscribeStatus('success');
      setEmail('');
    } catch (error) {
      setSubscribeStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [email]);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      {/* Main Footer Content */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <a href="#home" className="footer__logo" onClick={(e) => handleNavClick(e, '#home')}>
                <img src="/images/logo.png" alt="Andalusian Castle" className="footer__logo-img" />
              </a>
              <p className="footer__tagline">
                Where timeless elegance meets modern luxury. Experience the
                extraordinary in the heart of Andalusia.
              </p>

              {/* Social Icons - FR-10.5 */}
              <div className="footer__social">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links - FR-10.2 */}
            <nav className="footer__nav" aria-label="Quick links">
              <h4>Quick Links</h4>
              <ul>
                {FOOTER_LINKS.quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services Links */}
            <nav className="footer__nav" aria-label="Services">
              <h4>Services</h4>
              <ul>
                {FOOTER_LINKS.services.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Column - FR-10.3 */}
            <div className="footer__contact">
              <h4>Contact Us</h4>
              <address>
                <p>{CONTACT.address}</p>
                <p>{CONTACT.city}</p>
                <p>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
                </p>
                <p>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
              </address>
            </div>

            {/* Newsletter Column - FR-10.4 */}
            <div className="footer__newsletter">
              <h4>Newsletter</h4>
              <p>Subscribe for exclusive offers and updates.</p>

              <form onSubmit={handleSubscribe} className="footer__newsletter-form">
                <div className="footer__newsletter-input-wrapper">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="footer-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Subscribe to newsletter"
                  >
                    {isSubmitting ? '...' : '→'}
                  </button>
                </div>

                {subscribeStatus === 'success' && (
                  <p className="footer__newsletter-status footer__newsletter-status--success">
                    Thank you for subscribing!
                  </p>
                )}
                {subscribeStatus === 'invalid' && (
                  <p className="footer__newsletter-status footer__newsletter-status--error">
                    Please enter a valid email.
                  </p>
                )}
                {subscribeStatus === 'error' && (
                  <p className="footer__newsletter-status footer__newsletter-status--error">
                    Subscription failed. Try again.
                  </p>
                )}
              </form>

              {/* Awards Badges */}
              <div className="footer__awards">
                {AWARDS.map((award) => (
                  <div key={award.name} className="footer__award">
                    <span className="footer__award-icon">🏆</span>
                    <span className="footer__award-name">{award.name}</span>
                    <span className="footer__award-year">{award.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - FR-10.6, FR-10.7 */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            {/* Copyright - FR-10.6 */}
            <p className="footer__copyright">
              © {currentYear} Andalusian Castle. All rights reserved.
            </p>

            {/* Legal Links - FR-10.7 */}
            <nav className="footer__legal" aria-label="Legal links">
              <ul>
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Footer Styles */}
      <style>{`
        .footer {
          background: var(--charcoal-darker);
          color: var(--cream-elegant);
        }

        .footer__main {
          padding: var(--space-16) 0 var(--space-12);
        }

        /* Grid Layout - FR-10.1 */
        .footer__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-10);
        }

        @media (min-width: 640px) {
          .footer__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .footer__grid {
            grid-template-columns: 2fr 1fr 1fr 1.5fr 2fr;
            gap: var(--space-8);
          }
        }

        /* Brand Column */
        .footer__logo {
          display: inline-block;
          font-family: var(--font-primary);
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-playfair-bold);
          color: var(--pure-white);
          text-decoration: none;
          line-height: 1.2;
          margin-bottom: var(--space-4);
        }

        .footer__logo-img {
          height: 64px;
          width: auto;
          display: block;
          transition: transform 0.3s ease;
        }

        .footer__logo:hover .footer__logo-img {
          transform: scale(1.05);
        }

        .footer__tagline {
          font-size: var(--text-sm);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-6);
          opacity: 0.85;
        }

        /* Social Icons - FR-10.5 */
        .footer__social {
          display: flex;
          gap: var(--space-3);
        }

        .footer__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: var(--cream-elegant);
          border-radius: 50%;
          font-size: var(--text-xs);
          font-weight: var(--font-weight-montserrat-semibold);
          transition: all 0.3s ease;
        }

        .footer__social-link:hover {
          background: var(--luxe-gold);
          border-color: var(--luxe-gold);
          color: var(--charcoal-darker);
          transform: translateY(-3px);
        }

        .footer__social-link:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 3px;
        }

        /* Navigation Columns - FR-10.2 */
        .footer__nav h4,
        .footer__contact h4,
        .footer__newsletter h4 {
          font-family: var(--font-primary);
          font-size: var(--text-lg);
          color: var(--pure-white);
          margin-bottom: var(--space-4);
        }

        .footer__nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer__nav li {
          margin-bottom: var(--space-2);
        }

        .footer__nav a {
          color: var(--cream-elegant);
          font-size: var(--text-sm);
          transition: color 0.3s ease, padding-left 0.3s ease;
        }

        .footer__nav a:hover {
          color: var(--luxe-gold);
          padding-left: var(--space-2);
        }

        .footer__nav a:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 2px;
        }

        /* Contact Column - FR-10.3 */
        .footer__contact address {
          font-style: normal;
          font-size: var(--text-sm);
          line-height: var(--leading-relaxed);
        }

        .footer__contact a {
          color: var(--luxe-gold);
        }

        .footer__contact a:hover {
          text-decoration: underline;
        }

        /* Newsletter - FR-10.4 */
        .footer__newsletter p {
          font-size: var(--text-sm);
          margin-bottom: var(--space-4);
          opacity: 0.85;
        }

        .footer__newsletter-form {
          margin-bottom: var(--space-6);
        }

        .footer__newsletter-input-wrapper {
          display: flex;
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: var(--radius-full);
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        .footer__newsletter-input-wrapper:focus-within {
          border-color: var(--luxe-gold);
        }

        .footer__newsletter-input-wrapper input {
          flex: 1;
          padding: var(--space-3) var(--space-5);
          background: transparent;
          border: none;
          color: var(--pure-white);
          font-size: var(--text-sm);
        }

        .footer__newsletter-input-wrapper input::placeholder {
          color: var(--cream-elegant);
          opacity: 0.6;
        }

        .footer__newsletter-input-wrapper input:focus {
          outline: none;
        }

        .footer__newsletter-input-wrapper button {
          padding: var(--space-3) var(--space-5);
          background: var(--luxe-gold);
          border: none;
          color: var(--charcoal-darker);
          font-size: var(--text-lg);
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .footer__newsletter-input-wrapper button:hover {
          background: var(--gold-metallic);
        }

        .footer__newsletter-input-wrapper button:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .footer__newsletter-status {
          font-size: var(--text-xs);
          margin-top: var(--space-2);
        }

        .footer__newsletter-status--success {
          color: #22c55e;
        }

        .footer__newsletter-status--error {
          color: #ef4444;
        }

        /* Awards */
        .footer__awards {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .footer__award {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-xs);
          padding: var(--space-2);
          background: rgba(212, 175, 55, 0.1);
          border-radius: var(--radius-sm);
        }

        .footer__award-icon {
          font-size: 1rem;
        }

        .footer__award-name {
          flex: 1;
          color: var(--cream-elegant);
        }

        .footer__award-year {
          color: var(--luxe-gold);
          font-weight: var(--font-weight-montserrat-medium);
        }

        /* Footer Bottom - FR-10.6, FR-10.7 */
        .footer__bottom {
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          padding: var(--space-6) 0;
        }

        .footer__bottom-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer__bottom-content {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .footer__copyright {
          font-size: var(--text-sm);
          color: var(--cream-elegant);
          opacity: 0.7;
          margin: 0;
        }

        .footer__legal ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-4);
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer__legal a {
          color: var(--cream-elegant);
          font-size: var(--text-sm);
          opacity: 0.7;
          transition: opacity 0.3s ease, color 0.3s ease;
        }

        .footer__legal a:hover {
          opacity: 1;
          color: var(--luxe-gold);
        }

        /* Screen reader only utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .footer__social-link,
          .footer__nav a {
            transition: none;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
