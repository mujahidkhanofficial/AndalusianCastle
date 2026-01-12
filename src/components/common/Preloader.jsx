/**
 * @fileoverview Luxury Preloader Component.
 * Full-screen initial load overlay with gold pulsing animation.
 * Masks the application until critical assets (Hero video) are ready.
 */

import React, { useEffect, useState } from 'react';

function Preloader({ isLoading }) {
    const [shouldRender, setShouldRender] = useState(true);

    // Handle unmount animation
    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setShouldRender(false), 1000); // 1s fade out
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!shouldRender) return null;

    return (
        <div className={`preloader ${!isLoading ? 'preloader--hiding' : ''}`}>
            <div className="preloader__content">
                {/* Luxury Gold Icon Pulse */}
                <svg
                    className="preloader__icon"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="pulse-path"
                        d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z"
                        fill="#D4AF37"
                    />
                    <circle cx="50" cy="50" r="15" fill="#1A1A1A" />
                </svg>

                <div className="preloader__text">ANDALUSIAN CASTLE</div>
                <div className="preloader__bar">
                    <div className="preloader__progress"></div>
                </div>
            </div>

            <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          background-color: #0a0a0a;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
        }

        .preloader--hiding {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .preloader__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .preloader__icon {
          width: 80px;
          height: 80px;
          animation: spin-pulse 3s infinite linear;
          filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.3));
        }

        .pulse-path {
          animation: inner-pulse 2s infinite ease-in-out alternate;
        }

        .preloader__text {
          font-family: 'Playfair Display', serif;
          color: #D4AF37;
          letter-spacing: 0.3em;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeUp 1s ease-out forwards 0.3s;
        }

        .preloader__bar {
          width: 150px;
          height: 1px;
          background: rgba(212, 175, 55, 0.2);
          overflow: hidden;
          position: relative;
        }

        .preloader__progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: #D4AF37;
          transform: translateX(-100%);
          animation: progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes spin-pulse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes inner-pulse {
          0% { opacity: 0.6; transform: scale(0.9); transform-origin: center; }
          100% { opacity: 1; transform: scale(1); transform-origin: center; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}

export default Preloader;
