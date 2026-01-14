import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PromoSection = () => {
  return (
    <section className="relative py-36 overflow-hidden bg-black">
      
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
          alt="Promo"
          className="w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.12),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.35em] uppercase mb-6 text-amber-400"
        >
          Discover the Collection
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl font-semibold mb-8"
        >
          Curated for Excellence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-base md:text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Explore a refined selection of premium gymwear designed to elevate
          performance, discipline, and confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-4 px-10 py-4 rounded-full 
                       border border-amber-400/50 text-sm uppercase tracking-[0.25em]
                       text-amber-400 backdrop-blur-md bg-black/40
                       hover:bg-amber-400 hover:text-black
                       transition-all duration-500"
          >
            Shop Now
            <span className="w-8 h-px bg-amber-400 group-hover:bg-black transition-colors duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;