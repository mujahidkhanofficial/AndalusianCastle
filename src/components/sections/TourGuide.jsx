import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Clock, ArrowRight, Compass } from 'lucide-react';

/**
 * Flattened Tour attractions data.
 */
const ATTRACTIONS_DATA = [
  {
    id: 'a1',
    name: "Grand Jamia Mosque",
    distance: "1 km",
    time: "5 min",
    desc: "One of the world's most beautiful and largest mosques, showcasing intricate Islamic architecture.",
    image: "/images/Tour/Grand_Jamia_Mosque.webp",
    tag: "Historical"
  },
  {
    id: 'a2',
    name: "Badshahi Mosque",
    distance: "25 km",
    time: "35–40 min",
    desc: "Iconic Mughal-era mosque and major tourist landmark, once the largest in the world.",
    image: "/images/Tour/Badshahi_Mosque.webp",
    tag: "Cultural"
  },
  {
    id: 'a3',
    name: "Lahore Fort (Shahi Qila)",
    distance: "25 km",
    time: "35–40 min",
    desc: "UNESCO World Heritage Site beside Badshahi Mosque, a testament to Mughal grandeur.",
    image: "/images/Tour/Lahore_Fort.webp",
    tag: "Heritage"
  },
  {
    id: 'a4',
    name: "Shalimar Gardens",
    distance: "28 km",
    time: "40–45 min",
    desc: "Historic Mughal royal gardens with exquisite water features and multi-level terraces.",
    image: "/images/Tour/Shalimar.webp",
    tag: "Nature"
  },
  {
    id: 'a5',
    name: "Minar-e-Pakistan",
    distance: "24 km",
    time: "35 min",
    desc: "National monument and large public park commemorating the Lahore Resolution.",
    image: "/images/Tour/Minar_e_Pakistan.webp",
    tag: "National"
  },
  {
    id: 'a6',
    name: "Wazir Khan Mosque",
    distance: "26 km",
    time: "40 min",
    desc: "Famous for its incredibly detailed tile work and fresco paintings inside the Walled City.",
    image: "/images/Tour/Wazir_Khan_Mosque.webp",
    tag: "Architecture"
  },
  {
    id: 'a7',
    name: "Gurdwara Janam Asthan",
    distance: "35 km",
    time: "40 min",
    desc: "One of the holiest Sikh sites, the birthplace of Guru Nanak Dev Ji.",
    image: "/images/Tour/Gurdwara_Janam_Asthan.webp",
    tag: "Sikh Heritage"
  },
  {
    id: 'a8',
    name: "Gurdwara Sri Dera Sahib",
    distance: "26 km",
    time: "35 min",
    desc: "A significant Sikh temple located near the Lahore Fort, honoring Guru Arjan Dev Ji.",
    image: "/images/Tour/gurdwara_sri_dera_sahib_lahore.webp",
    tag: "Sikh Heritage"
  },
  {
    id: 'a9',
    name: "Gurdwara Bhai Taru Singh",
    distance: "25 km",
    time: "35 min",
    desc: "A historic Sikh shrine commemorating the sacrifice of Shaheed Bhai Taru Singh.",
    image: "/images/Tour/Gurdwara_Shaheed_Bhai_Taru_Singh_Lahore.webp",
    tag: "Sikh Heritage"
  },
  {
    id: 'a10',
    name: "Krishna Ram Mandir",
    distance: "25 km",
    time: "35 min",
    desc: "A prominent Hindu temple in Lahore, representing the city's diverse religious history.",
    image: "/images/Tour/Krishna_Ram_Mandir.webp",
    tag: "Hindu Heritage"
  },
  {
    id: 'a11',
    name: "Valmiki Mandir",
    distance: "24 km",
    time: "35 min",
    desc: "An ancient Hindu temple dedicated to Sage Valmiki, located near Anarkali Bazaar.",
    image: "/images/Tour/Valmiki_Tirath.webp",
    tag: "Hindu Heritage"
  },
  {
    id: 'a12',
    name: "Shri Hinglaj Mata Mandir",
    distance: "26 km",
    time: "40 min",
    desc: "A revered Hindu shrine dedicated to Goddess Hinglaj within the historic Walled City.",
    image: "/images/Tour/Shri_Hinglaj_Mata_Mandir.webp",
    tag: "Hindu Heritage"
  },
  {
    id: 'a13',
    name: "Anarkali Bazaar",
    distance: "22 km",
    time: "30-35 min",
    desc: "One of the oldest surviving markets in South Asia, famous for its history and legends.",
    image: "/images/Tour/Anarkali_Bazaar.webp",
    tag: "Shopping"
  },
  {
    id: 'a14',
    name: "Delhi Gate",
    distance: "26 km",
    time: "40 min",
    desc: "One of the six surviving historic gates of the Walled City, lead to vibrant local markets.",
    image: "/images/Tour/Delhi_Gate.webp",
    tag: "Exploration"
  },
  {
    id: 'a15',
    name: "Liberty Market",
    distance: "18 km",
    time: "25 min",
    desc: "A bustling modern shopping hub famous for clothing, jewelry, and street food.",
    image: "/images/Tour/Liberty_Market.webp",
    tag: "Lifestyle"
  },
  {
    id: 'a16',
    name: "MM Alam Road",
    distance: "19 km",
    time: "30 min",
    desc: "Lahore's premier fashion and dining strip, featuring high-end brands and cafes.",
    image: "/images/Tour/MM_Alam_Road.webp",
    tag: "Dining"
  },
  {
    id: 'a17',
    name: "Fort Road Food Street",
    distance: "25 km",
    time: "35–40 min",
    desc: "Heritage rooftop dining with stunning mosque views and authentic Lahori flavors.",
    image: "/images/Tour/Fort_Road_Food_Street.webp",
    tag: "Gourmet"
  },
  {
    id: 'a18',
    name: "Gawalmandi Food Street",
    distance: "24 km",
    time: "35 min",
    desc: "The original food street of Lahore, famous for its traditional Lahori breakfast and snacks.",
    image: "/images/Tour/Gawalmandi_Food_Street.webp",
    tag: "Traditional"
  },
  {
    id: 'a19',
    name: "Eiffel Tower Replica",
    distance: "1 km",
    time: "5 min",
    desc: "Popular photo attraction and vibrant commercial hub located right here in Bahria Town.",
    image: "/images/Tour/Eiffel_Tower_Replica.webp",
    tag: "Modern"
  },
  {
    id: 'a20',
    name: "Emporium Mall",
    distance: "17 km",
    time: "25 min",
    desc: "One of Pakistan's largest shopping malls, featuring international brands and entertainment.",
    image: "/images/Tour/Emporium_Mall.webp",
    tag: "Luxury"
  },
  {
    id: 'a21',
    name: "Packages Mall",
    distance: "20 km",
    time: "30 min",
    desc: "A modern shopping destination with a wide variety of outlets and a grand food court.",
    image: "/images/Tour/Lahore_Packages_Mall.webp",
    tag: "Modern"
  },
  {
    id: 'a22',
    name: "Jilani Park (Race Course)",
    distance: "20 km",
    time: "30 min",
    desc: "A beautiful public park known for its floral exhibitions and equestrian events.",
    image: "/images/Tour/Jilani_Park.webp",
    tag: "Outdoors"
  },
  {
    id: 'a23',
    name: "Safari Zoo Park",
    distance: "18 km",
    time: "25-30 min",
    desc: "A drive-through wildlife park offering close encounters with lions and tigers.",
    image: "/images/Tour/Safari_Zoo_Park.webp",
    tag: "Adventure"
  },
  {
    id: 'a24',
    name: "Lahori Food Street",
    distance: "25 km",
    time: "35 min",
    desc: "Experience the vibrant night life and street food culture of old Lahore.",
    image: "/images/Tour/lahore-food-street.webp",
    tag: "Culture"
  }
];

const AUTOPLAY_INTERVAL = 6000;

// 1. Memoized Thumbnail component for absolute performance
// 1. Memoized Thumbnail component for absolute performance
const ThumbnailItem = React.memo(({ place, isActive, onClick, index }) => (
  <motion.button
    onClick={() => onClick(index)}
    className={`thumbnail-btn ${isActive ? 'active' : ''}`}
    initial={false}
    animate={{
      scale: isActive ? 1.05 : 0.95,
      opacity: isActive ? 1 : 0.5,
      borderColor: isActive ? '#D4AF37' : 'rgba(255,255,255,0.1)'
    }}
    transition={{ type: "spring", stiffness: 400, damping: 40 }}
  >
    <img
      src={process.env.PUBLIC_URL + place.image}
      alt={place.name}
      decoding="async"
      loading="lazy"
    />
    <div className="thumb-overlay">
      <span>{place.name}</span>
    </div>
  </motion.button>
));

function TourGuide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef(null);
  const thumbnailTrackRef = useRef(null); // Native scroll ref

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailTrackRef.current) {
      const activeBtn = thumbnailTrackRef.current.children[currentIndex];
      if (activeBtn) {
        const track = thumbnailTrackRef.current;
        const scrollLeft = activeBtn.offsetLeft - (track.offsetWidth / 2) + (activeBtn.offsetWidth / 2);
        track.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);



  // Framer Motion Variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % ATTRACTIONS_DATA.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + ATTRACTIONS_DATA.length) % ATTRACTIONS_DATA.length);
  }, []);

  // 3. Handle Autoplay tab visibility (Visibility API)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAutoPlaying(false);
      } else {
        setIsAutoPlaying(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 4. Handle Autoplay Timer Logic
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) clearInterval(timerRef.current);

    if (isAutoPlaying) {
      timerRef.current = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, nextSlide, currentIndex]);

  const handleThumbnailClick = useCallback((idx) => {
    setCurrentIndex((prev) => {
      if (prev === idx) return prev;
      setDirection(idx > prev ? 1 : -1);
      return idx;
    });
  }, []);

  const currentItem = ATTRACTIONS_DATA[currentIndex];

  return (
    <section id="tour-guide" className="tour-guide-section">
      <div className="tour-container-wrapper">
        {/* Header Section */}
        <header className="tour-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tour-header-content"
          >
            <div className="tour-title-group">
              <span className="tour-subtitle-small">Local Highlights</span>
              <h2 className="tour-main-title">
                Explore <span className="text-gold italic">Lahore</span>
              </h2>
              <p className="tour-desc-text">
                From the historic Walled City to modern replicas, discover the vibrant soul
                of Pakistan's cultural capital with our curated guide.
              </p>
            </div>

            <div className="tour-counter">
              <span className="current-num">{(currentIndex + 1).toString().padStart(2, '0')}</span>
              <span className="divider">/</span>
              <span className="total-num">{ATTRACTIONS_DATA.length.toString().padStart(2, '0')}</span>
            </div>
          </motion.div>
        </header>

        {/* Main Slider Section */}
        <div
          className="slider-container"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="slider-frame">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="slide-wrapper"
              >
                {/* Unique Professional Category Badge */}
                <div className="tour-badge-container">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="tour-badge-museum"
                  >
                    <div className="badge-dot" />
                    <span className="tour-badge-text">{currentItem.tag}</span>
                  </motion.div>
                </div>

                {/* Background Image */}
                <div
                  className="slide-image-bg"
                  style={{ backgroundImage: `url(${process.env.PUBLIC_URL + currentItem.image})` }}
                >
                  <div className="overlay-gradient" />
                  <div className="overlay-dark" />
                </div>

                {/* Content Overlay */}
                <div className="slide-content-overlay">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="slide-info"
                  >
                    <h3 className="slide-title">
                      {currentItem.name}
                    </h3>

                    <p className="slide-description">
                      "{currentItem.desc}"
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation & Stats Controls Footer */}
            <div className="controls-footer">
              <div className="info-time">
                <Clock size={14} className="text-gold" />
                <span>{currentItem.time} • {currentItem.distance}</span>
              </div>

              <div className="nav-controls">
                <button onClick={prevSlide} className="nav-btn prev">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="nav-btn next">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-track">
              {isAutoPlaying && (
                <motion.div
                  key={currentIndex}
                  initial={{ width: 1 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                  className="progress-bar"
                />
              )}
            </div>
          </div>
        </div>

        {/* Native Scroll Thumbnail Footer - 120Hz Mobile Performance */}
        <footer
          className="thumbnail-footer"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="thumbnail-track native-scroll"
            ref={thumbnailTrackRef}
          >
            {ATTRACTIONS_DATA.map((place, idx) => (
              <ThumbnailItem
                key={place.id}
                place={place}
                index={idx}
                isActive={idx === currentIndex}
                onClick={handleThumbnailClick}
              />
            ))}
          </div>
        </footer>
      </div>

      <style>{`
        /* Core Layout */
        .tour-guide-section {
          background-color: #0a0a0a;
          color: white;
          padding: 60px 0;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
        }
        
        .bg-gold { background-color: #D4AF37; }
        .text-black { color: #000; }

        .tour-container-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* Header */
        .tour-header-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
        }
        
        @media (min-width: 768px) {
          .tour-header-content {
            flex-direction: row;
          }
        }

        .tour-title-group {
          flex: 1;
        }

        .tour-subtitle-small {
          color: #D4AF37;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-size: 0.875rem;
          display: block;
          margin-bottom: 8px;
        }

        .tour-main-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 300;
          letter-spacing: -0.025em;
          margin: 0 0 16px 0;
          line-height: 1.1;
          color: white;
        }

        @media (min-width: 768px) {
          .tour-main-title {
            font-size: 3.75rem;
          }
        }

        .text-gold { color: #D4AF37; }
        .italic { font-style: italic; }

        .tour-desc-text {
          color: #9ca3af;
          max-width: 28rem;
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.6;
        }
        
        @media (min-width: 768px) {
          .tour-desc-text {
            font-size: 1rem;
          }
        }

        .tour-counter {
          display: none;
        }
        
        @media (min-width: 768px) {
          .tour-counter {
            display: block;
            text-align: right;
            font-family: 'Playfair Display', serif;
          }
        }

        .current-num { font-size: 1.5rem; color: #D4AF37; }
        .divider { margin: 0 8px; color: #4b5563; }
        .total-num { color: #6b7280; }

        /* Slider Frame */
        .slider-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slider-frame {
          position: relative;
          width: 100%;
          height: 60vh;
          max-height: 900px;
          min-height: 500px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (min-width: 1024px) {
          .slider-frame {
            height: 85vh; /* Larger view for desktop */
          }
        }

        .slide-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .slide-image-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 1s ease;
        }

        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 5%, rgba(0,0,0,0.4) 40%, transparent 100%);
        }

        .overlay-dark {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.1);
        }

        /* Slide Content */
        .slide-content-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          z-index: 10;
        }

        @media (min-width: 768px) {
          .slide-content-overlay {
            padding: 80px; /* Higher padding to lower the text content */
          }
        }

        .slide-info {
          max-width: 800px;
          position: relative;
          z-index: 20;
          padding-right: 0;
          margin-bottom: 80px; /* More space for footer row on mobile */
        }

        @media (min-width: 768px) {
          .slide-info {
            padding-right: 120px;
            margin-bottom: 40px;
          }
        }

        .slide-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 500;
          line-height: 1.2;
          margin: 0 0 12px 0;
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        @media (min-width: 768px) {
          .slide-title {
            font-size: 3.5rem;
            margin: 0 0 16px 0;
          }
        }

        .slide-description {
          color: #e5e7eb;
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.5;
          opacity: 1;
          margin-bottom: 0;
          max-width: 40rem;
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }

        @media (min-width: 768px) {
          .slide-description {
            font-size: 1.125rem;
            line-height: 1.6;
          }
        }

        /* Combined Footer Controls (Nav + Info) */
        .controls-footer {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 30;
        }

        @media (min-width: 768px) {
          .controls-footer {
            bottom: 40px;
            left: 80px;
            right: 80px;
          }
        }

        .info-time {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #D4AF37;
          font-size: 0.7rem; /* Smaller font as requested */
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(0,0,0,0.5);
          padding: 6px 14px;
          border-radius: 99px;
          border-radius: 99px;
          /* backdrop-filter moved to desktop media query */
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        @media (min-width: 768px) {
          .info-time {
            font-size: 0.8rem;
          }
        }

        /* Nav Controls */
        .nav-controls {
          display: flex;
          gap: 10px;
          z-index: 30;
        }

        @media (min-width: 768px) {
          .nav-controls {
            bottom: 32px;
            right: 32px;
            gap: 12px;
          }
        }

        .nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(0, 0, 0, 0.4);
          background: rgba(0, 0, 0, 0.4);
          /* backdrop-filter moved to desktop media query */
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .nav-btn {
            width: 48px;
            height: 48px;
          }
        }

        .nav-btn:hover {
          background: #D4AF37;
          color: black;
          border-color: #D4AF37;
        }


        /* Progress Bar */
        .progress-track {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 10;
        }

        .progress-bar {
          height: 100%;
          background: #D4AF37;
        }

        /* Thumbnails - Optimized for Maximum Smoothness */
        .thumbnail-footer {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 40px 0;
          z-index: 100;
          display: block;
          background: transparent;
          contain: layout; /* Performance optimization */
        }

        .thumbnail-track.native-scroll {
          display: flex;
          gap: 16px;
          padding: 10px 24px;
          width: 100%; /* Fill container to allow scroll */
          overflow-x: auto; /* Native Scroll */
          scroll-behavior: smooth;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }
        
        .thumbnail-track.native-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        .thumbnail-btn {
          position: relative;
          flex-shrink: 0;
          width: 120px; /* Reduced for mobile */
          height: 72px;
          border-radius: 8px;
          overflow: visible;
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          padding: 0;
          outline: none;
          will-change: transform, opacity;
        }

        @media (min-width: 768px) {
          .thumbnail-btn {
            width: 160px;
            height: 96px;
          }
        }
        
        .thumbnail-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          display: block;
          transition: border-color 0.4s ease;
          /* content-visibility: auto; - Removed to prevent layout jitter */
        }

        .thumbnail-btn.active {
          border: 2px solid #D4AF37;
          /* Removed heavy box-shadow for performance during scroll */
          /* box-shadow: 0 0 25px rgba(212, 175, 55, 0.4); */ 
          z-index: 10;
        }

        .thumbnail-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: flex-end;
          padding: 8px;
        }

        .thumb-overlay span {
          color: white;
          font-size: 0.625rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        /* Unique Professional Category Badge */
        .tour-badge-container {
          position: absolute;
          top: 0;
          right: 40px;
          z-index: 20;
        }

        .tour-badge-museum {
          background: rgba(0, 0, 0, 0.7);
          background: rgba(0, 0, 0, 0.7);
          /* backdrop-filter moved to desktop media query */
          padding: 12px 24px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-top: none;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          position: relative;
        }

        /* The Gold Accent Notch */
        .tour-badge-museum::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }

        .tour-badge-museum::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: 0;
          border-style: solid;
          border-width: 10px 10px 0 0;
          border-color: rgba(212, 175, 55, 0.3) transparent transparent transparent;
          opacity: 0.5;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background-color: #D4AF37;
          border-radius: 50%;
          box-shadow: 0 0 10px #D4AF37;
        }

        .tour-badge-text {
          color: #ffffff;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          font-size: 0.65rem;
          font-family: 'Montserrat', sans-serif;
        }

        @media (min-width: 768px) {
          .tour-badge-text {
            font-size: 0.75rem;
          }
          .tour-badge-container {
            right: 60px;
          }
          /* Enable expensive blur only on desktop */
          .tour-badge-museum {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            background: rgba(0, 0, 0, 0.4); /* Lighter bg when blur works */
          }
          .info-time {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
          .nav-btn {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
        }

        /* Mobile Optimizations */
        @media (max-width: 767px) {
           .tour-badge-museum, .info-time, .nav-btn {
             backdrop-filter: none !important;
             -webkit-backdrop-filter: none !important;
             background: rgba(0, 0, 0, 0.85) !important; /* Solid fallback */
           }
           
           /* Fix for invisible arrow on tap: Force gold background on active/focus to match black icon */
           .nav-btn:active, .nav-btn:hover, .nav-btn:focus {
             background: #D4AF37 !important;
             border-color: #D4AF37 !important;
             color: black !important;
           }

           .thumbnail-track {
             /* Use hardware acceleration but avoid excessive memory usage on low-end */
             transform: translate3d(0,0,0);
           }
        }
      `}</style>
    </section>
  );
}

export default TourGuide;
