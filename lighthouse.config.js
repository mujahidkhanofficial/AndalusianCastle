/**
 * @fileoverview Lighthouse CI Configuration.
 * Performance testing configuration for CI/CD pipeline.
 * Targets: Performance >90, Accessibility >90, SEO >90
 * @version 1.0.0
 */

module.exports = {
    ci: {
        collect: {
            // Number of runs per URL
            numberOfRuns: 3,

            // URLs to test
            url: [
                'http://localhost:3000/',
                'http://localhost:3000/#rooms',
                'http://localhost:3000/#amenities',
                'http://localhost:3000/#dining',
                'http://localhost:3000/#gallery',
                'http://localhost:3000/#location',
            ],

            // Start server command
            startServerCommand: 'npm run serve',
            startServerReadyPattern: 'ready on',
            startServerReadyTimeout: 30000,

            // Chrome flags for accuracy
            settings: {
                chromeFlags: '--no-sandbox --disable-gpu --headless',
                preset: 'desktop',
                throttlingMethod: 'devtools',

                // Simulated 4G throttling (per SRS 5.4.1)
                throttling: {
                    rttMs: 150,
                    throughputKbps: 1638.4,
                    cpuSlowdownMultiplier: 4,
                },
            },
        },

        assert: {
            // Assertion configuration
            preset: 'lighthouse:recommended',

            assertions: {
                // PERFORMANCE TARGETS (SRS 5.4.1)
                // Target: Performance score >90
                'categories:performance': ['error', { minScore: 0.9 }],
                'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
                'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
                'interactive': ['error', { maxNumericValue: 4000 }], // TTI <4s
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['warn', { maxNumericValue: 300 }],
                'speed-index': ['warn', { maxNumericValue: 3500 }],

                // ACCESSIBILITY TARGETS (SRS 3.2.4)
                // Target: Accessibility score >90, WCAG 2.1 AA
                'categories:accessibility': ['error', { minScore: 0.9 }],
                'color-contrast': 'error',
                'document-title': 'error',
                'html-has-lang': 'error',
                'image-alt': 'error',
                'label': 'error',
                'link-name': 'error',
                'list': 'error',
                'listitem': 'error',
                'meta-viewport': 'error',
                'tabindex': 'error',
                'focus-visible': 'warn',
                'bypass': 'error', // Skip links
                'heading-order': 'warn',
                'landmark-one-main': 'warn',

                // SEO TARGETS (SRS 5.3)
                // Target: SEO score >90
                'categories:seo': ['error', { minScore: 0.9 }],
                'meta-description': 'error',
                'document-title': 'error',
                'http-status-code': 'error',
                'link-text': 'warn',
                'crawlable-anchors': 'warn',
                'is-crawlable': 'error',
                'robots-txt': 'warn',
                'canonical': 'warn',
                'hreflang': 'off', // Single language site

                // BEST PRACTICES
                'categories:best-practices': ['warn', { minScore: 0.85 }],
                'errors-in-console': 'warn',
                'image-aspect-ratio': 'warn',
                'image-size-responsive': 'warn',
                'js-libraries': 'off', // React is fine

                // SECURITY (SRS 5.4.3)
                'csp-xss': 'warn',
                'no-vulnerable-libraries': 'error',

                // PWA (Optional)
                'categories:pwa': 'off',
            },
        },

        upload: {
            // Upload to temporary public storage
            target: 'temporary-public-storage',

            // Or use Lighthouse CI server
            // target: 'lhci',
            // serverBaseUrl: 'https://your-lhci-server.example.com',
            // token: process.env.LHCI_TOKEN,
        },

        // Budgets for performance monitoring
        budgets: [
            {
                // JavaScript budget
                resourceType: 'script',
                budget: 300, // 300KB max
            },
            {
                // CSS budget
                resourceType: 'stylesheet',
                budget: 50, // 50KB max
            },
            {
                // Image budget per image
                resourceType: 'image',
                budget: 200, // 200KB max
            },
            {
                // Total page weight
                resourceType: 'total',
                budget: 1500, // 1.5MB max
            },
            {
                // Third-party scripts
                resourceType: 'third-party',
                budget: 100, // 100KB max
            },
        ],
    },
};
