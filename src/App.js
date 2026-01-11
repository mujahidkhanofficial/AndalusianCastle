/**
 * @fileoverview Main application component for Andalusian Castle luxury hotel SPA.
 * Orchestrates all section components in a single-page scroll-based layout.
 * @version 1.0.0
 */

import React from 'react';

import { HERO_CONTENT } from './data/content';

// Layout Components
import Navigation from './components/layout/Navigation';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Section Components
import Hero from './components/sections/Hero';
import Rooms from './components/sections/Rooms';
import Amenities from './components/sections/Amenities';
import TourGuide from './components/sections/TourGuide';
import Gallery from './components/sections/Gallery';
import Testimonials from './components/sections/Testimonials';
import Location from './components/sections/Location';

/**
 * Main application component.
 * Renders a single-page scroll-based SPA with all hotel sections.
 * 
 * @component
 * @returns {React.ReactElement} The complete Andalusian Castle website
 * 
 * @example
 * <App />
 */
function App() {
    return (
        <div className="app">
            {/* Navigation - Fixed/Sticky on scroll */}
            <Navigation />

            {/* Header - Contains logo and branding */}
            <Header />

            {/* Main Content Sections */}
            <main>
                {/* Hero Section - Full viewport with parallax */}
                <Hero {...HERO_CONTENT} />

                {/* Rooms & Suites Section */}
                <Rooms />

                {/* Amenities & Facilities Section */}
                <Amenities />

                {/* Tour Guide Section */}
                <TourGuide />

                {/* Photo Gallery Section */}
                <Gallery />

                {/* Testimonials/Reviews Section */}
                <Testimonials />

                {/* Location & Contact Section */}
                <Location />
            </main>

            {/* Footer - Multi-column layout with quick links */}
            <Footer />
        </div>
    );
}

export default App;
