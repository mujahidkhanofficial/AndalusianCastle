/**
 * @fileoverview Section Container component for consistent section layout.
 * Implements section styling per SRS Section 4.2.
 * @version 2.0.0
 */

import React from 'react';

/**
 * SectionContainer component props.
 * @typedef {Object} SectionContainerProps
 * @property {React.ReactNode} children - Section content
 * @property {string} [id] - Section ID for navigation
 * @property {string} [className] - Additional CSS classes
 * @property {'default' | 'dark' | 'cream' | 'champagne'} [variant='default'] - Background variant
 * @property {string} [title] - Section title
 * @property {string} [subtitle] - Section subtitle
 * @property {boolean} [showDivider=true] - Show golden divider under title
 * @property {'sm' | 'md' | 'lg' | 'xl' | 'full'} [containerSize='xl'] - Max container width
 * @property {string} [ariaLabel] - Accessibility label
 */

/**
 * Section container component with consistent padding and styling.
 * 
 * Variants:
 * - default: Cream light background
 * - dark: Charcoal darker background
 * - cream: Cream elegant background
 * - champagne: Champagne accent background
 * 
 * @component
 * @param {SectionContainerProps} props - Component props
 * @returns {React.ReactElement} Section element
 * 
 * @example
 * // Section with header
 * <SectionContainer
 *   id="rooms"
 *   title="Rooms & Suites"
 *   subtitle="Discover our luxurious accommodations"
 *   variant="cream"
 * >
 *   <RoomGrid />
 * </SectionContainer>
 * 
 * // Dark section
 * <SectionContainer variant="dark" id="testimonials">
 *   <TestimonialsCarousel />
 * </SectionContainer>
 */
function SectionContainer({
    children,
    id,
    className = '',
    variant = 'default',
    title,
    subtitle,
    showDivider = true,
    containerSize = 'xl',
    ariaLabel,
    ...rest
}) {
    // Build section class names
    const variantClass = variant !== 'default' ? `section--${variant}` : '';
    const sectionClasses = [
        'section',
        variantClass,
        className,
    ].filter(Boolean).join(' ');

    // Container size class
    const containerSizeClass = containerSize !== 'xl' ? `container-${containerSize}` : '';
    const containerClasses = ['container', containerSizeClass].filter(Boolean).join(' ');

    // Determine title ID for aria-labelledby
    const titleId = id ? `${id}-title` : undefined;

    return (
        <section
            id={id}
            className={sectionClasses}
            aria-labelledby={title ? titleId : undefined}
            aria-label={!title ? ariaLabel : undefined}
            {...rest}
        >
            <div className={containerClasses}>
                {/* Section Header */}
                {(title || subtitle) && (
                    <header className="section-header">
                        {title && (
                            <h2 id={titleId} className="section-title">
                                {title}
                            </h2>
                        )}

                        {showDivider && title && (
                            <div className="divider-gold" aria-hidden="true" />
                        )}

                        {subtitle && (
                            <p className="section-subtitle">
                                {subtitle}
                            </p>
                        )}
                    </header>
                )}

                {/* Section Content */}
                {children}
            </div>
        </section>
    );
}

export default SectionContainer;
