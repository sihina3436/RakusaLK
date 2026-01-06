import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero from "../../assets/hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">

      <div className="absolute inset-0 z-0">
        <img
          src={hero}
          alt="Premium Gym Wear"
          className="w-full h-full object-cover object-left"
        />

        <div className="absolute inset-0 bg-linear-to-l from-black/40 via-black/10 to-transparent" />

        <div className="absolute inset-0 ring-1 ring-black/10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-2xl ml-auto text-right text-white">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xs tracking-[0.35em] uppercase text-amber-400 mb-6"
          >
            New Collection 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-light leading-tight mb-8"
          >
            Built for
            <br />
            <span className="italic font-serif text-amber-400">
              PERFORMANCE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-white/85 mb-12 ml-auto max-w-lg leading-relaxed"
          >
            Elevate your training with premium gymwear crafted for strength,
            comfort, and confidence — engineered to move with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-end"
          >

            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-3
                         px-10 py-4 rounded-full
                         bg-black text-white
                         text-sm uppercase tracking-[0.25em]
                         hover:bg-white hover:text-black transition-all duration-500"
            >
              Shop Now
              <ArrowRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/shop?collection=new"
              className="inline-flex items-center justify-center
                         px-10 py-4 rounded-full
                         border border-amber-400/60
                         text-amber-400 text-sm uppercase tracking-[0.25em]
                         backdrop-blur-sm bg-black/30
                         hover:bg-amber-400 hover:text-black
                         transition-all duration-500"
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
