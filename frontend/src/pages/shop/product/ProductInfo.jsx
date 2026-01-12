import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ProductInfo = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors?.length && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    if (quantity > product.countInStock) {
      toast.error("Not enough stock available");
      return;
    }
    toast.success("Added to cart");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8 text-white"
    >
      {/* CATEGORY */}
      {product.category && (
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {product.category}
        </p>
      )}

      {/* PRODUCT NAME */}
      <h1 className="font-serif text-xl md:text-2xl tracking-wide text-white">
        {product.name}
      </h1>

      {/* PRICE */}
      <div className="flex items-center gap-4">
        <span className="text-xl font-semibold text-white">
          Rs.{product.price}
        </span>
        {product.countInStock === 0 && (
          <span className="text-sm text-red-500 uppercase">Out of stock</span>
        )}
      </div>

      {/* DESCRIPTION */}
      {product.description && (
        <p className="text-white/50 leading-relaxed max-w-xl">
          {product.description}
        </p>
      )}

      {/* COLORS */}
      {product.colors?.length > 0 && (
        <div>
          <h3 className="text-sm uppercase tracking-widest mb-3 text-white">
            Color:{" "}
            <span className="font-semibold text-white/40">
              {selectedColor?.name || "Select"}
            </span>
          </h3>

          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color._id}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all
                  ${
                    selectedColor?._id === color._id
                      ? "border-yellow-500 scale-110"
                      : "border-yellow-500/40 hover:border-yellow-500"
                  }`}
                style={{ backgroundColor: color.hex || "#555" }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* SIZES */}
      {product.sizes?.length > 0 && (
        <div>
          <h3 className="text-sm uppercase tracking-widest mb-3 text-white">
            Size:{" "}
            <span className="font-semibold text-white/40">
              {selectedSize || "Select"}
            </span>
          </h3>

          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all
                  ${
                    selectedSize === size
                      ? "bg-yellow-500 text-black border-yellow-500"
                      : "border-yellow-500/40 hover:border-yellow-500 text-yellow-400"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUANTITY */}
      <div>
        <h3 className="text-sm uppercase tracking-widest mb-3 text-white">
          Quantity
        </h3>

        <div className="inline-flex items-center border border-yellow-500/40 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-yellow-500/10 transition"
          >
            <Minus size={16} />
          </button>

          <span className="w-10 text-center text-yellow-500 font-semibold">
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity((q) =>
                Math.min(product.countInStock, q + 1)
              )
            }
            className="w-10 h-10 flex items-center justify-center hover:bg-yellow-500/10 transition"
          >
            <Plus size={16} />
          </button>
        </div>

        <p className="text-xs text-yellow-400 mt-2">
          {product.countInStock} items available
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 pt-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className=" ml-28 py-4 px-24 rounded-xl bg-yellow-500 text-black
                     font-semibold tracking-widest uppercase
                     hover:bg-yellow-400 transition-all
                     flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </motion.button>
      </div>

      {/* EXTRA INFO */}
      <div className="border-t border-yellow-500/20 pt-6 space-y-2">
        <p className="text-sm text-white">✓ Free shipping on orders over RS.50000</p>
        <p className="text-sm text-white">✓ 30-day return policy</p>
      </div>
    </motion.div>
  );
};

export default ProductInfo;
