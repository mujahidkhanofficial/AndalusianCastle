/**
 * @fileoverview Form validation utility functions.
 * Implements validation per SRS Section 3.1.9 (FR-9.6).
 * @version 1.0.0
 */

/**
 * Email validation regex pattern.
 * @constant {RegExp}
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation regex pattern (international formats).
 * @constant {RegExp}
 */
const PHONE_REGEX = /^[\d\s\-+()]+$/;

/**
 * Validates an email address format.
 * 
 * @param {string} email - Email address to validate
 * @returns {boolean} Whether email is valid
 * 
 * @example
 * isValidEmail('user@example.com'); // true
 * isValidEmail('invalid-email'); // false
 */
export function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates a phone number format.
 * 
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone is valid
 * 
 * @example
 * isValidPhone('+34 123 456 789'); // true
 */
export function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return true; // Phone is optional
    return PHONE_REGEX.test(phone.trim()) && phone.replace(/\D/g, '').length >= 7;
}

/**
 * Validates that a string is not empty.
 * 
 * @param {string} value - Value to check
 * @returns {boolean} Whether value is non-empty
 * 
 * @example
 * isRequired('Hello'); // true
 * isRequired('   '); // false
 */
export function isRequired(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
}

/**
 * Validates date format and ensures it's in the future.
 * 
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {boolean} Whether date is valid and in the future
 * 
 * @example
 * isFutureDate('2026-12-25'); // true (if before that date)
 */
export function isFutureDate(dateString) {
    if (!dateString) return true; // Date may be optional
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
}

/**
 * Validates that check-out date is after check-in date.
 * 
 * @param {string} checkIn - Check-in date string
 * @param {string} checkOut - Check-out date string
 * @returns {boolean} Whether dates are valid
 * 
 * @example
 * isValidDateRange('2026-12-25', '2026-12-28'); // true
 */
export function isValidDateRange(checkIn, checkOut) {
    if (!checkIn || !checkOut) return true;
    return new Date(checkOut) > new Date(checkIn);
}

/**
 * Validates contact form data.
 * 
 * @param {Object} formData - Form data object
 * @param {string} formData.name - Guest name
 * @param {string} formData.email - Email address
 * @param {string} formData.phone - Phone number (optional)
 * @param {string} formData.checkIn - Check-in date (optional)
 * @param {string} formData.checkOut - Check-out date (optional)
 * @param {string} formData.message - Message content
 * @returns {Object} Validation result with errors
 * 
 * @example
 * const result = validateContactForm({ name: 'John', email: 'john@example.com', message: 'Hello' });
 * if (result.isValid) { // proceed }
 */
export function validateContactForm(formData) {
    const errors = {};

    if (!isRequired(formData.name)) {
        errors.name = 'Name is required';
    }

    if (!isRequired(formData.email)) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }

    if (formData.checkIn && !isFutureDate(formData.checkIn)) {
        errors.checkIn = 'Check-in date must be in the future';
    }

    if (!isValidDateRange(formData.checkIn, formData.checkOut)) {
        errors.checkOut = 'Check-out must be after check-in';
    }

    if (!isRequired(formData.message)) {
        errors.message = 'Message is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}
