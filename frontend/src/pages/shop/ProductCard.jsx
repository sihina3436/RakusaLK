import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({ product, index = 0 }) => {
  if (!product) return null;

  const {
    _id,
    name,
    price,
    images = [],
    category,
    isNew,
    isSale,
  } = product;

  const image = images?.[0] || "";
  const categoryName =
    typeof category === "object" ? category.name : category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="group"
    >
      <Link
        to={`/product/${_id}`}
        className="block rounded-xl overflow-hidden bg-black/70 backdrop-blur-lg
                   border border-yellow-500/20 hover:border-yellow-500/50
                   transition-all duration-400
                   shadow-lg hover:shadow-yellow-500/20"
      >
        {/* IMAGE SECTION */}
        <div className="relative overflow-hidden" style={{ paddingTop: "120%" }}>
          <img
            src={image}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-cover
                       transition-transform duration-500
                       group-hover:scale-105 rounded-t-xl"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          {isNew && (
            <span className="absolute top-3 left-3 bg-yellow-500 text-black
                             text-[10px] px-3 py-0.5 rounded-full
                             tracking-wider font-semibold">
              NEW
            </span>
          )}

          {isSale && (
            <span className="absolute top-3 left-3 bg-red-600 text-white
                             text-[10px] px-3 py-0.5 rounded-full
                             tracking-wider font-semibold">
              SALE
            </span>
          )}

          <button
            onClick={(e) => e.preventDefault()}
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 w-8 h-8 rounded-full
                       bg-black/50 backdrop-blur
                       flex items-center justify-center
                       opacity-0 group-hover:opacity-100
                       transition-all duration-300
                       hover:scale-110 hover:bg-yellow-500"
          >
            <Heart className="w-4 h-4 text-yellow-500 group-hover:text-black" />
          </button>

          <div
            className="absolute bottom-0 left-0 right-0 p-3
                       translate-y-full group-hover:translate-y-0
                       transition-transform duration-400"
          >
            <button
              onClick={(e) => e.preventDefault()}
              className="w-full py-2 rounded-lg
                         bg-yellow-500 text-black
                         text-xs font-semibold tracking-widest
                         hover:bg-yellow-400 transition-colors"
            >
              QUICK VIEW
            </button>
          </div>
        </div>

        <div className="p-3 text-center">
          <p className="text-[9px] uppercase tracking-[0.15em]
                        text-yellow-500/70 mb-1">
            {categoryName}
          </p>

          <h3 className="text-sm font-semibold text-white mb-2 tracking-wide truncate">
            {name}
          </h3>

          <div className="flex items-center justify-center gap-2">
            <span className="text-yellow-500 text-sm font-semibold">
              Rs. {price}
            </span>

          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
