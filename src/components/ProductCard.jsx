import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function ProductCard({ product, onQuickView, index }) {
  const displayImage = product.image_url || "/placeholder.svg";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group cursor-pointer"
      onClick={() => onQuickView(product)}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-secondary/10">
        <img
          src={displayImage}
          alt={product.name}
          className="product-card-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="quick-view-btn">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Eye className="h-4 w-4" />
            Quick View
          </motion.button>
        </div>
      </div>

      <div className="space-y-2 p-5">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {product.category || 'Leather Goods'}
        </span>
        
        <h3 className="font-serif text-xl text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {/* Displaying live color and size from Supabase */}
            {product.color} {product.size && `| ${product.size}`}
          </span>
          <span className="font-serif text-lg text-primary">
            ${Number(product.price).toLocaleString()}
          </span>
        </div>
      </div>
    </motion.article>
  );
}