/**
 * @fileoverview Main application component for Andalusian Castle luxury hotel SPA.
 * Implements code-splitting with React.lazy() for optimal performance.
 * 
 * Performance optimizations:
 * - Critical above-fold components loaded synchronously (Navigation, Header, Hero)
 * - Below-fold sections lazy-loaded with Suspense boundaries
 * - Skeleton placeholders prevent layout shift during lazy load
 * 
 * @version 2.0.0
 */

import React, { lazy } from 'react';
import { HERO_CONTENT } from './data/content';
import LazySection from './components/common/LazySection';

// ============================================================
// CRITICAL PATH - Load immediately for fast LCP
// These components are above-the-fold and needed for first paint
// ============================================================
import Navigation from './components/layout/Navigation';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';

// ============================================================
// LAZY LOADED - Below-fold sections loaded on demand
// Each section is code-split into its own chunk
// ============================================================
const Rooms = lazy(() => import('./components/sections/Rooms'));
const Amenities = lazy(() => import('./components/sections/Amenities'));
const TourGuide = lazy(() => import('./components/sections/TourGuide'));
const Gallery = lazy(() => import('./components/sections/Gallery'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const Location = lazy(() => import('./components/sections/Location'));
const Footer = lazy(() => import('./components/layout/Footer'));

/**
 * Main application component.
 * Renders a single-page scroll-based SPA with optimized lazy loading.
 * 
 * @component
 * @returns {React.ReactElement} The complete Andalusian Castle website
 */
function App() {
    return (
        <div className="app">
            {/* ========== CRITICAL PATH - Above the fold ========== */}

            {/* Navigation - Fixed/Sticky on scroll */}
            <Navigation />

            {/* Header - Contains logo and branding */}
            <Header />

            {/* Main Content Sections */}
            <main>
                {/* Hero Section - Full viewport with adaptive video */}
                <Hero {...HERO_CONTENT} />

                {/* ========== LAZY LOADED - Below the fold ========== */}

                {/* Rooms & Suites Section */}
                <LazySection minHeight="600px">
                    <Rooms />
                </LazySection>

                {/* Amenities & Facilities Section */}
                <LazySection minHeight="500px">
                    <Amenities />
                </LazySection>

                {/* Tour Guide Section */}
                <LazySection minHeight="500px">
                    <TourGuide />
                </LazySection>

                {/* Photo Gallery Section */}
                <LazySection minHeight="600px">
                    <Gallery />
                </LazySection>

                {/* Testimonials/Reviews Section */}
                <LazySection minHeight="400px">
                    <Testimonials />
                </LazySection>

                {/* Location & Contact Section */}
                <LazySection minHeight="500px">
                    <Location />
                </LazySection>
            </main>

            {/* Footer - Multi-column layout with quick links */}
            <LazySection minHeight="300px">
                <Footer />
            </LazySection>
        </div>
    );
}

export default App;

