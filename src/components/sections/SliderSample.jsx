import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Clock, ArrowRight } from 'lucide-react';

// Mock data for 25+ places
const tourPlaces = [
    {
        id: 1,
        title: "The Majestic Blue Lagoon",
        description: "Experience the serene turquoise waters surrounded by ancient volcanic rocks and premium spa facilities.",
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1600",
        location: "Crystal Bay"
    },
    {
        id: 2,
        title: "Royal Heritage Gardens",
        description: "Walk through centuries of history in our meticulously maintained botanical gardens and royal walkways.",
        imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1600",
        location: "Old Town District"
    },
    {
        id: 3,
        title: "Sunset Peak Observatory",
        description: "The highest point in the city offering breathtaking 360-degree views of the horizon at golden hour.",
        imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1600",
        location: "Mountain Ridge"
    },
    {
        id: 4,
        title: "Whispering Pine Forest",
        description: "A tranquil escape featuring misty trails, rare bird species, and secluded luxury picnic spots.",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600",
        location: "Northern Valley"
    },
    {
        id: 5,
        title: "Golden Sands Private Beach",
        description: "An exclusive stretch of pristine coastline with white sands and crystal clear snorkeling spots.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600",
        location: "Coastal Sector"
    },
    // Note: You can easily expand this array to 25+ items.
    // Adding placeholders to simulate large dataset
    ...Array.from({ length: 20 }).map((_, i) => ({
        id: i + 6,
        title: `Hidden Treasure #${i + 1}`,
        description: "Explore the untapped beauty and local secrets of our luxury resort's surrounding landscapes.",
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=1600`,
        location: "Exclusive Access"
    }))
];

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const timerRef = useRef(null);

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
        setCurrentIndex((prev) => (prev + 1) % tourPlaces.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + tourPlaces.length) % tourPlaces.length);
    }, []);

    // Handle Autoplay
    useEffect(() => {
        if (isAutoPlaying) {
            timerRef.current = setInterval(nextSlide, 6000);
        }
        return () => clearInterval(timerRef.current);
    }, [isAutoPlaying, nextSlide]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden flex flex-col">
            {/* Header Section */}
            <header className="pt-16 pb-8 px-6 md:px-12 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div className="space-y-2">
                        <span className="text-amber-500 font-medium tracking-[0.3em] uppercase text-sm block">Discover Excellence</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
                            Tour <span className="italic text-amber-500">Curations</span>
                        </h1>
                        <p className="text-gray-400 max-w-md text-sm md:text-base font-light leading-relaxed">
                            Hand-picked local experiences designed for our distinguished guests. Explore the beauty of {tourPlaces.length} exclusive destinations.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <span className="text-2xl font-serif text-amber-500">{(currentIndex + 1).toString().padStart(2, '0')}</span>
                            <span className="text-gray-600 mx-2">/</span>
                            <span className="text-gray-500">{tourPlaces.length.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* Main Slider Section */}
            <main
                className="relative flex-grow flex items-center justify-center px-4 md:px-12 mb-12"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                <div className="relative w-full max-w-7xl h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* Background Image with Parallax & Gradient */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                                style={{ backgroundImage: `url(${tourPlaces[currentIndex].imageUrl})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="max-w-2xl space-y-4"
                                >
                                    <div className="flex items-center gap-2 text-amber-500 text-xs md:text-sm font-medium uppercase tracking-widest">
                                        <MapPin size={16} />
                                        <span>{tourPlaces[currentIndex].location}</span>
                                    </div>

                                    <h2 className="text-3xl md:text-5xl font-serif font-medium leading-tight">
                                        {tourPlaces[currentIndex].title}
                                    </h2>

                                    <p className="text-gray-200 text-sm md:text-lg font-light leading-relaxed max-w-xl opacity-90">
                                        {tourPlaces[currentIndex].description}
                                    </p>

                                    <div className="pt-4 flex flex-wrap gap-4 items-center">
                                        <button className="bg-white text-black px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-amber-500 hover:text-white transition-all duration-300 group">
                                            Book Private Tour
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <div className="flex items-center gap-2 text-white/70 text-sm">
                                            <Clock size={16} />
                                            <span>Recommended 4-5 Hours</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="absolute bottom-8 right-8 flex gap-3 z-10">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-10">
                        <motion.div
                            key={currentIndex}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 6, ease: "linear" }}
                            className="h-full bg-amber-500"
                        />
                    </div>
                </div>
            </main>

            {/* Thumbnail / Mini-map Section for Desktop */}
            <footer className="hidden md:block px-12 max-w-7xl mx-auto w-full pb-12 overflow-x-auto no-scrollbar">
                <div className="flex gap-4">
                    {tourPlaces.map((place, index) => (
                        <button
                            key={place.id}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden transition-all duration-500 border-2 ${index === currentIndex ? 'border-amber-500 scale-105 shadow-lg' : 'border-transparent opacity-40 hover:opacity-70'
                                }`}
                        >
                            <img src={place.imageUrl} alt={place.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                                <span className="text-[10px] font-medium truncate uppercase tracking-tighter">{place.title}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </footer>

            {/* Custom Styles for hidden scrollbar */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
};

export default App;