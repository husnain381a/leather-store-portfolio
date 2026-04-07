import { motion } from 'framer-motion';
import { ShieldCheck, Anchor, Hammer, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover grayscale"
            >
              <source src="/videos/craftsmanship.mp4" type="video/mp4" />
            </video>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative z-20 text-center px-6"
          >
            <span className="text-xs uppercase tracking-[0.5em] text-primary mb-4 block">Established 1987</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter italic">
              Legacy of <span className="text-primary">Precision</span>
            </h1>
          </motion.div>
        </section>

        {/* Brief Intro */}
        <section id="craftsmanship" className="container mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-8"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Crafting excellence <br />through traditional <br />hands.
              </h2>
              <div className="h-px w-24 bg-primary/50" />
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6 text-muted-foreground leading-relaxed text-lg"
            >
              <p>
                At StahlTech, we believe that true luxury lies in the details that only the human hand can provide. Each whip in our collection is the result of decades of refined technique and an uncompromising selection of materials.
              </p>
              <p>
                Our master craftsmen treat every piece not as a tool, but as a masterpiece—balancing weight, suppleness, and durability to create a timeless artifact that resonates with professional performers and discerning collectors alike.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="materials" className="bg-card/30 border-y border-border/50 py-24">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Hammer, title: "Hand-Braided", desc: "Intricate multi-strand braiding for unmatched flow." },
              { icon: Anchor, title: "Kangaroo Hide", desc: "Sourced responsibly for the world's strongest leather." },
              { icon: ShieldCheck, title: "Lifetime Quality", desc: "Constructed to endure generations of use." },
              { icon: Award, title: "Artisan Certification", desc: "Every piece signed by the crafting master." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1 } }
                }}
                className="text-center space-y-4 group"
              >
                <div className="mx-auto w-12 h-12 flex items-center justify-center border border-border group-hover:border-primary transition-colors duration-500">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}