/**
 * @fileoverview LazySection - Wrapper for lazy-loaded sections with skeleton fallback.
 * Provides smooth loading experience for below-fold content.
 * @version 1.0.0
 */

import React, { Suspense } from 'react';

/**
 * Skeleton placeholder component for lazy-loaded sections.
 * Displays a minimal loading state to prevent layout shift.
 */
function SectionSkeleton({ minHeight = '400px' }) {
    return (
        <div
            className="section-skeleton"
            style={{ minHeight }}
            aria-hidden="true"
            aria-label="Loading section..."
        >
            <div className="section-skeleton__inner">
                <div className="section-skeleton__title" />
                <div className="section-skeleton__subtitle" />
                <div className="section-skeleton__content">
                    <div className="section-skeleton__card" />
                    <div className="section-skeleton__card" />
                    <div className="section-skeleton__card" />
                </div>
            </div>

            <style>{`
        .section-skeleton {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fdfaf6 0%, #f5f0e8 100%);
          padding: var(--space-16, 4rem) var(--space-4, 1rem);
        }

        .section-skeleton__inner {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .section-skeleton__title {
          width: 280px;
          height: 40px;
          background: linear-gradient(90deg, #e8e4dc 25%, #f0ece4 50%, #e8e4dc 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .section-skeleton__subtitle {
          width: 400px;
          max-width: 90%;
          height: 20px;
          background: linear-gradient(90deg, #e8e4dc 25%, #f0ece4 50%, #e8e4dc 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.5s ease-in-out infinite;
          border-radius: 4px;
          animation-delay: 0.1s;
        }

        .section-skeleton__content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          width: 100%;
          margin-top: 1rem;
        }

        .section-skeleton__card {
          height: 300px;
          background: linear-gradient(90deg, #e8e4dc 25%, #f0ece4 50%, #e8e4dc 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.5s ease-in-out infinite;
          border-radius: 12px;
        }

        .section-skeleton__card:nth-child(2) {
          animation-delay: 0.2s;
        }

        .section-skeleton__card:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 768px) {
          .section-skeleton__content {
            grid-template-columns: 1fr;
          }
          .section-skeleton__card {
            height: 200px;
          }
        }
      `}</style>
        </div>
    );
}

/**
 * LazySection - Suspense wrapper for lazy-loaded components.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The lazy-loaded component
 * @param {string} props.minHeight - Minimum height for skeleton (default: '400px')
 * @returns {React.ReactElement}
 */
function LazySection({ children, minHeight = '400px' }) {
    return (
        <Suspense fallback={<SectionSkeleton minHeight={minHeight} />}>
            {children}
        </Suspense>
    );
}

export { LazySection, SectionSkeleton };
export default LazySection;
