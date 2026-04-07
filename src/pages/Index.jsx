import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import CategoryBar from '@/components/CategoryBar';
import ProductGrid from '@/components/ProductGrid';
import ProductModal from '@/components/ProductModal';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductContext';

export default function Index() {
  const { products } = useProducts();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const normalizeCategory = (value = '') =>
    value.toLowerCase().replace(/[^a-z0-9]/g, '');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');

    if (categoryParam) {
      setActiveCategory(categoryParam);
    }

    if (location.hash === '#collection') {
      window.requestAnimationFrame(() => {
        const collectionSection = document.getElementById('collection');
        collectionSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.search, location.hash]);

  // Fix: Case-insensitive filtering to match Admin Console data
  const filteredProducts = activeCategory.toLowerCase() === 'all'
    ? products
    : products.filter(product => 
        normalizeCategory(product.category) === normalizeCategory(activeCategory)
      );

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <HeroCarousel />

      <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-black py-14 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10 px-4">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center rounded-full border border-amber-300/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
                About Us
              </span>
              <h2 className="max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Crafted with precision, designed with heritage.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
                Stahl Tech Leather Whips blends traditional craftsmanship with a modern luxury experience. Every piece is built by hand, carefully balanced, and finished to deliver both performance and timeless character.
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
                From raw materials to final inspection, our process is focused on detail, durability, and the kind of presentation that makes each product feel collectible.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02]"
                >
                  Learn More
                </Link>
                <div className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-medium text-white/80">
                  Handcrafted since 1987
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {[
                { value: '100%', label: 'Handcrafted' },
                { value: 'Premium', label: 'Materials' },
                { value: 'Lifetime', label: 'Quality Focus' },
                { value: 'Luxury', label: 'Finish' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                >
                  <p className="font-serif text-3xl md:text-4xl text-white">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/55">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <CategoryBar 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      {/* If the filter results in 0, show a helpful message */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground font-serif italic">
            No masterpieces currently available in {activeCategory}.
          </p>
        </div>
      ) : (
        <ProductGrid 
          products={filteredProducts}
          onQuickView={handleQuickView}
        />
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <Footer />
    </motion.div>
  );
}