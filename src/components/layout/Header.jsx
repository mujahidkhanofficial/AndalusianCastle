/**
 * @fileoverview Header component wrapper with accessibility features.
 * Provides semantic structure and skip navigation.
 * @version 2.0.0
 */

import React from 'react';
import Navigation from './Navigation';

/**
 * Header component props.
 * @typedef {Object} HeaderProps
 * @property {string} [logoText] - Logo text passed to Navigation
 * @property {string} [ctaText] - CTA button text
 * @property {string} [ctaHref] - CTA button link
 */

/**
 * Header component with Navigation and accessibility features.
 * 
 * Features:
 * - Skip navigation link (NFR-4.7)
 * - Semantic header landmark
 * - Navigation integration
 * 
 * @component
 * @param {HeaderProps} props - Component props
 * @returns {React.ReactElement} Header element
 */
function Header({ logoText, ctaText, ctaHref }) {
    return (
        <Navigation
            logoText={logoText}
            ctaText={ctaText}
            ctaHref={ctaHref}
        />
    );
}

export default Header;
