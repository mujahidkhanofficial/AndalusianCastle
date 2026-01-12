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

import React, { lazy, useState, useEffect, useCallback } from 'react';
import { HERO_CONTENT } from './data/content';
import LazySection from './components/common/LazySection';
import Preloader from './components/common/Preloader';
import WhatsAppButton from './components/common/WhatsAppButton';

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
const Apartments = lazy(() => import('./components/sections/Apartments'));
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
    const [isLoading, setIsLoading] = useState(true);
    const [isHeroAnimating, setIsHeroAnimating] = useState(false);

    // Callback when critical content (Hero video) is ready
    const handleContentReady = useCallback(() => {
        // 1. Hide Preloader
        setIsLoading(false);

        // 2. Trigger Hero Animations after Preloader fade-out (2000ms buffer)
        // This ensures the preloader is completely gone AND the video has started fading in
        setTimeout(() => {
            setIsHeroAnimating(true);
        }, 100);
    }, []);

    // Safety timeout: Disable loader after 12 seconds max (for slow connections)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) {
                console.warn("Safety timeout triggered: Forcing content reveal.");
                handleContentReady();
            }
        }, 12000);
        return () => clearTimeout(timer);
    }, [isLoading, handleContentReady]);

    return (
        <div className="app">
            <Preloader isLoading={isLoading} />

            {/* ========== CRITICAL PATH - Above the fold ========== */}

            {/* Navigation - Fixed/Sticky on scroll */}
            <Navigation />

            {/* Header - Contains logo and branding */}
            <Header />

            {/* Main Content Sections */}
            <main>
                {/* Hero Section - Full viewport with adaptive video */}
                <Hero
                    {...HERO_CONTENT}
                    onReady={handleContentReady}
                    startAnimation={isHeroAnimating}
                />

                {/* ========== LAZY LOADED - Below the fold ========== */}

                {/* Apartments & Suites Section */}
                <LazySection minHeight="600px">
                    <Apartments />
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

            {/* Global Sticky WhatsApp Button */}
            <WhatsAppButton />
        </div>
    );
}

export default App;

