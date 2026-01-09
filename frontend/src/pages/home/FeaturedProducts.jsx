import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { products } from "../../components/products.js";

const FeaturedProducts = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-18 bg-linear-to-br from-black via-neutral-900 to-black relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4 tracking-wide">
            Featured Collection
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Handpicked pieces defined by craftsmanship, elegance, and premium quality.
          </p>
          <Link
            to="/shop"
            className="
              inline-block mt-6
              text-xs uppercase tracking-[0.3em]
              text-yellow-500
              border-b border-yellow-500/40
              hover:border-yellow-500
              hover:text-yellow-400
              transition
            "
          >
            View All
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className="
                group
                bg-white/5
                backdrop-blur-xl
                border border-yellow-500/15
                rounded-2xl
                overflow-hidden
                shadow-[0_25px_50px_rgba(0,0,0,0.5)]
                transition-all
              "
            >
              <Link to={`/product/${product.id}`} className="block">

                <div className="relative aspect-4/5 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500" />

                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-linear-to-r from-yellow-400 to-yellow-600 text-black text-[10px] px-3 py-1 uppercase rounded-full tracking-wide">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] px-3 py-1 uppercase rounded-full tracking-wide">
                      Sale
                    </span>
                  )}

                  <button
                    className="
                      absolute top-4 right-4
                      w-9 h-9
                      bg-black/60 backdrop-blur
                      border border-yellow-500/30
                      flex items-center justify-center
                      rounded-full
                      opacity-0 group-hover:opacity-100
                      transition
                    "
                    aria-label="Add to wishlist"
                  >
                    <Heart size={14} className="text-yellow-500" />
                  </button>

                  <div className="absolute inset-x-4 bottom-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
                    <button className="
                      w-full
                      bg-linear-to-r from-yellow-400 to-yellow-600
                      text-black
                      py-2
                      text-xs
                      uppercase
                      tracking-wider
                      rounded-full
                      hover:brightness-110
                    ">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 text-center">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                    {product.category}
                  </p>

                  <h3 className="font-serif text-base text-white mb-3">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center gap-3">
                    <span className="text-yellow-500 font-medium text-sm">
                      Rs. {product.price}
                    </span>

                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-xs">
                        Rs. {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;