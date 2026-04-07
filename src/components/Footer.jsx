import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AimenSignature from "@/assets/AimenSignature.png";

const supportLink = (topic) =>
  `https://wa.me/923338600603?text=${encodeURIComponent(`Hello, I need help with ${topic}.`)}`;

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="border-t border-white/10 bg-gradient-to-b from-black/95 to-slate-950 py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                Stahl
              </span>{" "}
              <span className="text-white">Tech</span>
            </h3>
            <p className="max-w-md text-base md:text-lg leading-relaxed text-white/65">
              Handcrafted excellence since 1987. Each whip is a testament to
              traditional craftsmanship and uncompromising quality.
            </p>
          </div>

          {/* Collections */}
          <div className="space-y-5">
            <h4 className="text-base font-semibold uppercase tracking-[0.18em] text-white">
              Collections
            </h4>
            <ul className="space-y-3 text-base text-white/65">
              <li>
                <Link to="/?category=Bullwhips#collection" className="transition-colors hover:text-amber-300">
                  Bullwhips
                </Link>
              </li>
              <li>
                <Link to="/?category=Snake%20Whips#collection" className="transition-colors hover:text-amber-300">
                  Snake Whips
                </Link>
              </li>
              <li>
                <Link to="/?category=Stock%20Whips#collection" className="transition-colors hover:text-amber-300">
                  Stock Whips
                </Link>
              </li>
              <li>
                <Link to="/?category=Signal%20Whips#collection" className="transition-colors hover:text-amber-300">
                  Signal Whips
                </Link>
              </li>
              <li>
                <Link to="/?category=Accessories#collection" className="transition-colors hover:text-amber-300">
                  Accessories
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="text-base font-semibold uppercase tracking-[0.18em] text-white">
              Company
            </h4>
            <ul className="space-y-3 text-base text-white/65">
              <li>
                <Link to="/about" className="transition-colors hover:text-amber-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-amber-300">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-amber-300">
                  Materials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-amber-300">
                  Contact
                </Link>
              </li>
               <li>
                <Link to="/custom-manufacture" className="transition-colors hover:text-amber-300">
                  Custom Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-5">
            <h4 className="text-base font-semibold uppercase tracking-[0.18em] text-white">
              Support
            </h4>
            <ul className="space-y-3 text-base text-white/65">
              <li>
                <a href={supportLink('care guide')} target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-300">
                  Care Guide
                </a>
              </li>
              <li>
                <a href={supportLink('warranty')} target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-300">
                  Warranty
                </a>
              </li>
              <li>
                <a href={supportLink('returns')} target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-300">
                  Returns
                </a>
              </li>
              <li>
                <a href={supportLink('frequently asked questions')} target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm md:text-base text-white/55">
            © 2026 Stahl Tech Leather Whips. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://aimenansari.site/"
              target="_blank"
              rel="noreferrer"
              className="text-sm md:text-base text-white/55 transition-colors hover:text-amber-300"
            >
              Developed By.
            </a>
            <a
              href="https://aimenansari.site/"
              className="group block transition-opacity hover:opacity-80"
            >
              <img
                src={AimenSignature}
                alt="Aimen Ansari Signature"
                className="object-contain brightness-110 contrast-125 filter"
              width={64}
             
              />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
