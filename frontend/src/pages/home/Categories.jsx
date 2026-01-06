import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import woman from "../../assets/woman.jpg"
import men from "../../assets/men.jpg"
import unisex from "../../assets/unisex.jpg"

const categories = [
  {
    name: "Men's Gym Wear",
    image: men,
    slug: "men",
  },
  {
    name: "Women's Gym Wear",
    image: woman,
    slug: "women",
  },
  {
    name: "Unisex Activewear",
    image: unisex,
    slug: "unisex",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-3 text-gray-900">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our carefully curated categories, each offering a unique selection of premium pieces.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <Link
                to={`/shop?category=${category.slug}`}
                className="group block relative aspect-3/4 overflow-hidden rounded-xl"
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl text-white mb-2">{category.name}</h3>
                  <span className="text-sm text-white/80 uppercase tracking-[0.2em] inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Shop Now
                    <span className="w-4 h-px bg-white/80 inline-block" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;