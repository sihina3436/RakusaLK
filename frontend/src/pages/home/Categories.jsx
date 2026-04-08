import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetAllCategoriesQuery } from "../../redux/category/categoryAPI";

import woman from "../../assets/woman.jpg";
import men from "../../assets/men.jpg";
import unisex from "../../assets/unisex.jpg";


const categoryImages = {
  "Men": men,
  "Women's Gym Wear": woman,
  "Unisex Activewear": unisex,
};

const CategoriesSection = () => {
  const { data: categories = [], isLoading } = useGetAllCategoriesQuery();

  if (isLoading) {
    return (
      <div className="text-center text-yellow-500 py-20">
        Loading categories...
      </div>
    );
  }

  return (
    <section className="py-20 bg-black/90 backdrop-blur-xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.35em] text-sm text-amber-400 mb-4">
            Collections
          </p>

          <h2 className="text-4xl text-white font-serif">
            Shop by Category
          </h2>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.slice(0, 3).map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden"
            >
              <Link
                to={`/shop?category=${category._id}`} // ✅ connects to Shop page
                className="block relative aspect-[3/4]"
              >
                <img
                  src={categoryImages[category.name] || men} // fallback image
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* text */}
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-white text-xl font-semibold">
                    {category.name}
                  </h3>

                  <span className="text-amber-400 text-sm tracking-widest">
                    SHOP NOW →
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