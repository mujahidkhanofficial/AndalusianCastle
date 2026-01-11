/**
 * @fileoverview Container component for consistent content width.
 * Implements responsive container widths per SRS Section 4.2.
 * @version 2.0.0
 */

import React from 'react';

/**
 * Container component props.
 * @typedef {Object} ContainerProps
 * @property {React.ReactNode} children - Container content
 * @property {string} [className] - Additional CSS classes
 * @property {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'} [size='xl'] - Max-width size
 * @property {boolean} [centered=true] - Center container horizontally
 * @property {string} [as='div'] - HTML element to render as
 */

/**
 * Responsive container component for consistent layout width.
 * 
 * Sizes:
 * - sm: 640px max-width
 * - md: 768px max-width
 * - lg: 1024px max-width
 * - xl: 1280px max-width (default)
 * - 2xl: 1400px max-width
 * - full: No max-width
 * 
 * @component
 * @param {ContainerProps} props - Component props
 * @returns {React.ReactElement} Container wrapper element
 * 
 * @example
 * // Default container
 * <Container>
 *   <Content />
 * </Container>
 * 
 * // Narrow container for text content
 * <Container size="md">
 *   <article>Long form content</article>
 * </Container>
 * 
 * // Full-width container
 * <Container size="full">
 *   <FullWidthSection />
 * </Container>
 */
function Container({
    children,
    className = '',
    size = 'xl',
    centered = true,
    as: Component = 'div',
    ...rest
}) {
    // Build class names
    const sizeClass = size !== 'xl' ? `container-${size}` : '';
    const centerClass = centered ? '' : 'container--left';

    const classes = [
        'container',
        sizeClass,
        centerClass,
        className,
    ].filter(Boolean).join(' ');

    return (
        <Component className={classes} {...rest}>
            {children}
        </Component>
    );
}

export default Container;
