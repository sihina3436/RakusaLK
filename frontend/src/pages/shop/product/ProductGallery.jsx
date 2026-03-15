import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductGallery = ({ images = [], productName = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-[4/5] bg-black/70 rounded-3xl flex items-center justify-center shadow-lg">
        <p className="text-yellow-500 text-sm">No images available</p>
      </div>
    );
  }

  const goPrev = () =>
    setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  const goNext = () =>
    setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));

  return (
    <div className="space-y-5 max-w-lg mx-auto lg:mx-0">
      {/* Main Image */}
      <div className="relative rounded-3xl overflow-hidden bg-black/70 border border-yellow-500/30 shadow-2xl hover:shadow-yellow-500/40 transition-all">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={productName}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-auto h-auto object-cover rounded-3xl"
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2
                         bg-black/50 p-3 rounded-full text-yellow-500
                         hover:bg-yellow-500 hover:text-black transition-all shadow-md"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2
                         bg-black/50 p-3 rounded-full text-yellow-500
                         hover:bg-yellow-500 hover:text-black transition-all shadow-md"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Gradient overlay for premium effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-20 h-28 rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex-shrink-0
                ${
                  i === currentIndex
                    ? "border-yellow-500 shadow-lg scale-105"
                    : "border-zinc-700/30 hover:border-yellow-500 hover:scale-105 hover:shadow-yellow-500/30"
                }`}
            >
              <motion.img
                src={img}
                alt={`${productName} ${i + 1}`}
                className="w-full h-full object-cover rounded-2xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
