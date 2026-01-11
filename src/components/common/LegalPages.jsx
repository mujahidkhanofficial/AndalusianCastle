/**
 * @fileoverview Legal Pages Component.
 * Privacy Policy, Terms, Cookie Policy, Cancellation Policy.
 * Renders as modal or static page.
 * @version 1.0.0
 */

import React, { useState, useEffect, useCallback } from 'react';

/**
 * Legal content data.
 */
const LEGAL_CONTENT = {
    privacy: {
        title: 'Privacy Policy',
        lastUpdated: 'January 1, 2026',
        content: `
## 1. Information We Collect

Andalusian Castle collects information you provide directly, including:
- **Personal Information**: Name, email address, phone number, postal address
- **Reservation Data**: Dates of stay, room preferences, special requests
- **Payment Information**: Credit card details (processed securely via PCI-compliant partners)
- **Communication Records**: Correspondence with our team

## 2. How We Use Your Information

We use collected information to:
- Process and manage your reservations
- Personalize your experience and preferences
- Send booking confirmations and service updates
- Improve our services and facilities
- Comply with legal obligations

## 3. Information Sharing

We do not sell your personal information. We may share information with:
- **Service Providers**: Payment processors, email services, booking systems
- **Legal Requirements**: When required by law or to protect our rights
- **Business Transfers**: In connection with mergers or acquisitions

## 4. Data Security

We implement industry-standard security measures including:
- SSL/TLS encryption for data transmission
- PCI DSS compliant payment processing
- Regular security audits and monitoring
- Employee training on data protection

## 5. Your Rights

You have the right to:
- Access your personal data
- Request correction of inaccurate data
- Request deletion of your data
- Opt-out of marketing communications
- Lodge a complaint with supervisory authorities

## 6. Data Retention

We retain personal data for:
- Active bookings: Duration of stay plus 7 years
- Marketing preferences: Until you unsubscribe
- Legal requirements: As mandated by law

## 7. Contact Us

For privacy inquiries:
- Email: privacy@andalusiancastle.com
- Phone: +34 952 123 456
- Address: Camino del Castillo, 123, Marbella, 29600, Spain
    `,
    },
    terms: {
        title: 'Terms of Service',
        lastUpdated: 'January 1, 2026',
        content: `
## 1. Acceptance of Terms

By accessing or using the Andalusian Castle website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.

## 2. Reservations

- **Booking Confirmation**: Reservations are confirmed upon receipt of deposit or full payment as specified.
- **Rate Guarantee**: Quoted rates are guaranteed once a booking is confirmed.
- **Minimum Stay**: Some periods may require minimum night stays.
- **Age Requirement**: Guests must be 18 years or older to make reservations.

## 3. Check-In / Check-Out

- **Check-In Time**: 3:00 PM
- **Check-Out Time**: 12:00 PM (Noon)
- **Early Check-In / Late Check-Out**: Subject to availability and may incur additional charges.

## 4. Payment Terms

- **Accepted Methods**: Visa, MasterCard, American Express, Bank Transfer
- **Currency**: All prices quoted in Euros (€)
- **Deposit**: 50% deposit required at time of booking for most rates
- **Balance**: Remaining balance due upon check-out

## 5. Cancellation Policy

Please refer to our separate Cancellation Policy for detailed terms regarding cancellations and refunds.

## 6. Guest Conduct

Guests are expected to:
- Respect other guests and staff
- Comply with hotel rules and policies
- Refrain from illegal activities on premises
- Be responsible for any damages to hotel property

## 7. Liability

Andalusian Castle is not liable for:
- Loss or damage to personal belongings
- Injury resulting from guest negligence
- Force majeure events

## 8. Intellectual Property

All content on this website is the property of Andalusian Castle and protected by copyright laws.

## 9. Governing Law

These terms are governed by the laws of Spain. Disputes shall be resolved in the courts of Málaga.
    `,
    },
    cookies: {
        title: 'Cookie Policy',
        lastUpdated: 'January 1, 2026',
        content: `
## What Are Cookies?

Cookies are small text files stored on your device when you visit our website. They help us provide a better browsing experience.

## Types of Cookies We Use

### Essential Cookies
Required for the website to function properly.
- Session management
- Security features
- Basic functionality

### Analytics Cookies
Help us understand how visitors use our site.
- Google Analytics
- Page view tracking
- User journey analysis

### Functional Cookies
Remember your preferences for a personalized experience.
- Language preferences
- Display settings
- Saved form data

### Marketing Cookies
Used to deliver relevant advertisements.
- Retargeting campaigns
- Social media integration
- Ad effectiveness measurement

## Managing Cookies

You can control cookies through your browser settings:
- **Chrome**: Settings > Privacy and Security > Cookies
- **Firefox**: Options > Privacy & Security > Cookies
- **Safari**: Preferences > Privacy > Cookies
- **Edge**: Settings > Privacy > Cookies

## Third-Party Cookies

We use services that may set their own cookies:
- Google Analytics
- Google Maps
- Social media plugins

## Cookie Consent

By continuing to use our website, you consent to our use of cookies. You can withdraw consent at any time by adjusting your browser settings.

## Updates to This Policy

We may update this Cookie Policy periodically. The "Last Updated" date reflects the most recent revision.

## Contact

Questions about cookies? Contact privacy@andalusiancastle.com
    `,
    },
    cancellation: {
        title: 'Cancellation Policy',
        lastUpdated: 'January 1, 2026',
        content: `
## Standard Cancellation Terms

### Flexible Rate Bookings
- **30+ days before arrival**: Full refund minus €50 processing fee
- **15-29 days before arrival**: 50% refund
- **7-14 days before arrival**: 25% refund
- **Less than 7 days**: No refund

### Non-Refundable Rate Bookings
- No refunds for cancellations at any time
- Date changes subject to availability and rate differences

### Peak Season & Holidays
Peak periods (July-August, Christmas, Easter) may have stricter cancellation terms, which will be communicated at time of booking.

## Modifications

### Date Changes
- Requests must be made at least 7 days before original arrival date
- Subject to availability
- Rate differences may apply

### Room Category Changes
- Upgrades subject to availability
- Downgrades may incur a fee

## No-Shows

Failure to arrive on the scheduled check-in date without prior notice will result in:
- Full charge for the first night
- Cancellation of remaining reservation

## Early Departure

Guests departing earlier than scheduled:
- Responsible for full reservation amount
- No refunds for unused nights

## Special Circumstances

We may consider refund requests for:
- Medical emergencies (with documentation)
- Death in immediate family
- Government travel restrictions
- Natural disasters affecting travel

## Group Bookings

Groups of 5+ rooms have separate cancellation terms provided in the group contract.

## How to Cancel

- **Online**: Through your booking confirmation link
- **Email**: reservations@andalusiancastle.com
- **Phone**: +34 952 123 456

Please include your booking confirmation number in all correspondence.

## Travel Insurance

We strongly recommend purchasing travel insurance to protect against unforeseen circumstances.
    `,
    },
};

/**
 * Legal Page Modal Component.
 */
function LegalModal({ isOpen, onClose, pageType }) {
    const content = LEGAL_CONTENT[pageType];

    // Keyboard handling
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen || !content) return null;

    return (
        <div
            className="legal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
        >
            <div className="legal-modal__backdrop" onClick={onClose} />
            <div className="legal-modal__content">
                <header className="legal-modal__header">
                    <h2 id="legal-modal-title">{content.title}</h2>
                    <p className="legal-modal__updated">Last Updated: {content.lastUpdated}</p>
                    <button
                        className="legal-modal__close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </header>
                <div
                    className="legal-modal__body"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(content.content) }}
                />
                <footer className="legal-modal__footer">
                    <button className="btn btn-primary" onClick={onClose}>
                        I Understand
                    </button>
                </footer>
            </div>

            <style>{`
        .legal-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
        }

        .legal-modal__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
        }

        .legal-modal__content {
          position: relative;
          background: var(--pure-white);
          border-radius: var(--radius-lg);
          max-width: 800px;
          max-height: 90vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-2xl);
        }

        .legal-modal__header {
          padding: var(--space-6);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          position: relative;
        }

        .legal-modal__header h2 {
          font-family: var(--font-primary);
          font-size: var(--text-2xl);
          color: var(--charcoal-darker);
          margin: 0 0 var(--space-2);
        }

        .legal-modal__updated {
          font-size: var(--text-sm);
          color: var(--charcoal-deep);
          opacity: 0.7;
          margin: 0;
        }

        .legal-modal__close {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          background: none;
          border: none;
          font-size: var(--text-xl);
          color: var(--charcoal-deep);
          cursor: pointer;
          padding: var(--space-2);
          transition: color 0.3s ease;
        }

        .legal-modal__close:hover {
          color: var(--luxe-gold);
        }

        .legal-modal__body {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-6);
          line-height: var(--leading-relaxed);
        }

        .legal-modal__body h2 {
          font-family: var(--font-primary);
          font-size: var(--text-lg);
          color: var(--charcoal-darker);
          margin: var(--space-6) 0 var(--space-3);
          padding-bottom: var(--space-2);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .legal-modal__body h2:first-child {
          margin-top: 0;
        }

        .legal-modal__body h3 {
          font-size: var(--text-base);
          font-weight: var(--font-weight-montserrat-semibold);
          color: var(--charcoal-darker);
          margin: var(--space-4) 0 var(--space-2);
        }

        .legal-modal__body p,
        .legal-modal__body ul,
        .legal-modal__body li {
          color: var(--charcoal-deep);
          font-size: var(--text-sm);
        }

        .legal-modal__body ul {
          padding-left: var(--space-6);
          margin: var(--space-3) 0;
        }

        .legal-modal__body li {
          margin-bottom: var(--space-2);
        }

        .legal-modal__body strong {
          color: var(--charcoal-darker);
        }

        .legal-modal__footer {
          padding: var(--space-4) var(--space-6);
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          text-align: center;
        }
      `}</style>
        </div>
    );
}

/**
 * Simple markdown parser for legal content.
 */
function parseMarkdown(text) {
    return text
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
        .replace(/<\/ul>\s*<ul>/gim, '')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[hlu])/gm, '<p>')
        .replace(/(?<![>])$/gm, '</p>')
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<[hlu])/g, '$1')
        .replace(/(<\/[hlu][l23]?>)<\/p>/g, '$1');
}

/**
 * Legal Pages Provider/Context.
 */
export function useLegalModal() {
    const [modal, setModal] = useState({ isOpen: false, type: null });

    const openLegal = useCallback((type) => {
        setModal({ isOpen: true, type });
    }, []);

    const closeLegal = useCallback(() => {
        setModal({ isOpen: false, type: null });
    }, []);

    return { modal, openLegal, closeLegal };
}

export { LegalModal, LEGAL_CONTENT };
export default LegalModal;
