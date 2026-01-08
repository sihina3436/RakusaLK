import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, LayoutGrid, SlidersHorizontal, X } from "lucide-react";

import ProductCard from "./ProductCard.jsx";
import { products, categories } from "../../components/products.js";

const Shop = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [gridCols, setGridCols] = useState(4);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const selectedCategory = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "featured";

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const updateParam = (key, value) => {
    if (!value || value === "all") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <section className="relative bg-black py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/80 to-black" />
        <div className="relative max-w-5xl mx-auto text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl tracking-[0.3em] text-white mb-6"
          >
            SHOP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            Discover refined luxury pieces designed for timeless elegance.
          </motion.p>
        </div>
      </section>

      <section className="pb-16 bg-linear-to-b from-black via-neutral-800 to-black">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-yellow-500/20 pb-6">

            <div className="hidden lg:flex gap-8">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => updateParam("category", cat.slug)}
                  className={`uppercase text-sm tracking-widest transition-colors ${
                    selectedCategory === cat.slug
                      ? "text-yellow-500"
                      : "text-gray-400 hover:text-yellow-500"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 text-gray-300 uppercase tracking-widest text-sm"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <div className="flex items-center gap-4 relative">
              <span className="text-sm text-gray-400">
                {filteredProducts.length} Products
              </span>

              <div className="relative">
                <button
                  onClick={() => setShowSort(!showSort)}
                  className="border border-yellow-500/30 px-4 py-2 text-sm text-gray-300 uppercase tracking-widest hover:border-yellow-500 transition"
                >
                  Sort
                </button>

                <AnimatePresence>
                  {showSort && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-black border border-yellow-500/30 z-50"
                    >
                      {[
                        ["featured", "Featured"],
                        ["newest", "Newest"],
                        ["price-asc", "Price: Low to High"],
                        ["price-desc", "Price: High to Low"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => {
                            updateParam("sort", value);
                            setShowSort(false);
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-400 hover:text-yellow-500 hover:bg-yellow-500/5"
                        >
                          {label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* GRID TOGGLE */}
              <div className="hidden lg:flex gap-2">
                <button
                  onClick={() => setGridCols(5)}
                  className={`p-2 ${
                    gridCols === 5 ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 ${
                    gridCols === 4 ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <motion.div
            layout
            className={`grid gap-8 ${
              gridCols === 5
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product?.id || index} product={product} index={index} />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No products found.
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-50 p-6"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-serif text-2xl text-yellow-500">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    updateParam("category", cat.slug);
                    setShowFilters(false);
                  }}
                  className={`block w-full text-left uppercase tracking-widest text-sm py-2 ${
                    selectedCategory === cat.slug
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Shop;
