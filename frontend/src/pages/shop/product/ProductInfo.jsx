import { useState, useMemo } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cart/cartSlice";
import { useGetAllColorsQuery } from "../../../redux/color/colorApi";
import { useGetAllSizesQuery } from "../../../redux/size/sizeAPI";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { data: colors = [] } = useGetAllColorsQuery();
  const { data: sizes = [] } = useGetAllSizesQuery();

  const colorMap = useMemo(() => {
    const map = {};
    colors.forEach((c) => (map[c._id] = c));
    return map;
  }, [colors]);

  const sizeMap = useMemo(() => {
    const map = {};
    sizes.forEach((s) => (map[s._id] = s));
    return map;
  }, [sizes]);

  const handleAddToCart = () => {
    if (product.sizesAvailable?.length && !selectedSize) {
      return toast.error("Please select size");
    }

    if (product.colors?.length && !selectedColor) {
      return toast.error("Please select color");
    }

    if (product.countInStock === 0) {
      return toast.error("Out of stock");
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        size: selectedSize?._id || null,
        color: selectedColor?._id || null,
        quantity,
      })
    );

    toast.success("Added to cart 🛒");
  };

  const isOutOfStock = product.countInStock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      {/* CATEGORY */}
      <p className="text-xs uppercase tracking-widest text-zinc-500">
        {product.category?.name || product.category}
      </p>

      {/* NAME */}
      <h1 className="text-3xl font-bold text-white">
        {product.name}
      </h1>

      {/* PRICE */}
      <p className="text-2xl font-bold text-yellow-400">
        Rs. {product.price}
      </p>

      {/* DESCRIPTION */}
      <p className="text-zinc-400">
        {product.description}
      </p>

      {/* COLORS */}
      {product.colors?.length > 0 && (
        <div>
          <p className="text-sm mb-3 text-zinc-400">Color</p>
          <div className="flex gap-3">
            {product.colors.map((id) => {
              const c = colorMap[id];
              if (!c) return null;

              return (
                <button
                  key={c._id}
                  onClick={() => setSelectedColor(c)}
                  className={`w-10 h-10 rounded-full border-2 transition ${
                    selectedColor?._id === c._id
                      ? "border-yellow-500 scale-110"
                      : "border-zinc-700"
                  }`}
                  style={{ backgroundColor: c.hexCode }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* SIZES */}
      {product.sizesAvailable?.length > 0 && (
        <div>
          <p className="text-sm mb-3 text-zinc-400">Size</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizesAvailable.map((id) => {
              const s = sizeMap[id];
              if (!s) return null;

              return (
                <button
                  key={s._id}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    selectedSize?._id === s._id
                      ? "bg-yellow-500 text-black"
                      : "bg-zinc-900 border border-zinc-700 text-white"
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* QUANTITY */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="p-2 bg-zinc-900 rounded-lg"
        >
          <Minus />
        </button>

        <span className="text-yellow-400 font-bold text-lg">
          {quantity}
        </span>

        <button
          onClick={() =>
            setQuantity((q) =>
              Math.min(product.countInStock, q + 1)
            )
          }
          className="p-2 bg-zinc-900 rounded-lg"
          disabled={quantity >= product.countInStock}
        >
          <Plus />
        </button>
      </div>

      {/* STOCK INFO */}
      <p
        className={`text-sm ${
          isOutOfStock ? "text-red-500" : "text-green-500"
        }`}
      >
        {isOutOfStock
          ? "Out of Stock"
          : `${product.countInStock} items available`}
      </p>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition ${
          isOutOfStock
            ? "bg-zinc-700 cursor-not-allowed"
            : "bg-yellow-500 text-black hover:bg-yellow-400"
        }`}
      >
        <ShoppingBag size={18} />
        {isOutOfStock ? "Out of Stock" : "Add To Cart"}
      </button>
    </motion.div>
  );
};

export default ProductInfo;
