/**
 * @fileoverview Location & Contact Section with Map and Validated Form.
 * Implements FR-9.1 through FR-9.8 from SRS Section 3.1.9.
 * Features embedded map, contact details, and form validation.
 * @version 3.0.0
 */

import React, { useState, useCallback } from 'react';

/**
 * Contact information.
 * @type {Object}
 */
const CONTACT_INFO = {
    address: 'Plaza 100, Nishtar Block, Sector E',
    city: 'Bahria Town, Lahore',
    postalCode: 'Punjab, Pakistan',
    country: '',
    phone: '+92 316 6268625',
    email: 'AndalusianCastleSuite@gmail.com',
    mapUrl: 'https://maps.google.com/?q=Plaza+100+Nishtar+Block+Bahria+Town+Lahore',
};

/**
 * Nearby attractions with distances.
 * @type {Array<Object>}
 */
const NEARBY_ATTRACTIONS = [
    { name: 'Allama Iqbal International Airport', distance: '15 km', time: '35 min', icon: '✈️' },
    { name: 'Lahore Fort & Walled City', distance: '8 km', time: '25 min', icon: '🏛️' },
    { name: 'DHA Lahore', distance: '5 km', time: '10 min', icon: '🏙️' },
    { name: 'Eiffel Tower Replica', distance: '2 km', time: '5 min', icon: '🗼' },
    { name: 'Grand Jamia Mosque', distance: '3 km', time: '8 min', icon: '🕌' },
];

/**
 * Social media links.
 * @type {Array<Object>}
 */
const SOCIAL_LINKS = [
    { name: 'Facebook', url: 'https://facebook.com/andalusiancastle', icon: 'FB' },
    { name: 'Instagram', url: 'https://instagram.com/andalusiancastle', icon: 'IG' },
    { name: 'Twitter', url: 'https://twitter.com/andalusiancastle', icon: 'TW' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/andalusiancastle', icon: 'LI' },
];

/**
 * Sanitize input string.
 * @param {string} input - Raw input
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
}

/**
 * Validation rules.
 */
const validators = {
    name: (value) => {
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 100) return 'Name must be less than 100 characters';
        return null;
    },
    email: (value) => {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
    },
    phone: (value) => {
        if (!value.trim()) return null; // Optional
        const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
        return null;
    },
    subject: (value) => {
        if (!value.trim()) return 'Please select a subject';
        return null;
    },
    message: (value) => {
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        if (value.length > 1000) return 'Message must be less than 1000 characters';
        return null;
    },
};

/**
 * Location & Contact section.
 * 
 * Features (per SRS Section 3.1.9):
 * - FR-9.1: Embedded interactive map
 * - FR-9.2: Full address with directions link
 * - FR-9.3: Contact phone and email
 * - FR-9.4: Social media links
 * - FR-9.5: Contact form with validation
 * - FR-9.6: Form field validation
 * - FR-9.7: Success/error messages
 * - FR-9.8: Distance to airport/attractions
 * 
 * @component
 * @returns {React.ReactElement} Location section element
 */
function Location() {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    // Validation errors
    const [errors, setErrors] = useState({});

    // Touched fields (for real-time validation)
    const [touched, setTouched] = useState({});

    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

    // Handle input change
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Real-time validation if field was touched
        if (touched[name]) {
            const error = validators[name]?.(value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    }, [touched]);

    // Handle blur (mark field as touched)
    const handleBlur = useCallback((e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));

        // Validate on blur
        const error = validators[name]?.(value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    }, []);

    // Validate entire form
    const validateForm = useCallback(() => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validators[key]?.(formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        setTouched({
            name: true,
            email: true,
            phone: true,
            subject: true,
            message: true,
        });
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Handle form submission - FR-9.7
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Sanitize inputs
        const sanitizedData = {
            name: sanitizeInput(formData.name),
            email: sanitizeInput(formData.email),
            phone: sanitizeInput(formData.phone),
            subject: sanitizeInput(formData.subject),
            message: sanitizeInput(formData.message),
        };

        try {
            // Simulate API call (replace with EmailJS/Formspree)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock success (in production, use EmailJS or Formspree)
            console.log('Form submitted:', sanitizedData);

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTouched({});
            setErrors({});
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm]);

    return (
        <section
            id="location"
            className="location section"
            aria-labelledby="location-title"
        >
            <div className="container">
                {/* Section Header */}
                <header className="section-header text-center">
                    <h2 id="location-title" className="section-title">
                        Location & <span className="text-gold">Contact</span>
                    </h2>
                    <div className="divider-gold" aria-hidden="true" />
                    <p className="section-subtitle">
                        We look forward to welcoming you. Reach out to plan your perfect stay.
                    </p>
                </header>

                <div className="location__grid">
                    {/* Left Column: Map & Info */}
                    <div className="location__info">
                        {/* Embedded Map - FR-9.1 */}
                        <div className="location__map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13620.597148816828!2d74.1814722!3d31.3623889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDIxJzQ0LjYiTiA3NMKwMTAnNTMuMyJF!5e0!3m2!1sen!2spk!4v1"
                                width="100%"
                                height="300"
                                style={{ border: 0, filter: 'sepia(30%) saturate(80%) hue-rotate(10deg)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Andalusian Castle location map"
                            />
                        </div>

                        {/* Address - FR-9.2 */}
                        <div className="location__address">
                            <h3>Address</h3>
                            <address>
                                <p>{CONTACT_INFO.address}</p>
                                <p>{CONTACT_INFO.city}</p>
                                <p>{CONTACT_INFO.postalCode}, {CONTACT_INFO.country}</p>
                            </address>
                            <a
                                href={CONTACT_INFO.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary btn-sm"
                                aria-label="Get directions to Andalusian Castle"
                            >
                                Get Directions
                            </a>
                        </div>

                        {/* Contact Details - FR-9.3 */}
                        <div className="location__contact-details">
                            <h3>Contact</h3>
                            <ul>
                                <li>
                                    <span className="location__icon" aria-hidden="true">📞</span>
                                    <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
                                        {CONTACT_INFO.phone}
                                    </a>
                                </li>
                                <li>
                                    <span className="location__icon" aria-hidden="true">📱</span>
                                    <a href={`https://wa.me/${CONTACT_INFO.phone.replace(/\+| /g, '')}`} target="_blank" rel="noopener noreferrer">
                                        WhatsApp: {CONTACT_INFO.phone}
                                    </a>
                                </li>
                                <li>
                                    <span className="location__icon" aria-hidden="true">✉️</span>
                                    <a href={`mailto:${CONTACT_INFO.email}`}>
                                        {CONTACT_INFO.email}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Links - FR-9.4 */}
                        <div className="location__social">
                            <h3>Follow Us</h3>
                            <div className="location__social-links">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="location__social-link"
                                        aria-label={`Follow us on ${social.name}`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Nearby Attractions - FR-9.8 */}
                        <div className="location__attractions">
                            <h3>Nearby</h3>
                            <ul>
                                {NEARBY_ATTRACTIONS.map((attraction) => (
                                    <li key={attraction.name}>
                                        <span className="location__attraction-icon" aria-hidden="true">
                                            {attraction.icon}
                                        </span>
                                        <span className="location__attraction-name">{attraction.name}</span>
                                        <span className="location__attraction-distance">
                                            {attraction.distance} • {attraction.time}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Contact Form - FR-9.5, FR-9.6, FR-9.7 */}
                    <div className="location__form-wrapper">
                        <h3 className="location__form-title">Send Us a Message</h3>

                        {/* Success Message */}
                        {submitStatus === 'success' && (
                            <div className="location__alert location__alert--success" role="alert">
                                <strong>Thank you!</strong> Your message has been sent successfully.
                                We'll respond within 24 hours.
                            </div>
                        )}

                        {/* Error Message */}
                        {submitStatus === 'error' && (
                            <div className="location__alert location__alert--error" role="alert">
                                <strong>Oops!</strong> Something went wrong. Please try again later.
                            </div>
                        )}

                        <form
                            className="location__form"
                            onSubmit={handleSubmit}
                            noValidate
                            aria-label="Contact form"
                        >
                            {/* Name Field */}
                            <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
                                <label htmlFor="contact-name">
                                    Full Name <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                    autoComplete="name"
                                    placeholder="Your full name"
                                />
                                {errors.name && (
                                    <span id="name-error" className="form-error" role="alert">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
                                <label htmlFor="contact-email">
                                    Email Address <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                    autoComplete="email"
                                    placeholder="your@email.com"
                                />
                                {errors.email && (
                                    <span id="email-error" className="form-error" role="alert">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className={`form-group ${errors.phone ? 'form-group--error' : ''}`}>
                                <label htmlFor="contact-phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="contact-phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                    autoComplete="tel"
                                    placeholder="+92 3XX XXXXXXX"
                                />
                                {errors.phone && (
                                    <span id="phone-error" className="form-error" role="alert">
                                        {errors.phone}
                                    </span>
                                )}
                            </div>

                            {/* Subject Field */}
                            <div className={`form-group ${errors.subject ? 'form-group--error' : ''}`}>
                                <label htmlFor="contact-subject">
                                    Subject <span aria-hidden="true">*</span>
                                </label>
                                <select
                                    id="contact-subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.subject}
                                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                                >
                                    <option value="">Select a subject...</option>
                                    <option value="reservation">Room Reservation</option>
                                    <option value="event">Event Inquiry</option>
                                    <option value="spa">Spa Booking</option>
                                    <option value="dining">Dining Reservation</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.subject && (
                                    <span id="subject-error" className="form-error" role="alert">
                                        {errors.subject}
                                    </span>
                                )}
                            </div>

                            {/* Message Field */}
                            <div className={`form-group ${errors.message ? 'form-group--error' : ''}`}>
                                <label htmlFor="contact-message">
                                    Message <span aria-hidden="true">*</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? 'message-error' : undefined}
                                    placeholder="How can we help you?"
                                />
                                {errors.message && (
                                    <span id="message-error" className="form-error" role="alert">
                                        {errors.message}
                                    </span>
                                )}
                                <span className="form-help">
                                    {formData.message.length}/1000 characters
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg location__submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Location Styles */}
            <style>{`
        .location {
          background-color: var(--cream-light);
        }

        .location__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-10);
        }

        @media (min-width: 1024px) {
          .location__grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-12);
          }
        }

        /* Map - FR-9.1 */
        .location__map {
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 2px solid var(--luxe-gold);
          margin-bottom: var(--space-6);
        }

        /* Info Sections */
        .location__info h3 {
          font-family: var(--font-primary);
          font-size: var(--text-lg);
          color: var(--charcoal-darker);
          margin-bottom: var(--space-3);
          padding-bottom: var(--space-2);
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
        }

        .location__address,
        .location__contact-details,
        .location__social,
        .location__attractions {
          margin-bottom: var(--space-6);
        }

        .location__address address {
          font-style: normal;
          color: var(--charcoal-deep);
          margin-bottom: var(--space-3);
        }

        .location__contact-details ul,
        .location__attractions ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .location__contact-details li {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) 0;
        }

        .location__contact-details a {
          color: var(--charcoal-deep);
          transition: color var(--transition-fast);
        }

        .location__contact-details a:hover {
          color: var(--luxe-gold);
        }

        .location__icon {
          font-size: 1.25rem;
        }

        /* Social Links - FR-9.4 */
        .location__social-links {
          display: flex;
          gap: var(--space-3);
        }

        .location__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: var(--charcoal-darker);
          color: var(--pure-white);
          border-radius: 50%;
          font-size: var(--text-sm);
          font-weight: var(--font-weight-montserrat-semibold);
          transition: all 0.3s ease;
        }

        .location__social-link:hover {
          background: var(--luxe-gold);
          color: var(--charcoal-darker);
          transform: translateY(-3px);
        }

        .location__social-link:focus-visible {
          outline: 2px solid var(--luxe-gold);
          outline-offset: 3px;
        }

        /* Attractions - FR-9.8 */
        .location__attractions li {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) 0;
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
        }

        .location__attraction-icon {
          font-size: 1.25rem;
          width: 32px;
        }

        .location__attraction-name {
          flex: 1;
          color: var(--charcoal-deep);
        }

        .location__attraction-distance {
          font-size: var(--text-sm);
          color: var(--luxe-gold);
          font-weight: var(--font-weight-montserrat-medium);
        }

        /* Form Wrapper */
        .location__form-wrapper {
          background: var(--pure-white);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          box-shadow: var(--shadow-lg);
        }

        .location__form-title {
          font-family: var(--font-primary);
          font-size: var(--text-2xl);
          color: var(--charcoal-darker);
          margin-bottom: var(--space-6);
          text-align: center;
        }

        /* Alerts - FR-9.7 */
        .location__alert {
          padding: var(--space-4);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-6);
        }

        .location__alert--success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid #22c55e;
          color: #166534;
        }

        .location__alert--error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          color: #991b1b;
        }

        /* Form Groups - FR-9.6 */
        .form-group {
          margin-bottom: var(--space-5);
        }

        .form-group label {
          display: block;
          font-weight: var(--font-weight-montserrat-medium);
          color: var(--charcoal-deep);
          margin-bottom: var(--space-2);
        }

        .form-group label span {
          color: var(--luxe-gold);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: var(--space-3) var(--space-4);
          font-family: var(--font-secondary);
          font-size: var(--text-base);
          color: var(--charcoal-darker);
          background: var(--cream-light);
          border: 2px solid transparent;
          border-radius: var(--radius-md);
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--luxe-gold);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
        }

        .form-group--error input,
        .form-group--error select,
        .form-group--error textarea {
          border-color: #ef4444;
        }

        .form-error {
          display: block;
          color: #ef4444;
          font-size: var(--text-sm);
          margin-top: var(--space-1);
        }

        .form-help {
          display: block;
          color: var(--charcoal-deep);
          font-size: var(--text-xs);
          margin-top: var(--space-1);
          opacity: 0.7;
          text-align: right;
        }

        .location__submit {
          width: 100%;
          margin-top: var(--space-4);
        }

        .location__submit:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        @media (prefers-reduced-motion: reduce) {
          .location__social-link {
            transition: none;
          }
        }
      `}</style>
        </section>
    );
}

export default Location;
