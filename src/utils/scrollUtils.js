/**
 * @fileoverview Utility functions for smooth scrolling behavior.
 * Implements smooth scroll navigation per SRS Section 4.1.4.
 * @version 1.0.0
 */

/**
 * Default scroll offset in pixels to account for fixed navigation.
 * @constant {number}
 */
export const SCROLL_OFFSET = 80;

/**
 * Smoothly scrolls to a target element by ID.
 * 
 * @param {string} targetId - Element ID to scroll to (without #)
 * @param {number} [offset=SCROLL_OFFSET] - Offset from top in pixels
 * @returns {void}
 * 
 * @example
 * scrollToElement('rooms', 100);
 */
export function scrollToElement(targetId, offset = SCROLL_OFFSET) {
    const element = document.getElementById(targetId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
    });
}

/**
 * Smoothly scrolls to the top of the page.
 * 
 * @returns {void}
 * 
 * @example
 * scrollToTop();
 */
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

/**
 * Gets the currently active section based on scroll position.
 * 
 * @param {string[]} sectionIds - Array of section IDs to check
 * @param {number} [offset=0.3] - Offset ratio from top (0-1)
 * @returns {string|null} Currently active section ID
 * 
 * @example
 * const activeSection = getActiveSection(['hero', 'rooms', 'amenities']);
 */
export function getActiveSection(sectionIds, offset = 0.3) {
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * offset;

    for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom > threshold) {
            return id;
        }
    }

    return null;
}
