/**
 * @fileoverview Styled Button component with luxury golden theme.
 * Implements CTA buttons per SRS Section 4.1.2.
 * @version 2.0.0
 */

import React from 'react';

/**
 * Button component props.
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - Button content
 * @property {'primary' | 'secondary' | 'tertiary' | 'dark'} [variant='primary'] - Button style variant
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Button size
 * @property {string} [className] - Additional CSS classes
 * @property {() => void} [onClick] - Click handler
 * @property {'button' | 'submit' | 'reset'} [type='button'] - Button type
 * @property {boolean} [disabled] - Disabled state
 * @property {string} [ariaLabel] - Accessibility label
 * @property {boolean} [ripple] - Enable ripple effect
 * @property {string} [href] - If provided, renders as anchor tag
 * @property {React.ReactNode} [icon] - Optional icon element
 * @property {'left' | 'right'} [iconPosition='left'] - Icon position
 */

/**
 * Luxury styled button component supporting multiple variants.
 * 
 * Variants:
 * - primary: Gold gradient with white text (main CTAs)
 * - secondary: Outlined gold border (alternative CTAs)
 * - tertiary: Ghost button for subtle actions
 * - dark: Dark gradient for light backgrounds
 * 
 * @component
 * @param {ButtonProps} props - Component props
 * @returns {React.ReactElement} Styled button element
 * 
 * @example
 * // Primary CTA
 * <Button variant="primary" size="lg">Book Your Stay</Button>
 * 
 * // Secondary with icon
 * <Button variant="secondary" icon={<ArrowIcon />} iconPosition="right">
 *   View Details
 * </Button>
 * 
 * // As link
 * <Button href="#rooms" variant="primary">Explore Rooms</Button>
 */
function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    ariaLabel,
    ripple = true,
    href,
    icon,
    iconPosition = 'left',
    ...rest
}) {
    // Build class names
    const sizeClass = size !== 'md' ? `btn-${size}` : '';
    const rippleClass = ripple ? 'btn-ripple' : '';
    const classes = [
        'btn',
        `btn-${variant}`,
        sizeClass,
        rippleClass,
        className,
    ].filter(Boolean).join(' ');

    // Content with optional icon
    const content = (
        <>
            {icon && iconPosition === 'left' && <span className="btn-icon-left">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="btn-icon-right">{icon}</span>}
        </>
    );

    // Render as anchor if href is provided
    if (href) {
        return (
            <a
                href={href}
                className={classes}
                aria-label={ariaLabel}
                {...rest}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            {...rest}
        >
            {content}
        </button>
    );
}

export default Button;
