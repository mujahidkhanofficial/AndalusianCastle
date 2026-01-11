/**
 * @fileoverview HoverReveal component for interactive image overlays.
 * Implements hover reveal interactions per SRS Section 4.1.4.
 * @version 1.0.0
 */

import React from 'react';

/**
 * HoverReveal component props.
 * @typedef {Object} HoverRevealProps
 * @property {string} image - Image source URL
 * @property {string} imageAlt - Image alt text
 * @property {string} [title] - Overlay title
 * @property {string} [description] - Overlay description
 * @property {React.ReactNode} [children] - Custom overlay content
 * @property {React.ReactNode} [cta] - Call-to-action element
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [alwaysVisible=false] - Keep overlay always visible
 * @property {string} [aspectRatio='4/3'] - Image aspect ratio
 * @property {() => void} [onClick] - Click handler
 */

/**
 * Interactive image component with hover-revealed overlay content.
 * Used for gallery items, room previews, and feature highlights.
 * 
 * @component
 * @param {HoverRevealProps} props - Component props
 * @returns {React.ReactElement} HoverReveal element
 * 
 * @example
 * // Basic usage with title
 * <HoverReveal
 *   image="/room.jpg"
 *   imageAlt="Deluxe Suite"
 *   title="Deluxe Suite"
 *   description="Starting from €350/night"
 * />
 * 
 * // With CTA button
 * <HoverReveal
 *   image="/spa.jpg"
 *   imageAlt="Luxury Spa"
 *   title="Wellness Spa"
 *   cta={<Button variant="secondary">Book Treatment</Button>}
 * />
 * 
 * // Always visible variant
 * <HoverReveal
 *   image="/dining.jpg"
 *   imageAlt="Fine Dining"
 *   title="La Terraza"
 *   alwaysVisible
 * />
 */
function HoverReveal({
    image,
    imageAlt,
    title,
    description,
    children,
    cta,
    className = '',
    alwaysVisible = false,
    aspectRatio = '4/3',
    onClick,
    ...rest
}) {
    // Build class names
    const variantClass = alwaysVisible ? 'hover-reveal--always-visible' : '';
    const interactiveClass = onClick ? 'hover-reveal--interactive' : '';

    const classes = [
        'hover-reveal',
        variantClass,
        interactiveClass,
        className,
    ].filter(Boolean).join(' ');

    // Handle keyboard interaction
    const handleKeyDown = (e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
        }
    };

    // Custom styles for aspect ratio
    const wrapperStyle = {
        aspectRatio: aspectRatio,
    };

    return (
        <div
            className={classes}
            style={wrapperStyle}
            onClick={onClick}
            onKeyDown={onClick ? handleKeyDown : undefined}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            {...rest}
        >
            {/* Image */}
            <img
                src={image}
                alt={imageAlt}
                className="hover-reveal__image"
                loading="lazy"
                decoding="async"
            />

            {/* Overlay */}
            <div className="hover-reveal__overlay">
                <div className="hover-reveal__content">
                    {/* Custom children or default structure */}
                    {children || (
                        <>
                            {title && (
                                <h3 className="hover-reveal__title">{title}</h3>
                            )}
                            {description && (
                                <p className="hover-reveal__description">{description}</p>
                            )}
                        </>
                    )}

                    {/* CTA Button */}
                    {cta && (
                        <div className="hover-reveal__cta">
                            {cta}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HoverReveal;
