import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBullwhip from '@/assets/hero-bullwhip.jpg';
import heroSnakewhip from '@/assets/hero-snakewhip.jpg';
import heroStockwhip from '@/assets/hero-stockwhip.jpg';

const slides = [
  {
    id: 1,
    title: "Artisan Crafted",
    subtitle: "Excellence",
    description: "Each whip is hand-braided by master craftsmen using centuries-old techniques and the finest kangaroo leather.",
    image: heroBullwhip
  },
  {
    id: 2,
    title: "Timeless",
    subtitle: "Elegance",
    description: "From professional performers to discerning collectors, our whips represent the pinnacle of the craft.",
    image: heroSnakewhip
  },
  {
    id: 3,
    title: "Uncompromising",
    subtitle: "Quality",
    description: "Premium materials, meticulous construction, and a lifetime warranty stand behind every piece we create.",
    image: heroStockwhip
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-background sm:min-h-screen">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* Left - Text Content */}
        <div className="relative z-10 flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-16 xl:px-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
                Premium Leather Whips
              </span>
              
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block text-foreground">{slides[currentSlide].title}</span>
                <span className="block text-gradient-luxury">{slides[currentSlide].subtitle}</span>
              </h1>
              
              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                {slides[currentSlide].description}
              </p>
              
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-4">
                <Link to="/#collection" className="btn-luxury text-center">
                  Explore Collection
                </Link>
                <Link to="/about" className="btn-outline-luxury text-center">
                  Our Craft
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="mt-8 flex gap-3 sm:mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-0.5 transition-all duration-500 ${
                  index === currentSlide 
                    ? 'w-12 bg-primary' 
                    : 'w-6 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="h-full w-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Background Image */}
      <div className="pointer-events-none absolute inset-0 z-0 lg:hidden" aria-hidden="true">
        <img
          src={slides[currentSlide].image}
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>
    </section>
  );
}
