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

const FeaturesSection = () => {
  return (
    <section className="pt-12 pb-16 px-12 bg-gray-50">
      <div className="container-luxury text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-2">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            A refined shopping experience built on quality, trust, and care.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="bg-gray-100 rounded-xl mx-4 py-6 border border-gray-100 shadow-sm hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                "
              >
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon size={36} className="text-gold" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-sm text-gray-900 mb-1">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed">
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