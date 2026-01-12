/**
 * @fileoverview Footer Component with Multi-Column Layout.
 * Implements FR-10.1 through FR-10.7 from SRS Section 3.1.10.
 * Features quick links, social icons, award badges, and legal modals.
 * @version 4.1.0
 */

import React, { useState, useCallback } from 'react';
import { Facebook, Instagram, Music2, Twitter, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { LegalModal } from '../common/LegalPages';

/**
 * Footer navigation links.
 * @type {Object}
 */
const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Rooms & Suites', href: '#rooms' },
    { label: 'Tour Guide', href: '#tour-guide' },
    { label: 'Facilities', href: '#amenities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#location' },
  ],
  services: [
    { label: 'Reservations', href: 'https://wa.me/923166268625' },
    { label: 'Laundry Service', href: '#amenities' },
    { label: 'Food on Demand', href: '#amenities' },
    { label: 'SPA on Demand', href: '#amenities' },
    { label: 'Private Chauffeur', href: '#tour-guide' },
    { label: 'Business Center', href: '#amenities' },
  ],
  legal: [
    { label: 'Privacy Policy', type: 'privacy' },
    { label: 'Terms of Service', type: 'terms' },
    { label: 'Cookie Policy', type: 'cookies' },
    { label: 'Cancellation Policy', type: 'cancellation' },
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
  { name: 'Facebook', url: 'https://facebook.com/andalusiancastle', icon: <Facebook size={18} /> },
  { name: 'Instagram', url: 'https://instagram.com/andalusiancastle', icon: <Instagram size={18} /> },
  { name: 'TikTok', url: 'https://tiktok.com/@andalusiancastle', icon: <Music2 size={18} /> },
  { name: 'X', url: 'https://x.com/andalusian73893', icon: <Twitter size={18} /> },
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
  // Legal modal state
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: null });

  const openLegalModal = useCallback((type) => {
    setLegalModal({ isOpen: true, type });
  }, []);

  const closeLegalModal = useCallback(() => {
    setLegalModal({ isOpen: false, type: null });
  }, []);

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
                <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Andalusian Castle" className="footer__logo-img" />
                <span className="footer__brand-title">Andalusian Castle</span>
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
              <div className="footer__contact-items">
                <div className="footer__contact-item">
                  <MapPin size={16} className="text-gold" />
                  <span>{CONTACT.address}, {CONTACT.city}</span>
                </div>
                <div className="footer__contact-item">
                  <Phone size={16} className="text-gold" />
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
                </div>
                <div className="footer__contact-item">
                  <MessageSquare size={16} className="text-gold" />
                  <a href={`https://wa.me/${CONTACT.phone.replace(/\+| /g, '')}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp: {CONTACT.phone}
                  </a>
                </div>
                <div className="footer__contact-item">
                  <Mail size={16} className="text-gold" />
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </div>
              </div>
            </div>

            {/* Awards Column */}
            <div className="footer__awards-column">
              <h4>Recognition</h4>
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
              © {currentYear} Andalusian Castle. Developed by{' '}
              <a
                href="https://wa.me/923139330041"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__developer-link"
              >
                Mujahid
              </a>
              .
            </p>

            {/* Legal Links - FR-10.7 */}
            <nav className="footer__legal" aria-label="Legal links">
              <ul>
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => openLegalModal(link.type)}
                      className="footer__legal-btn"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={closeLegalModal}
        pageType={legalModal.type}
      />

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
            grid-template-columns: 2fr 1fr 1fr 1.8fr 2fr;
            gap: var(--space-8);
          }
        }

        /* Brand Column */
        .footer__logo {
          display: inline-flex;
          align-items: center;
          gap: var(--space-4);
          font-family: var(--font-primary);
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-playfair-bold);
          color: var(--pure-white);
          text-decoration: none;
          line-height: 1.2;
          margin-bottom: var(--space-4);
        }

        .footer__logo-img {
          height: 90px; /* Significant increase relative to 64px */
          width: auto;
          display: block;
          transition: transform 0.3s ease;
        }

        .footer__brand-title {
          font-family: 'Sail', cursive;
          font-size: 48px; /* High legibility and elegance */
          font-weight: 400;
          color: var(--luxe-gold);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          letter-spacing: 0.02em;
          line-height: 1.2;
          margin-top: 0px; /* Neutralize for Sail */
        }

        .footer__logo:hover .footer__logo-img {
          transform: scale(1.05);
        }

        .footer__tagline {
          font-size: var(--text-sm);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-6);
          color: var(--pure-white);
          opacity: 0.95;
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
          width: 38px;
          height: 38px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: var(--luxe-gold);
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer__social-link:hover {
          background: var(--luxe-gold);
          border-color: var(--luxe-gold);
          color: var(--charcoal-darker);
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
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
          display: inline-block;
          color: var(--cream-elegant);
          font-size: var(--text-sm);
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .footer__nav a:hover {
          color: var(--luxe-gold);
          transform: translateX(6px);
        }

        .footer__nav a:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 2px;
        }

        /* Contact Column - FR-10.3 */
        .footer__contact-items {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .footer__contact-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          font-size: var(--text-sm);
          line-height: 1.6;
          color: var(--pure-white);
        }

        .footer__contact-item svg {
          margin-top: 3px;
          flex-shrink: 0;
          opacity: 0.9;
        }

        .footer__contact-item a {
          color: var(--pure-white);
          transition: color 0.3s ease;
        }

        .footer__contact-item a:hover {
          color: var(--luxe-gold);
          text-decoration: none;
        }

        .text-gold {
          color: var(--luxe-gold);
        }

        /* Awards */
        .footer__awards-column h4 {
          font-family: var(--font-primary);
          font-size: var(--text-lg);
          color: var(--pure-white);
          margin-bottom: var(--space-4);
        }

        .footer__awards {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .footer__award {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-3);
          font-size: var(--text-sm);
          padding: var(--space-3) var(--space-4);
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: var(--radius-md);
        }

        .footer__award-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .footer__award-name {
          flex: 1;
          color: var(--pure-white);
          font-weight: 500;
          white-space: nowrap;
        }

        .footer__award-year {
          color: var(--luxe-gold);
          font-weight: var(--font-weight-montserrat-semibold);
          white-space: nowrap;
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

        .footer__developer-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
          border-bottom: 1px dotted rgba(212, 175, 55, 0.5);
        }

        .footer__developer-link:hover {
          color: var(--luxe-gold);
          border-bottom-style: solid;
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

        .footer__legal-btn {
          background: none;
          border: none;
          color: var(--cream-elegant);
          font-size: var(--text-sm);
          font-family: inherit;
          opacity: 0.7;
          cursor: pointer;
          padding: 0;
          transition: opacity 0.3s ease, color 0.3s ease;
        }

        .footer__legal-btn:hover {
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
    </footer >
  );
}

export default Footer;
