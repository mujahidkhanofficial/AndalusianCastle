/**
 * @fileoverview Styled Card component with luxury golden accents.
 * Implements card styling per SRS Section 4.1.3.
 * @version 2.0.0
 */

import React from 'react';

/**
 * Card component props.
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children - Card content
 * @property {string} [className] - Additional CSS classes
 * @property {string} [image] - Optional header image URL
 * @property {string} [imageAlt] - Image alt text for accessibility
 * @property {'default' | 'dark' | 'featured' | 'gold-accent'} [variant='default'] - Card variant
 * @property {() => void} [onClick] - Click handler for interactive cards
 * @property {React.ReactNode} [footer] - Optional footer content
 * @property {boolean} [hoverEffect=true] - Enable hover lift effect
 */

/**
 * Luxury styled card component with golden accents.
 * 
 * Variants:
 * - default: White card with subtle gold border
 * - dark: Dark background for contrast sections
 * - featured: Prominent gold border with top accent
 * - gold-accent: Top gold border accent
 * 
 * @component
 * @param {CardProps} props - Component props
 * @returns {React.ReactElement} Styled card element
 * 
 * @example
 * // Room card with image
 * <Card 
 *   image="/room.jpg" 
 *   imageAlt="Deluxe Suite"
 *   variant="featured"
 * >
 *   <h3>Deluxe Suite</h3>
 *   <p>Experience luxury accommodation</p>
 * </Card>
 * 
 * // Dark variant for testimonials
 * <Card variant="dark">
 *   <blockquote>Amazing experience!</blockquote>
 * </Card>
 */
function Card({
    children,
    className = '',
    image,
    imageAlt = '',
    variant = 'default',
    onClick,
    footer,
    hoverEffect = true,
    ...rest
}) {
    // Build class names
    const variantClass = variant !== 'default' ? `card--${variant}` : '';
    const hoverClass = hoverEffect ? '' : 'card--no-hover';
    const interactiveClass = onClick ? 'card--interactive' : '';

    const classes = [
        'card',
        variantClass,
        hoverClass,
        interactiveClass,
        className,
    ].filter(Boolean).join(' ');

    // Handle keyboard interaction for clickable cards
    const handleKeyDown = (e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <article
            className={classes}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={onClick ? imageAlt : undefined}
            {...rest}
        >
            {/* Card Image */}
            {image && (
                <div className="card-image">
                    <img
                        src={image}
                        alt={imageAlt}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            )}

            {/* Card Content */}
            <div className="card-content">
                {children}
            </div>

            {/* Optional Footer */}
            {footer && (
                <div className="card-footer">
                    {footer}
                </div>
            )}
        </article>
    );
}

export default Card;
