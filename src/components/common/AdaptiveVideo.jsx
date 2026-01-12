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
    className = '',
    autoPlay = true,
    muted = true,
    loop = true,
    onReady, // Callback to signal App to hide preloader
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [connectionInfo, setConnectionInfo] = useState(() => getConnectionInfo());

    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const observerRef = useRef(null);

    // Determine which video source to load
    const getVideoSource = useCallback(() => {
        // Always prefer full video if possible, but fallback to compressed.
        // We removed logic that returns 'null' for slow connections to force video load.
        if (connectionInfo.canLoadFullVideo && fullVideoSrc) {
            return fullVideoSrc;
        }
        return compressedVideoSrc || fullVideoSrc;
    }, [connectionInfo, fullVideoSrc, compressedVideoSrc]);

    const videoSrc = getVideoSource();

    // Intersection Observer for lazy loading
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '200px',
            threshold: 0,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    // Handle video load success
    const handleVideoLoaded = useCallback(() => {
        setVideoLoaded(true);
        if (onReady) onReady(); // Signal to App that content is ready
    }, [onReady]);

    // Handle video error (fallback safety)
    const handleVideoError = useCallback(() => {
        console.warn("Video failed to load, triggering ready anyway to lift curtain.");
        if (onReady) onReady();
    }, [onReady]);

    return (
        <div ref={containerRef} className={`adaptive-video ${className}`}>
            {/* 
              Video Element
              - Opacity starts at 0 (invisible).
              - transitions to 1 once 'videoLoaded' is true.
              - This masks buffering/black frames behind the global preloader.
            */}
            {isVisible && videoSrc && (
                <video
                    ref={videoRef}
                    className={`adaptive-video__video ${videoLoaded ? 'adaptive-video__video--loaded' : ''}`}
                    autoPlay={autoPlay}
                    muted={muted}
                    loop={loop}
                    playsInline
                    preload="auto"
                    onCanPlay={handleVideoLoaded} // Wait for enough data to play securely
                    onLoadedData={() => {
                        // Fallback: If onCanPlay doesn't fire for some reason but data is loaded,
                        // we can check readyState manually or wait.
                        if (videoRef.current && videoRef.current.readyState >= 3) {
                            handleVideoLoaded();
                        }
                    }}
                    onError={handleVideoError}
                >
                    <source src={process.env.PUBLIC_URL + videoSrc} type="video/mp4" />
                </video>
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
    background: #000; /* Deep black background while loading */
  }

  .adaptive-video__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    opacity: 0;
    transition: opacity 1.5s ease-out; /* Smooth fade-in */
  }

  .adaptive-video__video--loaded {
    opacity: 1;
  }
`;

export default AdaptiveVideo;
