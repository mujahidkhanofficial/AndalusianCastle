/**
 * @fileoverview Location & Contact Section with Map and Validated Form.
 * Implements FR-9.1 through FR-9.8 from SRS Section 3.1.9.
 * Features embedded map and contact form with validation.
 * @version 4.0.0
 */

import React, { useState, useCallback } from 'react';
import {
    Mail,
    Phone,
    MessageSquare,
    User,
    Send,
    Tag,
    MapPin
} from 'lucide-react';
import emailjs from '@emailjs/browser';

/**
 * Form Sanitization.
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
 * - FR-9.5: Contact form with validation
 * - FR-9.6: Form field validation
 * - FR-9.7: Success/error messages
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
            const SERVICE_ID = 'service_jrzd6x9';
            const TEMPLATE_ID = 'template_1jsut4j';
            const PUBLIC_KEY = 'a9XK2OYIo0rXz_YcR';

            const templateParams = {
                from_name: sanitizedData.name,
                from_email: sanitizedData.email,
                phone_number: sanitizedData.phone,
                subject: sanitizedData.subject,
                message: sanitizedData.message,
                to_name: 'Andalusian Castle Admin',
            };

            const response = await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            if (response.status === 200) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                setTouched({});
                setErrors({});
            } else {
                throw new Error('Failed to send message');
            }
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
                        Get in <span className="text-gold">Touch</span>
                    </h2>
                    <div className="divider-gold" aria-hidden="true" />
                    <p className="section-subtitle">
                        Have questions? Our team is here to help you plan your perfect stay.
                    </p>
                </header>

                <div className="location__grid">
                    {/* Left Column: Map Only */}
                    <div className="location__map-container">
                        <div className="location__map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13620.597148816828!2d74.1814722!3d31.3623889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDIxJzQ0LjYiTiA3NMKwMTAnNTMuMyJF!5e0!3m2!1sen!2spk!4v1"
                                width="100%"
                                height="400"
                                style={{ border: 0, filter: 'sepia(20%) saturate(90%)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Andalusian Castle location map"
                            />
                        </div>
                        <div className="location__map-info">
                            <MapPin size={20} className="text-gold" />
                            <p>Plaza 100, Nishtar Block, Sector E, Bahria Town, Lahore</p>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="location__form-wrapper">
                        <h3 className="location__form-title">Send Us a Message</h3>

                        {/* Success Message */}
                        {submitStatus === 'success' && (
                            <div className="location__alert location__alert--success" role="alert">
                                <strong>Thank you!</strong> Your message has been sent successfully.
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
                            <div className="location__form-row">
                                <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
                                    <label htmlFor="contact-name">Full Name <span>*</span></label>
                                    <div className="form-input-wrapper">
                                        <User className="form-input-icon" size={18} />
                                        <input
                                            type="text"
                                            id="contact-name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    {errors.name && <span className="form-error">{errors.name}</span>}
                                </div>

                                <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
                                    <label htmlFor="contact-email">Email <span>*</span></label>
                                    <div className="form-input-wrapper">
                                        <Mail className="form-input-icon" size={18} />
                                        <input
                                            type="email"
                                            id="contact-email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    {errors.email && <span className="form-error">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="location__form-row">
                                <div className={`form-group ${errors.phone ? 'form-group--error' : ''}`}>
                                    <label htmlFor="contact-phone">Phone Number</label>
                                    <div className="form-input-wrapper">
                                        <Phone className="form-input-icon" size={18} />
                                        <input
                                            type="tel"
                                            id="contact-phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="+92 3XX XXXXXXX"
                                        />
                                    </div>
                                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                                </div>

                                <div className={`form-group ${errors.subject ? 'form-group--error' : ''}`}>
                                    <label htmlFor="contact-subject">Subject <span>*</span></label>
                                    <div className="form-input-wrapper">
                                        <Tag className="form-input-icon" size={18} />
                                        <select
                                            id="contact-subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                        >
                                            <option value="">Select a subject...</option>
                                            <option value="reservation">Room Reservation</option>
                                            <option value="event">Event Inquiry</option>
                                            <option value="spa">Spa Booking</option>
                                            <option value="dining">Dining Reservation</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {errors.subject && <span className="form-error">{errors.subject}</span>}
                                </div>
                            </div>

                            <div className={`form-group ${errors.message ? 'form-group--error' : ''}`}>
                                <label htmlFor="contact-message">Message <span>*</span></label>
                                <div className="form-input-wrapper form-input-wrapper--textarea">
                                    <MessageSquare className="form-input-icon" size={18} />
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <div className="form-footer">
                                    {errors.message && <span className="form-error">{errors.message}</span>}
                                    <span className="form-help">{formData.message.length}/1000</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg location__submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : (
                                    <>
                                        <Send size={18} style={{ marginRight: '8px' }} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
        .location {
          background-color: var(--cream-light);
          padding: var(--space-20) 0;
        }

        .location__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-10);
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .location__grid {
            grid-template-columns: 0.9fr 1.1fr;
            gap: var(--space-16);
            align-items: start;
          }
        }

        .location__map-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .location__map {
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.4);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          height: 400px;
        }

        .location__map iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .location__map-info {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          color: var(--charcoal-deep);
          font-weight: 500;
          padding: var(--space-2) 10px;
          background: rgba(212, 175, 55, 0.05);
          border-radius: var(--radius-md);
        }

        .location__map-info p {
          margin: 0;
          font-size: 0.95rem;
        }

        .text-gold {
          color: var(--luxe-gold);
        }

        .location__form-wrapper {
          background: #ffffff;
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: var(--radius-xl);
          padding: clamp(var(--space-6), 5vw, var(--space-10));
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
        }

        @media (min-width: 1024px) {
          .location__form-wrapper {
            position: sticky;
            top: 120px;
          }
        }

        .location__form-title {
          font-family: var(--font-primary);
          font-size: var(--text-3xl);
          color: var(--charcoal-darker);
          margin-bottom: var(--space-8);
          text-align: center;
          position: relative;
        }

        .location__form-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 2px;
          background: var(--luxe-gold);
        }

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

        .location__form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0 var(--space-4);
        }

        @media (min-width: 768px) {
          .location__form-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .form-group {
          margin-bottom: var(--space-3);
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--charcoal-deep);
          margin-bottom: var(--space-1);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group label span {
          color: var(--luxe-gold);
        }

        .form-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-input-icon {
          position: absolute;
          left: 14px;
          color: var(--luxe-gold);
          opacity: 0.8;
          pointer-events: none;
          transition: transform 0.3s ease;
        }

        .form-input-wrapper input,
        .form-input-wrapper select,
        .form-input-wrapper textarea {
          width: 100%;
          padding: 12px 14px 12px 42px;
          font-family: var(--font-secondary);
          font-size: 0.95rem;
          line-height: normal;
          color: var(--charcoal-darker);
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: var(--radius-md);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-input-wrapper--textarea {
          align-items: flex-start;
        }

        .form-input-wrapper--textarea .form-input-icon {
          top: 14px;
        }

        .form-input-wrapper textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-input-wrapper:focus-within .form-input-icon {
          transform: scale(1.1);
          opacity: 1;
        }

        .form-input-wrapper input:focus,
        .form-input-wrapper select:focus,
        .form-input-wrapper textarea:focus {
          outline: none;
          border-color: var(--luxe-gold);
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
        }

        .form-group--error input,
        .form-group--error select,
        .form-group--error textarea {
          border-color: #ff4d4d;
        }

        .form-error {
          display: block;
          color: #ff4d4d;
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: 4px;
        }

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
        }

        .form-help {
          font-size: 0.7rem;
          color: var(--charcoal-deep);
          opacity: 0.6;
          font-weight: 600;
        }

        .location__submit {
          width: 100%;
          margin-top: var(--space-4);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .location__submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
        </section>
    );
}

export default Location;
