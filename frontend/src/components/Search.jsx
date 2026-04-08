import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";

import ProductCard from "../pages/shop/ProductCard.jsx";
import { useGetAllProductsQuery } from "../redux/products/productApi";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // ✅ GET PRODUCTS FROM BACKEND
  const { data: products = [], isLoading } = useGetAllProductsQuery();

  /* Debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      query ? setSearchParams({ q: query }) : setSearchParams({});
    }, 300);
    return () => clearTimeout(timer);
  }, [query, setSearchParams]);


  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const term = debouncedQuery.toLowerCase();

    return products.filter((p) => {
      const categoryName =
        typeof p.category === "object"
          ? p.category?.name
          : p.category;

      return (
        p.name?.toLowerCase().includes(term) ||
        categoryName?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    });
  }, [debouncedQuery, products]);

  return (
    <>
      {/* HERO */}
      <section className="bg-black pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl text-yellow-400 mb-6">
            Search
          </h1>

          {/* SEARCH BAR */}
          <div className="relative mt-10">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-14 pl-12 pr-12 rounded-xl bg-black border border-yellow-500/30 text-white"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-black px-6 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* LOADING */}
          {isLoading && (
            <p className="text-center text-yellow-400">
              Loading products...
            </p>
          )}

          {/* RESULTS COUNT */}
          {debouncedQuery && (
            <p className="text-gray-400 mb-10">
              {searchResults.length} results for "{debouncedQuery}"
            </p>
          )}

          {/* RESULTS GRID */}
          {searchResults.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {searchResults.map((product, i) => (
                <motion.div
                  key={product._id} // ✅ FIXED
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          {/* NO RESULTS */}
          {debouncedQuery && searchResults.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white mb-4">No results found</p>

              <Link
                to="/shop"
                className="px-6 py-3 bg-yellow-400 text-black"
              >
                Go to Shop
              </Link>
            </div>
          )}

          {/* EMPTY */}
          {!debouncedQuery && (
            <div className="text-center py-24 text-gray-400">
              Start typing to search products...
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Search;