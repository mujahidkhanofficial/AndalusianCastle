/**
 * @fileoverview AdaptiveVideo - Connection-aware video component.
 * Implements intelligent video loading based on network conditions and device capabilities.
 * 
 * Features:
 * - Intersection Observer for lazy loading
 * - Connection speed detection (4g/3g/2g)
 * - Device memory detection
 * - Fallback chain: Full video → Compressed → Poster image
 * - Automatic cleanup on unmount
 * 
 * @version 1.0.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Detects connection quality and device capabilities.
 * @returns {Object} Connection info with canLoadFullVideo and canLoadAnyVideo flags
 */
function getConnectionInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const deviceMemory = navigator.deviceMemory || 4; // Default to 4GB if not available

    // Default to capable if API not available
    if (!connection) {
        return {
            effectiveType: '4g',
            canLoadFullVideo: deviceMemory >= 4,
            canLoadAnyVideo: true,
            deviceMemory,
        };
    }

    const effectiveType = connection.effectiveType || '4g';
    const saveData = connection.saveData || false;

    // If user has data saver enabled, respect that
    if (saveData) {
        return {
            effectiveType,
            canLoadFullVideo: false,
            canLoadAnyVideo: false,
            deviceMemory,
            saveData: true,
        };
    }

    return {
        effectiveType,
        canLoadFullVideo: effectiveType === '4g' && deviceMemory >= 4,
        canLoadAnyVideo: effectiveType === '4g' || effectiveType === '3g',
        deviceMemory,
    };
}

/**
 * AdaptiveVideo Component
 * 
 * Intelligently loads video based on connection speed and device capabilities.
 * 
 * @param {Object} props
 * @param {string} props.fullVideoSrc - Path to full quality video (18.6 MB)
 * @param {string} props.compressedVideoSrc - Path to compressed video (≤2 MB)
 * @param {string} props.posterSrc - Path to poster image fallback
 * @param {string} props.className - CSS class for the container
 * @param {boolean} props.autoPlay - Whether to autoplay (default: true)
 * @param {boolean} props.muted - Whether video is muted (default: true)
 * @param {boolean} props.loop - Whether video loops (default: true)
 */
function AdaptiveVideo({
    fullVideoSrc,
    compressedVideoSrc,
    posterSrc,
    className = '',
    autoPlay = true,
    muted = true,
    loop = true,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [connectionInfo, setConnectionInfo] = useState(() => getConnectionInfo());

    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const observerRef = useRef(null);

    // Determine which video source to load
    const getVideoSource = useCallback(() => {
        if (videoError) return null;

        if (connectionInfo.canLoadFullVideo && fullVideoSrc) {
            return fullVideoSrc;
        }

        if (connectionInfo.canLoadAnyVideo && compressedVideoSrc) {
            return compressedVideoSrc;
        }

        return null;
    }, [connectionInfo, fullVideoSrc, compressedVideoSrc, videoError]);

    const videoSrc = getVideoSource();
    const shouldShowPoster = !videoSrc || !videoLoaded || videoError;

    // Intersection Observer for lazy loading
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '200px', // Start loading 200px before visible
            threshold: 0,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, stop observing
                    if (observerRef.current && containerRef.current) {
                        observerRef.current.unobserve(containerRef.current);
                    }
                }
            });
        }, options);

        if (containerRef.current) {
            observerRef.current.observe(containerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    // Listen for connection changes
    useEffect(() => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        if (connection) {
            const handleChange = () => {
                setConnectionInfo(getConnectionInfo());
            };

            connection.addEventListener('change', handleChange);
            return () => connection.removeEventListener('change', handleChange);
        }
    }, []);

    // Video event handlers
    const handleVideoLoaded = useCallback(() => {
        setVideoLoaded(true);
        setVideoError(false);
    }, []);

    const handleVideoError = useCallback(() => {
        setVideoError(true);
        setShowPlayButton(false);
    }, []);

    // Play video when clicking poster
    const handlePlayClick = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay blocked, show controls
                setShowPlayButton(true);
            });
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = '';
                videoRef.current.load();
            }
        };
    }, []);

    // If no video should load, show poster only with optional play button
    if (!connectionInfo.canLoadAnyVideo && !videoError) {
        return (
            <div ref={containerRef} className={`adaptive-video ${className}`}>
                <img
                    src={posterSrc}
                    alt=""
                    className="adaptive-video__poster"
                    loading="eager"
                    decoding="sync"
                    fetchpriority="high"
                />

                {/* Play button overlay for manual video load */}
                <button
                    className="adaptive-video__play-btn"
                    onClick={() => {
                        setConnectionInfo(prev => ({ ...prev, canLoadAnyVideo: true }));
                    }}
                    aria-label="Play video"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </button>

                <style>{adaptiveVideoStyles}</style>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`adaptive-video ${className}`}>
            {/* Poster image - always visible until video loads */}
            {shouldShowPoster && (
                <img
                    src={posterSrc}
                    alt=""
                    className={`adaptive-video__poster ${videoLoaded ? 'adaptive-video__poster--hidden' : ''}`}
                    loading="eager"
                    decoding="sync"
                    fetchpriority="high"
                />
            )}

            {/* Video element - only mount when visible */}
            {isVisible && videoSrc && (
                <video
                    ref={videoRef}
                    className={`adaptive-video__video ${videoLoaded ? 'adaptive-video__video--loaded' : ''}`}
                    autoPlay={autoPlay}
                    muted={muted}
                    loop={loop}
                    playsInline
                    preload="auto"
                    onLoadedData={handleVideoLoaded}
                    onError={handleVideoError}
                >
                    <source src={process.env.PUBLIC_URL + videoSrc} type="video/mp4" />
                </video>
            )}

            {/* Play button for blocked autoplay */}
            {showPlayButton && (
                <button
                    className="adaptive-video__play-btn"
                    onClick={handlePlayClick}
                    aria-label="Play video"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </button>
            )}

            <style>{adaptiveVideoStyles}</style>
        </div>
    );
}

const adaptiveVideoStyles = `
  .adaptive-video {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .adaptive-video__poster,
  .adaptive-video__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .adaptive-video__poster {
    z-index: 1;
    transition: opacity 0.5s ease;
  }

  .adaptive-video__poster--hidden {
    opacity: 0;
    pointer-events: none;
  }

  .adaptive-video__video {
    z-index: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .adaptive-video__video--loaded {
    opacity: 1;
    z-index: 1;
  }

  .adaptive-video__play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 80px;
    height: 80px;
    border: none;
    border-radius: 50%;
    background: rgba(212, 175, 55, 0.9);
    color: #1a1a1a;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .adaptive-video__play-btn:hover {
    background: #d4af37;
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 6px 30px rgba(212, 175, 55, 0.5);
  }

  .adaptive-video__play-btn svg {
    margin-left: 4px; /* Visual centering for play icon */
  }
`;

export default AdaptiveVideo;
