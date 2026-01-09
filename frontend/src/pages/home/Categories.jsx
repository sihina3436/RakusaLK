import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import woman from "../../assets/woman.jpg";
import men from "../../assets/men.jpg";
import unisex from "../../assets/unisex.jpg";

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
    <section className="py-20 bg-black/90 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[0.35em] text-sm text-amber-400 mb-4">
            Collections
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Shop by Category
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto">
            Curated gymwear collections crafted for performance, discipline,
            and refined aesthetics.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden"
            >
              <Link
                to={`/shop?category=${category.slug}`}
                className="block relative aspect-3/4 overflow-hidden rounded-2xl"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_bottom,rgba(255,215,0,0.25),transparent_60%)]" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-serif text-2xl text-white mb-3">
                    {category.name}
                  </h3>

                  <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-amber-400 group-hover:gap-5 transition-all duration-500">
                    Shop Now
                    <span className="w-8 h-px bg-amber-400" />
                  </span>
                </div>
              </Link>

              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 group-hover:border-amber-400/40 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
