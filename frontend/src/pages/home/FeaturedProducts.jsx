import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { products } from "../../components/products.js";

const FeaturedProducts = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="pt-12 pb-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-3 text-gray-800">
            Featured Collection
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Handpicked pieces chosen for their exceptional quality and timeless appeal.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block text-xs sm:text-sm uppercase tracking-wider border-b-2 border-transparent hover:border-gray-800 transition"
          >
            View All
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              <Link to={`/product/${product.id}`} className="block flex-1">
                {/* Image */}
                <div className="relative aspect-3/4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-yellow-500 text-white text-[10px] px-2 py-0.5 uppercase rounded">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-0.5 uppercase rounded">
                      Sale
                    </span>
                  )}

                  <button
                    className="absolute top-3 right-3 w-8 h-8 bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={14} className="text-red-500" />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-gray-800 text-white py-1 text-xs uppercase rounded hover:bg-gray-700">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase mb-1">{product.category}</p>
                  <h3 className="font-serif text-sm sm:text-base mb-2 text-gray-800">{product.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-medium text-sm text-gray-900">Rs.{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">Rs.{product.originalPrice}</span>
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