import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useGetAllProductsQuery } from "../../redux/products/productApi";

const FeaturedProducts = () => {

  const { data: products = [], isLoading } = useGetAllProductsQuery();

 
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <div className="text-center text-yellow-500 py-20">
        Loading products...
      </div>
    );
  }

  return (
    <section className="py-18 bg-linear-to-br from-black via-neutral-900 to-black relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl text-white mb-4">
            Featured Collection
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto">
            Handpicked premium products.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block text-yellow-500 border-b border-yellow-500/40 hover:text-yellow-400"
          >
            View All
          </Link>
        </motion.div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuredProducts.map((product, index) => {

            const image = product.images?.[0] || "";
            const categoryName =
              typeof product.category === "object"
                ? product.category?.name
                : product.category;

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 border border-yellow-500/15 rounded-2xl overflow-hidden"
              >
                {/* ✅ FIXED ID */}
                <Link to={`/product/${product._id}`}>

                  {/* IMAGE */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />

                    {/* BADGES */}
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                        NEW
                      </span>
                    )}

                    {product.isSale && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        SALE
                      </span>
                    )}

                    {/* WISHLIST */}
                    <button className="absolute top-4 right-4 w-9 h-9 bg-black/60 rounded-full flex items-center justify-center">
                      <Heart size={14} className="text-yellow-500" />
                    </button>
                  </div>

                  {/* INFO */}
                  <div className="p-6 text-center">
                    <p className="text-xs text-gray-400 uppercase">
                      {categoryName}
                    </p>

                    <h3 className="text-white text-base mt-2">
                      {product.name}
                    </h3>

                    <p className="text-yellow-500 font-bold mt-2">
                      Rs. {product.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;