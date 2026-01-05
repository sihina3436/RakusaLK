import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PromoSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">

      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
          alt="Promo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container-luxury relative z-10 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase mb-4 text-gold"
        >
          Discover the Collection
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl mb-6"
        >
          Curated For You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/80 mb-8 max-w-xl mx-auto"
        >
          Explore our exclusive range of premium products, carefully selected to elevate your style and lifestyle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/shop"
            className="inline-block bg-gray-200 text-gray-500 px-8 py-4 text-sm uppercase tracking-[0.2em] rounded-full hover:bg-gold hover:text-black transition-colors"
          >
            SHOP NOW
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;