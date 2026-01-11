/**
 * @fileoverview Golden Divider decorative component.
 * Implements gold divider styling per SRS Section 4.1.3.
 * @version 1.0.0
 */

import React from 'react';

/**
 * GoldenDivider component props.
 * @typedef {Object} GoldenDividerProps
 * @property {string} [className] - Additional CSS classes
 * @property {'narrow' | 'default' | 'wide'} [width='default'] - Divider width
 * @property {'left' | 'center' | 'right'} [align='center'] - Alignment
 * @property {boolean} [animated=false] - Enable glow animation
 * @property {boolean} [withDots=true] - Show decorative dots
 */

/**
 * Decorative golden divider component.
 * Used between sections and under titles for luxurious accent.
 * 
 * @component
 * @param {GoldenDividerProps} props - Component props
 * @returns {React.ReactElement} Divider element
 * 
 * @example
 * // Default centered divider
 * <GoldenDivider />
 * 
 * // Wide animated divider
 * <GoldenDivider width="wide" animated />
 * 
 * // Left-aligned narrow divider
 * <GoldenDivider width="narrow" align="left" />
 */
function GoldenDivider({
    className = '',
    width = 'default',
    align = 'center',
    animated = false,
    withDots = true,
    ...rest
}) {
    // Build class names
    const widthClass = width !== 'default' ? `divider-gold--${width}` : '';
    const alignClass = align !== 'center' ? `divider-gold--${align}` : '';
    const animatedClass = animated ? 'divider-gold--animated' : '';
    const dotsClass = !withDots ? 'divider-gold--no-dots' : '';

    const classes = [
        'divider-gold',
        widthClass,
        alignClass,
        animatedClass,
        dotsClass,
        className,
    ].filter(Boolean).join(' ');

    return (
        <div
            className={classes}
            role="separator"
            aria-hidden="true"
            {...rest}
        />
    );
}

export default GoldenDivider;
