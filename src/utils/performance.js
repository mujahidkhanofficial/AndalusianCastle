/**
 * @fileoverview Performance Optimization Utilities.
 * Implements performance best practices from SRS Section 5.4.
 * Features debounced listeners, lazy loading, and image optimization.
 * @version 1.0.0
 */

/**
 * Debounce function for scroll/resize listeners.
 * Improves performance by limiting function execution rate.
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute on leading edge
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 100, immediate = false) {
    let timeout;

    return function executedFunction(...args) {
        const context = this;

        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

/**
 * Throttle function for continuous events.
 * Ensures function executes at most once per interval.
 * 
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between calls
 * @returns {Function} Throttled function
 */
export function throttle(func, limit = 100) {
    let inThrottle;

    return function executedFunction(...args) {
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Lazy load images using Intersection Observer.
 * Implements lazy loading from SRS 5.4.1.
 * 
 * @param {string} selector - CSS selector for images
 * @param {Object} options - Observer options
 */
export function lazyLoadImages(selector = 'img[data-src]', options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '50px 0px',
        threshold: 0.01,
    };

    const observerOptions = { ...defaultOptions, ...options };

    const loadImage = (img) => {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }

        if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
        }

        img.classList.add('loaded');
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const images = document.querySelectorAll(selector);
    images.forEach((img) => observer.observe(img));

    return observer;
}

/**
 * Generate responsive image srcset.
 * Creates srcset for WebP/AVIF with fallback.
 * 
 * @param {string} basePath - Base image path without extension
 * @param {number[]} widths - Array of widths
 * @param {string} format - Image format (webp, avif, jpg)
 * @returns {string} srcset string
 */
export function generateSrcset(basePath, widths = [320, 640, 960, 1280, 1920], format = 'webp') {
    return widths
        .map((w) => `${basePath}-${w}w.${format} ${w}w`)
        .join(', ');
}

/**
 * Preload critical resources.
 * Adds link preload for important assets.
 * 
 * @param {Array<{href: string, as: string, type?: string}>} resources
 */
export function preloadResources(resources) {
    resources.forEach(({ href, as, type, crossorigin }) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        if (crossorigin) link.crossOrigin = crossorigin;
        document.head.appendChild(link);
    });
}

/**
 * Request idle callback with fallback.
 * Schedules non-critical work.
 * 
 * @param {Function} callback - Function to execute
 * @param {Object} options - Options with timeout
 */
export function requestIdle(callback, options = { timeout: 2000 }) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, options);
    } else {
        setTimeout(callback, 50);
    }
}

/**
 * Performance mark and measure utility.
 * For performance monitoring.
 * 
 * @param {string} name - Mark/measure name
 * @param {string} type - 'start', 'end', 'measure'
 * @param {string} startMark - Start mark name for measure
 */
export function perfMark(name, type = 'start', startMark = null) {
    if (!window.performance || !window.performance.mark) return;

    try {
        switch (type) {
            case 'start':
                performance.mark(`${name}-start`);
                break;
            case 'end':
                performance.mark(`${name}-end`);
                break;
            case 'measure':
                performance.measure(
                    name,
                    startMark || `${name}-start`,
                    `${name}-end`
                );
                break;
            default:
                break;
        }
    } catch (e) {
        console.warn('Performance API error:', e);
    }
}

/**
 * Report Core Web Vitals.
 * Logs LCP, FID, CLS metrics.
 * 
 * @param {Function} reportCallback - Callback for metrics
 */
export function reportWebVitals(reportCallback) {
    if (!reportCallback || typeof reportCallback !== 'function') return;

    // Use web-vitals library in production
    // import { getCLS, getFID, getLCP } from 'web-vitals';
    // getCLS(reportCallback);
    // getFID(reportCallback);
    // getLCP(reportCallback);

    // Basic implementation
    if ('PerformanceObserver' in window) {
        try {
            // LCP
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                reportCallback({ name: 'LCP', value: lastEntry.startTime });
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

            // CLS
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                reportCallback({ name: 'CLS', value: clsValue });
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
            console.warn('Web Vitals observation error:', e);
        }
    }
}

export default {
    debounce,
    throttle,
    lazyLoadImages,
    generateSrcset,
    preloadResources,
    requestIdle,
    perfMark,
    reportWebVitals,
};
