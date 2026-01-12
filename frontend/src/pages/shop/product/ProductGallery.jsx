import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductGallery = ({ images = [], productName = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-3/4 bg-black flex items-center justify-center">
        <p className="text-yellow-500 text-xs">No image available</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3 max-w-md mx-auto lg:mx-0">
      {/* Main Image */}
      <div className="relative aspect-4/5 overflow-hidden bg-black rounded-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={productName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2
                         w-8 h-8 bg-black/70 text-yellow-500
                         flex items-center justify-center rounded-full
                         hover:bg-yellow-500 hover:text-black transition"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         w-8 h-8 bg-black/70 text-yellow-500
                         flex items-center justify-center rounded-full
                         hover:bg-yellow-500 hover:text-black transition"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pt-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-20 overflow-hidden border rounded-md
                ${
                  index === currentIndex
                    ? "border-yellow-500"
                    : "border-yellow-500/30 opacity-60 hover:opacity-100"
                }`}
            >
              <img
                src={img}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
