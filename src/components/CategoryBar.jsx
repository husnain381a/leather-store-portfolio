import { motion } from 'framer-motion';
import { categories } from '@/data/products';

export default function CategoryBar({ activeCategory, onCategoryChange }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-4 scrollbar-luxury md:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`category-pill whitespace-nowrap ${
                activeCategory === category ? 'active' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
