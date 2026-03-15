import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();

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

  const image = images[0] || "";
  const categoryName =
    typeof category === "object" ? category?.name : category;

  const handleNavigate = () => {
    if (_id) navigate(`/product/${_id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleNavigate}
      className="group cursor-pointer"
    >
      <div className="rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800 hover:border-yellow-500/60 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">

        {/* IMAGE */}
        <div className="relative overflow-hidden pt-[125%]">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* BADGES */}
          {isNew && (
            <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold bg-yellow-500 text-black rounded-full">
              NEW
            </span>
          )}

          {isSale && (
            <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold bg-red-600 text-white rounded-full">
              SALE
            </span>
          )}

          {/* WISHLIST */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <Heart size={16} className="text-yellow-500" />
          </button>

          {/* QUICK VIEW */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition">
            <button className="w-full py-2 rounded-lg bg-yellow-500 text-black text-xs font-bold hover:bg-yellow-400">
              QUICK VIEW
            </button>
          </div>
        </div>

        {/* INFO */}
        <div className="p-4 text-center">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400">
            {categoryName}
          </p>

          <h3 className="text-sm font-semibold text-white mt-1 truncate">
            {name}
          </h3>

          <p className="text-yellow-400 font-bold mt-2">
            Rs. {price}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
