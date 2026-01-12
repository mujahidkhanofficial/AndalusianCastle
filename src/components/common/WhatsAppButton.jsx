import React, { useState, useEffect } from 'react';

/**
 * WhatsAppButton Component
 * A luxurious, persistent floating action button for WhatsApp contact.
 * Features:
 * - Fixed positioning (bottom-right)
 * - Gold-gradient styling with micro-animations
 * - Tooltip reveal on hover
 * - High-definition SVG icon
 */
const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // WhatsApp contact details
    const phoneNumber = "923166268625"; // Provided in content or usually standard
    const message = encodeURIComponent("Hello! I would like to inquire about a stay at Andalusian Castle.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    useEffect(() => {
        // Show after 2 seconds or once scrolled a bit
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`whatsapp-btn ${isVisible ? 'whatsapp-btn--visible' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Contact us on WhatsApp"
            >
                <div className="whatsapp-btn__background" />

                {/* Tooltip */}
                <span className={`whatsapp-btn__tooltip ${isHovered ? 'whatsapp-btn__tooltip--visible' : ''}`}>
                    Enquire Now
                </span>

                {/* High-def WhatsApp SVG */}
                <svg
                    viewBox="0 0 24 24"
                    className="whatsapp-btn__icon"
                    fill="currentColor"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.048c0 2.12.554 4.189 1.605 6.04L0 24l6.117-1.605a11.847 11.847 0 005.933 1.598h.005c6.637 0 12.048-5.414 12.052-12.05a11.831 11.831 0 00-3.528-8.52z" />
                </svg>

                <div className="whatsapp-btn__ping" />
            </a>

            <style jsx>{`
        .whatsapp-btn {
          position: fixed;
          bottom: var(--space-6);
          right: var(--space-6);
          width: 60px;
          height: 60px;
          background: #25D366; /* WhatsApp Green */
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          z-index: 1000;
          opacity: 0;
          transform: translateY(20px) scale(0.8);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
          cursor: pointer;
        }

        .whatsapp-btn--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .whatsapp-btn:hover {
          transform: scale(1.1);
          background: #128C7E;
          box-shadow: 0 15px 35px rgba(37, 211, 102, 0.5);
        }

        .whatsapp-btn__icon {
          width: 32px;
          height: 32px;
          z-index: 2;
        }

        .whatsapp-btn__background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border-radius: 50%;
          z-index: 1;
        }

        .whatsapp-btn__tooltip {
          position: absolute;
          right: 120%;
          top: 50%;
          transform: translateY(-50%) translateX(10px);
          background: var(--charcoal-deep);
          color: var(--luxe-gold);
          padding: 8px 16px;
          border-radius: 4px;
          font-family: var(--font-secondary);
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.3s ease;
          border: 1px solid var(--luxe-gold);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .whatsapp-btn__tooltip--visible {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        /* Ping animation for attention */
        .whatsapp-btn__ping {
          position: absolute;
          inset: -4px;
          border: 2px solid #25D366;
          border-radius: 50%;
          opacity: 0;
          animation: ping 2s infinite;
        }

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        @media (max-width: 768px) {
          .whatsapp-btn {
            bottom: var(--space-4);
            right: var(--space-4);
            width: 54px;
            height: 54px;
          }
          
          .whatsapp-btn__tooltip {
            display: none; /* Hide tooltip on mobile */
          }
        }
      `}</style>
        </>
    );
};

export default WhatsAppButton;
