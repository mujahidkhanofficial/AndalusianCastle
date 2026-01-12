/**
 * @fileoverview Tour Guide Section for exploring Lahore.
 * Rebuilt with Testimonial-style carousel to show attractions one by one.
 * Features touch/swipe support and auto-rotation.
 * @version 2.0.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Compass
} from 'lucide-react';

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

const AUTOPLAY_INTERVAL = 5000;

function TourGuide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef(null);
  const dotsRef = useRef(null);

  // Background preloading logic
  useEffect(() => {
    const preloadImage = (index) => {
      const item = ATTRACTIONS_DATA[index];
      if (item && item.image) {
        const img = new Image();
        img.src = process.env.PUBLIC_URL + item.image;
      }
    };

    const nextIndex = (currentIndex + 1) % ATTRACTIONS_DATA.length;
    const prevIndex = currentIndex === 0 ? ATTRACTIONS_DATA.length - 1 : currentIndex - 1;

    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [currentIndex]);

  // Scroll active dot into view
  useEffect(() => {
    const container = dotsRef.current;
    if (container) {
      const activeDot = container.querySelector('.tour-guide__dot--active');
      if (activeDot) {
        const scrollLeft = activeDot.offsetLeft - (container.offsetWidth / 2) + (activeDot.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setIsImageLoading(true); // Reset loading state for new image

    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 400); // Matches CSS transition duration
  }, [isTransitioning, currentIndex]);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % ATTRACTIONS_DATA.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = currentIndex === 0 ? ATTRACTIONS_DATA.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const currentItem = ATTRACTIONS_DATA[currentIndex];

  return (
    <section id="tour-guide" className="tour-guide section section--dark">
      <div className="container">
        {/* Section Header */}
        <header className="section-header text-center">
          <span className="accent-text text-gold">Local Highlights</span>
          <h2 className="section-title">
            Explore <span className="text-gold">Lahore</span> With Us
          </h2>
          <div className="divider-gold" aria-hidden="true" />
          <p className="section-subtitle">
            From the historic Walled City to modern replicas, discover the vibrant soul
            of Pakistan's cultural capital with our curated guide.
          </p>
        </header>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="tour-guide__carousel"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          role="region"
          aria-label="Tour attractions carousel"
        >
          <article className={`tour-guide__slide ${isTransitioning ? 'tour-guide__slide--hidden' : ''}`}>
            {/* Feature Image */}
            <div className="tour-guide__image-wrapper">
              <div className="tour-guide__image">
                {/* Loader Overlay */}
                {isImageLoading && (
                  <div className="tour-guide__loader">
                    <div className="tour-guide__spinner" />
                  </div>
                )}

                <img
                  key={currentItem.image} /* Force re-render to ensure onLoad fires for new src */
                  src={process.env.PUBLIC_URL + currentItem.image}
                  alt={currentItem.name}
                  loading="eager"
                  onLoad={() => setIsImageLoading(false)}
                  style={{
                    opacity: isImageLoading ? 0 : 1,
                    transition: 'opacity 0.6s ease-out'
                  }}
                />
                <div className="tour-guide__image-overlay" />
              </div>
              <div className="tour-guide__slide-tag">{currentItem.tag}</div>
            </div>

            {/* Content Area */}
            <div className="tour-guide__content">
              <h3 className="tour-guide__item-name">{currentItem.name}</h3>

              <div className="tour-guide__stats">
                <span className="tour-guide__stat">
                  <MapPin size={16} /> {currentItem.distance}
                </span>
                <span className="tour-guide__stat">
                  <Clock size={16} /> {currentItem.time}
                </span>
              </div>

              <p className="tour-guide__item-desc">"{currentItem.desc}"</p>

              <div className="tour-guide__action">
                <a
                  href="https://wa.me/923166268625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tour-guide__explore-btn"
                >
                  <Compass size={18} /> Plan This Visit
                </a>
              </div>
            </div>
          </article>

          {/* Navigation Arrows */}
          <button className="tour-guide__nav tour-guide__nav--prev" onClick={prevSlide} aria-label="Previous">
            <ChevronLeft size={24} />
          </button>
          <button className="tour-guide__nav tour-guide__nav--next" onClick={nextSlide} aria-label="Next">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="tour-guide__controls">
          <nav
            className="tour-guide__dots"
            ref={dotsRef}
            aria-label="Tour navigation dots"
          >
            {ATTRACTIONS_DATA.map((_, index) => (
              <button
                key={index}
                className={`tour-guide__dot ${index === currentIndex ? 'tour-guide__dot--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to item ${index + 1}`}
              />
            ))}
          </nav>
          <button
            className="tour-guide__play-toggle"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        {/* Disclaimer */}
        <div className="tour-guide__disclaimer">
          <div className="tour-guide__disclaimer-content">
            <Sparkles size={20} className="text-gold" />
            <p>
              Distances are calculated from Andalusian Castle in Bahria Town.
              We offer private chauffeur services and local certified guides
              for a seamless exploration experience.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .tour-guide {
          background: #121212;
          position: relative;
          z-index: 1;
        }

        .tour-guide__carousel {
          position: relative;
          max-width: 1250px;
          margin: var(--space-8) auto 0;
          padding: 0 var(--space-20);
          outline: none;
        }

        @media (max-width: 1280px) {
          .tour-guide__carousel {
            max-width: 1000px;
            padding: 0 var(--space-16);
          }
        }

        @media (max-width: 1024px) {
          .tour-guide__carousel {
            padding: 0 var(--space-12);
          }
        }

        .tour-guide__slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-8);
          text-align: center;
          opacity: 1;
          transform: scale(1);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          padding: var(--space-12) 0;
        }

        @media (min-width: 1024px) {
          .tour-guide__slide {
            flex-direction: row;
            text-align: left;
            align-items: center;
            gap: var(--space-16);
            padding: var(--space-16) 0;
          }
        }

        .tour-guide__slide--hidden {
          opacity: 0;
          transform: scale(0.95);
        }

        /* Image Styling */
        .tour-guide__image-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .tour-guide__image {
          width: 320px;
          height: 400px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 3px solid var(--luxe-gold);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          position: relative;
          transition: transform 0.4s ease;
          background-color: #0a0a0a; /* Fallback dark bg */
        }
        
        .tour-guide__loader {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #121212;
          z-index: 5;
        }
        
        .tour-guide__spinner {
          width: 40px;
          height: 40px;
          border: 2px solid rgba(212, 175, 55, 0.2);
          border-top-color: var(--luxe-gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (min-width: 1024px) {
          .tour-guide__image {
            width: 500px;
            height: 600px;
          }
        }

        @media (max-width: 640px) {
          .tour-guide__image {
            width: 280px;
            height: 350px;
          }
        }

        .tour-guide__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block; /* Removes bottom space */
        }

        .tour-guide__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7));
          pointer-events: none;
        }

        .tour-guide__slide-tag {
          position: absolute;
          top: 20px;
          right: -15px;
          background: var(--luxe-gold);
          color: var(--charcoal-darker);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 6px 15px;
          border-radius: var(--radius-sm);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
          transform: rotate(3deg);
          z-index: 2;
        }

        /* Content Styling */
        .tour-guide__content {
          flex: 1;
        }

        .tour-guide__item-name {
          font-family: var(--font-primary);
          font-size: var(--text-3xl);
          color: var(--pure-white);
          margin-bottom: var(--space-4);
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        @media (min-width: 1024px) {
          .tour-guide__item-name {
            font-size: var(--text-5xl);
            margin-bottom: var(--space-6);
          }
        }

        .tour-guide__stats {
          display: flex;
          gap: var(--space-6);
          justify-content: center;
          margin-bottom: var(--space-6);
        }

        @media (min-width: 1024px) {
          .tour-guide__stats {
            justify-content: flex-start;
          }
        }

        .tour-guide__stat {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--luxe-gold);
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tour-guide__item-desc {
          font-size: var(--text-lg);
          line-height: 1.6;
          color: var(--cream-elegant);
          opacity: 0.9;
          font-style: italic;
          margin-bottom: var(--space-8);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 1024px) {
          .tour-guide__item-desc {
            font-size: 1.25rem;
            max-width: 600px;
          }
        }

        @media (min-width: 1024px) {
          .tour-guide__item-desc {
            margin-left: 0;
            margin-right: 0;
          }
        }

        .tour-guide__explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 25px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--luxe-gold);
          color: var(--luxe-gold);
          border-radius: var(--radius-full);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .tour-guide__explore-btn:hover {
          background: var(--luxe-gold);
          color: var(--charcoal-darker);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
          transform: translateY(-3px);
        }

        /* Navigation */
        .tour-guide__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          color: var(--luxe-gold);
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .tour-guide__nav:hover {
          background: var(--luxe-gold);
          color: var(--charcoal-darker);
          border-color: var(--luxe-gold);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }

        .tour-guide__nav--prev { left: 0; }
        .tour-guide__nav--next { right: -0; }

        @media (min-width: 1440px) {
          .tour-guide__nav--prev { left: -20px; }
          .tour-guide__nav--next { right: -20px; }
        }

        @media (max-width: 768px) {
          .tour-guide__nav { display: none; }
        }

        /* Controls */
        .tour-guide__controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-8);
          margin-top: var(--space-12);
        }

        .tour-guide__dots {
          display: flex;
          justify-content: center;
          gap: var(--space-3);
          max-width: 100%;
          padding: var(--space-2) var(--space-4);
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .tour-guide__dots {
            justify-content: flex-start;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-bottom: var(--space-4);
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
          .tour-guide__dots::-webkit-scrollbar {
            display: none;
          }
        }

        .tour-guide__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid var(--luxe-gold);
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .tour-guide__dot--active {
          background: var(--luxe-gold);
          width: 24px;
          border-radius: var(--radius-full);
        }

        .tour-guide__play-toggle {
          background: none;
          border: none;
          color: var(--luxe-gold);
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
        }

        .tour-guide__play-toggle:hover { opacity: 1; }

        /* Disclaimer */
        .tour-guide__disclaimer {
          margin-top: var(--space-12);
          border-top: 1px solid rgba(212, 175, 55, 0.15);
          padding-top: var(--space-12);
          text-align: center;
          padding-bottom: var(--space-8);
        }

        .tour-guide__disclaimer-content {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: var(--space-5);
          padding: var(--space-5) var(--space-8);
          background: rgba(212, 175, 55, 0.06);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: var(--radius-lg);
          max-width: 850px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          margin: 0 var(--space-4);
        }

        @media (max-width: 640px) {
          .tour-guide__disclaimer-content {
            flex-direction: column;
            padding: var(--space-6) var(--space-5);
            gap: var(--space-3);
          }
        }

        .tour-guide__disclaimer-content .text-gold {
          color: var(--luxe-gold);
          flex-shrink: 0;
          filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
        }

        .tour-guide__disclaimer-content p {
          font-size: clamp(0.9rem, 2.5vw, 1.05rem);
          font-style: italic;
          font-weight: 500;
          color: var(--cream-elegant);
          opacity: 1;
          margin: 0;
          line-height: 1.7;
          letter-spacing: 0.01em;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
      `}</style>
    </section>
  );
}

export default TourGuide;
