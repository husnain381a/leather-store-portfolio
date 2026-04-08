import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Ruler, Palette, Tag } from 'lucide-react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: 'easeOut' },
  },
};

export default function ProductModal({ product, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!product) return null;
  const displayImage = product.image_url || "/placeholder.svg";
  const displaySize = product.size
    ? /ft\b/i.test(product.size)
      ? product.size
      : `${product.size} ft`
    : 'Standard';

  const handleWhatsAppInquiry = () => {
    const phoneNumber = '923338600603';
    const formattedPrice = Number(product.price).toLocaleString();
    const message = `Hello, I want to inquire about ${product.name} (${displaySize} | ${product.color || 'Brandy'}) priced at $${formattedPrice}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWishlist = () => {
    const query = new URLSearchParams({
      subject: 'Wishlist Inquiry',
      product: product.name,
    }).toString();

    onClose();
    navigate(`/contact?${query}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/90 p-3 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative my-2 w-full max-w-5xl overflow-y-auto rounded-sm bg-card shadow-2xl sm:my-0 sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="sticky left-[calc(100%-3rem)] top-3 z-20 rounded-full bg-card/90 p-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close quick view"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid md:grid-cols-2">
              <motion.div
                variants={itemVariants}
                className="relative aspect-[4/3] bg-secondary/5 md:aspect-auto"
              >
                <img src={displayImage} alt={product.name} className="h-full w-full object-cover" />
              </motion.div>

              <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-12">
                <motion.span variants={itemVariants} className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  {product.category}
                </motion.span>

                <motion.h2 variants={itemVariants} className="mt-4 font-serif text-2xl text-foreground sm:text-3xl lg:text-4xl">
                  {product.name}
                </motion.h2>

                <motion.p variants={itemVariants} className="mt-6 leading-relaxed text-muted-foreground">
                  {product.description || "Handcrafted with the finest materials for a premium feel and durability."}
                </motion.p>

                {/* Updated Specifications for Whips */}
                <motion.div variants={itemVariants} className="mt-8 grid grid-cols-1 gap-4 border-t border-border/50 pt-6 sm:grid-cols-3 sm:pt-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                      <Ruler className="h-4 w-4" />
                      <span className="text-[10px] uppercase tracking-wider">Size</span>
                    </div>
                    <p className="font-medium text-foreground">{displaySize}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                      <Palette className="h-4 w-4" />
                      <span className="text-[10px] uppercase tracking-wider">Color</span>
                    </div>
                    <p className="font-medium text-foreground">{product.color || "Brandy"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                      <Tag className="h-4 w-4" />
                      <span className="text-[10px] uppercase tracking-wider">Price</span>
                    </div>
                    <p className="font-serif text-2xl text-primary">${Number(product.price)}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="btn-luxury flex-1 py-4"
                  >
                    Enquire via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleWishlist}
                    className="btn-outline-luxury flex-1 py-4"
                  >
                    Wishlist
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}