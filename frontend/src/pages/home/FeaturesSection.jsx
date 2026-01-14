import { motion } from "framer-motion";
import { Truck, Star, Repeat, Lock } from "lucide-react";

const features = [
  {
    title: "Free Shipping",
    description: "Complimentary shipping on orders over $200",
    icon: Truck,
  },
  {
    title: "Premium Quality",
    description: "Crafted with the finest materials",
    icon: Star,
  },
  {
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    icon: Repeat,
  },
  {
    title: "Secure Payment",
    description: "Protected transactions with encryption",
    icon: Lock,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-black relative overflow-hidden">

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-3 tracking-wide">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            A premium experience defined by craftsmanship, trust, and exclusivity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="
                  relative
                  bg-white/5
                  backdrop-blur-xl
                  border border-yellow-500/20
                  rounded-2xl
                  px-10 py-8
                  shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                  transition-all
                  group
                "
              >
                <div className="
                  absolute inset-0 rounded-2xl
                  opacity-0 group-hover:opacity-100
                  transition duration-500
                  bg-linear-to-br from-yellow-400/20 via-transparent to-yellow-600/20
                " />

                <div className="
                  relative z-10
                  w-14 h-14 mx-auto mb-5
                  rounded-full
                  bg-linear-to-br from-yellow-400 to-yellow-600
                  flex items-center justify-center
                  shadow-lg
                ">
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                    className="text-black"
                  />
                </div>

                <h3 className="relative z-10 font-serif text-base text-white mb-2 tracking-wide">
                  {feature.title}
                </h3>

                <div className="relative z-10 w-10 h-px bg-yellow-500 mx-auto mb-3 opacity-70" />

                <p className="relative z-10 text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;