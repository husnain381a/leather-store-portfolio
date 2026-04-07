import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onQuickView }) {
  return (
    <section id="collection" className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-3xl text-foreground md:text-4xl lg:text-5xl">
            Our Collection
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Each piece in our collection represents the culmination of traditional craftsmanship 
            and modern precision. Explore our range of handcrafted leather whips.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              index={index}
            />
          ))}
        </div>

        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="text-lg text-muted-foreground">
              No products found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
