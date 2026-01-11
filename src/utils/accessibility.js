/**
 * @fileoverview Accessibility Utilities.
 * Implements WCAG 2.1 AA compliance helpers from SRS Section 3.2.4.
 * Features focus management, ARIA helpers, and contrast checking.
 * @version 1.0.0
 */

/**
 * Color contrast ratio calculator.
 * WCAG 2.1 requires minimum 4.5:1 for normal text, 3:1 for large text.
 * 
 * @param {string} foreground - Foreground color (hex)
 * @param {string} background - Background color (hex)
 * @returns {number} Contrast ratio
 */
export function getContrastRatio(foreground, background) {
    const getLuminance = (hex) => {
        const rgb = hexToRgb(hex);
        const [r, g, b] = rgb.map((c) => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Convert hex color to RGB array.
 * @param {string} hex - Hex color
 * @returns {number[]} RGB values
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ]
        : [0, 0, 0];
}

/**
 * Check if contrast meets WCAG AA requirements.
 * @param {string} foreground - Foreground color (hex)
 * @param {string} background - Background color (hex)
 * @param {boolean} isLargeText - Whether text is large (>=18pt or 14pt bold)
 * @returns {{ passes: boolean, ratio: number, required: number }}
 */
export function checkContrastCompliance(foreground, background, isLargeText = false) {
    const ratio = getContrastRatio(foreground, background);
    const required = isLargeText ? 3 : 4.5;

    return {
        passes: ratio >= required,
        ratio: Math.round(ratio * 100) / 100,
        required,
    };
}

/**
 * Trap focus within an element.
 * Used for modals and dialogs.
 * 
 * @param {HTMLElement} container - Container element
 * @returns {Function} Cleanup function
 */
export function trapFocus(container) {
    const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableElements = container.querySelectorAll(focusableSelectors);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();

    return () => {
        container.removeEventListener('keydown', handleKeyDown);
    };
}

/**
 * Announce message to screen readers.
 * Uses ARIA live region.
 * 
 * @param {string} message - Message to announce
 * @param {'polite' | 'assertive'} priority - Announcement priority
 */
export function announceToScreenReader(message, priority = 'polite') {
    let announcer = document.getElementById('sr-announcer');

    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'sr-announcer';
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
        document.body.appendChild(announcer);
    }

    // Clear and set new message
    announcer.textContent = '';
    setTimeout(() => {
        announcer.textContent = message;
    }, 100);
}

/**
 * Get all focusable elements within a container.
 * 
 * @param {HTMLElement} container - Container element
 * @returns {HTMLElement[]} Array of focusable elements
 */
export function getFocusableElements(container = document) {
    const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        'audio[controls]',
        'video[controls]',
        '[contenteditable]:not([contenteditable="false"])',
        'details>summary:first-of-type',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors));
}

/**
 * Restore focus to a previously focused element.
 * 
 * @param {HTMLElement} element - Element to focus
 * @param {Object} options - Focus options
 */
export function restoreFocus(element, options = { preventScroll: true }) {
    if (element && typeof element.focus === 'function') {
        element.focus(options);
    }
}

/**
 * Check for reduced motion preference.
 * 
 * @returns {boolean} True if user prefers reduced motion
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check for high contrast mode.
 * 
 * @returns {boolean} True if high contrast is enabled
 */
export function prefersHighContrast() {
    return window.matchMedia('(prefers-contrast: more)').matches;
}

/**
 * Generate unique ID for ARIA relationships.
 * 
 * @param {string} prefix - ID prefix
 * @returns {string} Unique ID
 */
export function generateAriaId(prefix = 'aria') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate that all images have alt text.
 * Development utility for accessibility auditing.
 * 
 * @returns {{ total: number, missing: HTMLImageElement[] }}
 */
export function auditImageAltText() {
    const images = document.querySelectorAll('img');
    const missing = [];

    images.forEach((img) => {
        if (!img.hasAttribute('alt')) {
            missing.push(img);
            console.warn('Missing alt text:', img);
        }
    });

    return {
        total: images.length,
        missing,
    };
}

export default {
    getContrastRatio,
    checkContrastCompliance,
    trapFocus,
    announceToScreenReader,
    getFocusableElements,
    restoreFocus,
    prefersReducedMotion,
    prefersHighContrast,
    generateAriaId,
    auditImageAltText,
};
