/**
 * @fileoverview Tour Guide Section for exploring Lahore.
 * Features categorized attractions with distance, time estimates, and background imagery.
 * Implements premium animations and visual polish.
 * @version 1.2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Clock,
  History,
  Palette,
  TreePine,
  ShoppingBag,
  HandMetal,
  Building2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

/**
 * Tour categories and attractions data with mapped images.
 */
const TOUR_CATEGORIES = [
  {
    id: 'historical',
    title: 'Historical & Cultural',
    icon: <History size={20} />,
    items: [
      {
        name: "Grand Jamia Mosque",
        distance: "1 km",
        time: "5 min",
        desc: "One of the world's most beautiful and largest mosques.",
        image: "/images/Tour/Grand_Jamia_Mosque.webp"
      },
      {
        name: "Badshahi Mosque",
        distance: "25 km",
        time: "35–40 min",
        desc: "Iconic Mughal-era mosque and major tourist landmark.",
        image: "/images/Tour/Badshahi_Mosque.webp"
      },
      {
        name: "Lahore Fort (Shahi Qila)",
        distance: "25 km",
        time: "35–40 min",
        desc: "UNESCO World Heritage Site beside Badshahi Mosque.",
        image: "/images/Tour/Lahore_Fort.webp"
      },
      {
        name: "Shalimar Gardens",
        distance: "28 km",
        time: "40–45 min",
        desc: "Historic Mughal royal gardens with exquisite water features.",
        image: "/images/Tour/Shalimar.webp"
      },
      {
        name: "Minar-e-Pakistan",
        distance: "24 km",
        time: "35 min",
        desc: "National monument and large public park in Greater Iqbal Park.",
        image: "/images/Tour/Minar_e_Pakistan.webp"
      },
      {
        name: "Wazir Khan Mosque",
        distance: "26 km",
        time: "40 min",
        desc: "Famous for detailed tile work inside Walled City.",
        image: "/images/Tour/Wazir_Khan_Mosque.webp"
      },
      {
        name: "Delhi Gate",
        distance: "26 km",
        time: "40–45 min",
        desc: "Authentic Old Lahore streets and culture.",
        image: "/images/Tour/Delhi_Gate.webp"
      },
      {
        name: "Gurdwara Dera Sahib",
        distance: "35 km",
        time: "35–40 min",
        desc: "Commemorates Guru Arjan Dev Ji; a major Sikh pilgrimage site near Lahore Fort.",
        image: "/images/Tour/gurdwara_sri_dera_sahib_lahore.webp"
      },
      {
        name: "Gurdwara Janam Asthan",
        distance: "35 km",
        time: "35–40 min",
        desc: "Birthplace of Guru Ram Das Ji, located in the historic Chuna Mandi Bazaar.",
        image: "/images/Tour/Gurdwara_Janam_Asthan.webp"
      },
      {
        name: "Gurdwara Bhai Taru Singh",
        distance: "34 km",
        time: "35 min",
        desc: "Historic site commemorating the martyrdom of Bhai Taru Singh in 1745.",
        image: "/images/Tour/Gurdwara_Shaheed_Bhai_Taru_Singh_Lahore.webp"
      },
      {
        name: "Valmiki Mandir",
        distance: "35 km",
        time: "35–40 min",
        desc: "Dedicated to Sage Valmiki, the revered author of the Ramayana.",
        image: "/images/Tour/Valmiki_Tirath.webp"
      },
      {
        name: "Krishna Mandir",
        distance: "34 km",
        time: "35 min",
        desc: "One of Lahore's few active Hindu temples, dedicated to Lord Krishna.",
        image: "/images/Tour/Krishna_Ram_Mandir.webp"
      },
      {
        name: "Shri Hinglaj Mata Mandir",
        distance: "35 km",
        time: "35–40 min",
        desc: "Sacred shrine devoted to Goddess Hinglaj within the Walled City area.",
        image: "/images/Tour/Shri_Hinglaj_Mata_Mandir.webp"
      },
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping & Food',
    icon: <ShoppingBag size={20} />,
    items: [
      {
        name: "Fort Road Food Street",
        distance: "25 km",
        time: "35–40 min",
        desc: "Heritage rooftop dining with stunning mosque views.",
        image: "/images/Tour/lahore-food-street.webp"
      },
      {
        name: "Anarkali Bazaar",
        distance: "22 km",
        time: "30–35 min",
        desc: "Traditional shopping and famous Old Food Street.",
        image: "/images/Tour/Anarkali_Bazaar.webp"
      },
      {
        name: "Liberty Market",
        distance: "18 km",
        time: "25–30 min",
        desc: "Popular shopping area with cafés and street food.",
        image: "/images/Tour/Liberty_Market.webp"
      },
      {
        name: "MM Alam Road",
        distance: "19 km",
        time: "30 min",
        desc: "Fine dining, designer cafés, and boutique restaurants.",
        image: "/images/Tour/MM_Alam_Road.webp"
      },
      {
        name: "Gawalmandi Food Street",
        distance: "24 km",
        time: "35–40 min",
        desc: "Famous destination for traditional Lahori desi food.",
        image: "/images/Tour/Gawalmandi_Food_Street.webp"
      },
    ]
  },
  {
    id: 'parks',
    title: 'Parks & Leisure',
    icon: <TreePine size={20} />,
    items: [
      {
        name: "Jilani (Race Course) Park",
        distance: "20 km",
        time: "30 min",
        desc: "Large green park for families and recreational walks.",
        image: "/images/Tour/Jilani_Park.webp"
      },
      {
        name: "Safari Zoo & Park",
        distance: "18 km",
        time: "25–30 min",
        desc: "Family-friendly wildlife park and natural reserve.",
        image: "/images/Tour/Safari_Zoo_Park.webp"
      },
    ]
  },
  {
    id: 'modern',
    title: 'Modern Attractions',
    icon: <Building2 size={20} />,
    items: [
      {
        name: "Eiffel Tower Replica",
        distance: "1 km",
        time: "5 min",
        desc: "Popular photo attraction and vibrant commercial hub in Bahria Town.",
        image: "/images/Tour/Eiffel_Tower_Replica.webp"
      },
      {
        name: "Emporium Mall",
        distance: "17 km",
        time: "25 min",
        desc: "Grand shopping, cinema, and international food court.",
        image: "/images/Tour/Emporium_Mall.webp"
      },
      {
        name: "Packages Mall",
        distance: "20 km",
        time: "30 min",
        desc: "Premium brands and wide family entertainment options.",
        image: "/images/Tour/Lahore_Packages_Mall.webp"
      },
    ]
  }
];

function TourGuide() {
  const [activeTab, setActiveTab] = useState('historical');
  const [currentPage, setCurrentPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  const ITEMS_PER_PAGE = 6;
  const currentCategory = TOUR_CATEGORIES.find(c => c.id === activeTab);
  const totalItems = currentCategory?.items || [];
  const totalPages = Math.ceil(totalItems.length / ITEMS_PER_PAGE);

  const paginatedItems = totalItems.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Intersection Observer for entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (isPaused || totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalPages, isPaused, activeTab]);

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);

  const handleNext = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section
      id="tour-guide"
      className="tour-guide section section--dark"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Section Header */}
        <header className="section-header text-center">
          <h2 className="section-title">
            Explore <span className="text-gold">Lahore</span> With Us
          </h2>
          <div className="divider-gold" aria-hidden="true" />
          <p className="section-subtitle">
            The heart of Pakistan’s history, culture, and vibrant city life! Whether you are visiting from abroad or elsewhere in Pakistan, our professional tour guides are here to make your experience safe, informative, and memorable.
          </p>
        </header>

        {/* Sticky Category Tabs */}
        <div className="tour-guide__nav-container">
          <nav className="tour-guide__tabs">
            {TOUR_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`tour-guide__tab ${activeTab === cat.id ? 'tour-guide__tab--active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
                aria-pressed={activeTab === cat.id}
              >
                <span className="tour-guide__tab-icon">{cat.icon}</span>
                <span className="tour-guide__tab-title">{cat.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Attractions Grid / Slider Area */}
        <div className="tour-guide__slider-wrap">
          {totalPages > 1 && (
            <>
              <button className="tour-guide__arrow tour-guide__arrow--prev" onClick={handlePrev} aria-label="Previous Page">
                <ChevronRight style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button className="tour-guide__arrow tour-guide__arrow--next" onClick={handleNext} aria-label="Next Page">
                <ChevronRight />
              </button>
            </>
          )}

          <div className={`tour-guide__grid ${isVisible ? 'tour-guide__grid--active' : ''}`}>
            {paginatedItems.map((item, idx) => (
              <article
                key={`${activeTab}-${currentPage}-${item.name}`}
                className="tour-guide__card"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="tour-guide__card-bg">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className="tour-guide__card-overlay" />
                </div>

                <div className="tour-guide__card-content">
                  <div className="tour-guide__card-header">
                    <h3 className="tour-guide__card-title">{item.name}</h3>
                    <div className="tour-guide__card-meta">
                      <span className="tour-guide__stat">
                        <MapPin size={14} /> {item.distance}
                      </span>
                      <span className="tour-guide__stat">
                        <Clock size={14} /> {item.time}
                      </span>
                    </div>
                  </div>

                  <p className="tour-guide__card-desc">{item.desc}</p>

                  <div className="tour-guide__card-footer">
                    <span className="tour-guide__explore-link">
                      Explore More <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="tour-guide__dots">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`tour-guide__dot ${currentPage === i ? 'tour-guide__dot--active' : ''}`}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Local Disclaimer */}
        <div className="tour-guide__disclaimer">
          <div className="tour-guide__disclaimer-content">
            <Sparkles size={20} className="text-gold" />
            <p>Distances are calculated from Andalusian Castle in Bahria Town, Lahore. We offer private chauffeur services and local certified guides for your exploration.</p>
          </div>
        </div>
      </div>

      <style>{`
        .tour-guide {
          background: #121212;
          color: var(--cream-elegant);
          position: relative;
          padding-bottom: var(--space-20);
          overflow: hidden;
        }

        /* Sticky Navigation */
        .tour-guide__nav-container {
          position: sticky;
          top: 80px; /* Adjust based on main nav height */
          z-index: 100;
          background: rgba(18, 18, 18, 0.9);
          backdrop-filter: blur(10px);
          padding: var(--space-4) 0;
          margin-bottom: var(--space-12);
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
        }

        .tour-guide__tabs {
          display: flex;
          gap: var(--space-3);
          justify-content: center;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 0 var(--space-4);
        }

        .tour-guide__tabs::-webkit-scrollbar { display: none; }

        .tour-guide__tab {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 50px;
          color: var(--cream-elegant);
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          font-family: var(--font-secondary);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tour-guide__tab--active {
          background: #D4AF37; /* Gold */
          color: #121212;
          border-color: #D4AF37;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        /* Slider Wrapper */
        .tour-guide__slider-wrap {
          position: relative;
          min-height: 800px;
        }

        .tour-guide__grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 25px;
          opacity: 0;
          transition: opacity 0.8s ease;
        }

        .tour-guide__grid--active {
          opacity: 1;
        }

        @media (min-width: 768px) {
          .tour-guide__grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .tour-guide__grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* Card Styling */
        .tour-guide__card {
          position: relative;
          height: 400px;
          border-radius: 15px;
          overflow: hidden;
          background: #1a1a1a;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          animation: fadeIn 0.8s ease backwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tour-guide__card:hover {
          transform: scale(1.02);
          box-shadow: 0 15px 40px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.1);
          z-index: 2;
        }

        .tour-guide__card-bg {
          position: absolute;
          inset: 0;
        }

        .tour-guide__card-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s ease;
        }

        .tour-guide__card:hover img { transform: scale(1.1); }

        .tour-guide__card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8));
        }

        /* Card Content */
        .tour-guide__card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 30px;
          z-index: 2;
        }

        .tour-guide__card-title {
          font-family: var(--font-primary);
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .tour-guide__card-meta {
          display: flex;
          gap: 20px;
        }

        .tour-guide__stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #D4AF37; /* Gold */
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .tour-guide__card-desc {
          font-size: 14px;
          color: #ccc;
          margin-top: 15px;
          line-height: 1.6;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .tour-guide__card:hover .tour-guide__card-desc {
          max-height: 100px;
          opacity: 1;
        }

        .tour-guide__card-footer {
          margin-top: 20px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s ease;
        }

        .tour-guide__card:hover .tour-guide__card-footer {
          opacity: 1;
          transform: translateY(0);
        }

        .tour-guide__explore-link {
          color: #D4AF37;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Controls */
        .tour-guide__arrow {
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .tour-guide__arrow:hover {
          background: #D4AF37;
          color: #121212;
        }

        .tour-guide__arrow--prev { left: -70px; }
        .tour-guide__arrow--next { right: -70px; }

        @media (max-width: 1200px) {
          .tour-guide__arrow--prev { left: 10px; }
          .tour-guide__arrow--next { right: 10px; }
        }

        .tour-guide__dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }

        .tour-guide__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tour-guide__dot--active {
          background: #D4AF37;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }

        /* Disclaimer */
        .tour-guide__disclaimer {
          margin-top: 60px;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 40px;
          text-align: center;
        }

        .tour-guide__disclaimer-content {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          padding: 20px 30px;
          background: rgba(212, 175, 55, 0.03);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 12px;
          max-width: 800px;
        }

        .tour-guide__disclaimer-content p {
          font-size: 14px;
          font-style: italic;
          color: var(--cream-light);
          opacity: 0.9;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </section>
  );
}

export default TourGuide;
