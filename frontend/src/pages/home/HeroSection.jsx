import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero from "../../assets/hero.jpg"
const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <img
          src={hero}
          alt="Gym Fashion"
          className="w-full h-full object-cover object-left"
        />

        <div className="absolute inset-0 bg-linear-to-l from-white/90 via-white/60 to-transparent" />
      </div>


      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-2xl ml-auto text-right">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-gray-600 mb-4"
          >
            New Collection 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-7xl font-light leading-tight mb-6"
          >
            Built for
            <br />
            <span className="italic">PERFORMANCE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8 ml-auto max-w-lg"
          >
            Elevate your training with premium gym wear designed for strength,
            comfort, and confidence — made to move with you, every rep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-end"
          >
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-black bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-900 transition"
            >
              Shop Now
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/shop?collection=new"
              className="inline-flex items-center justify-center px-8 py-3 border border-black text-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
