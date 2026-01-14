import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import ProductCard from "../pages/shop/ProductCard.jsx";
import { products } from "../components/products.js";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);


  /* Debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      query ? setSearchParams({ q: query }) : setSearchParams({});
    }, 300);
    return () => clearTimeout(timer);
  }, [query, setSearchParams]);

  /* Results */
  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const term = debouncedQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
    );
  }, [debouncedQuery]);


  return (
    <>
      {/* HERO */}
      <section className="relative bg-black pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-yellow-500/10 via-transparent to-black" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <h1 className="font-serif text-4xl md:text-5xl tracking-[0.25em] uppercase text-yellow-400 mb-6">
            Search
          </h1>
          <p className="text-gray-400 text-sm tracking-wide">
            Discover refined pieces crafted for excellence
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto mt-10"
        >
          <SearchIcon
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search luxury fashion..."
            autoFocus
            className="w-full h-14 pl-12 pr-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
            >
              <X size={20} />
            </button>
          )}
        </motion.div>
      </section>

      {/* RESULTS */}
      <section className="bg-black px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {debouncedQuery && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 mb-10 text-sm"
            >
              {searchResults.length} result
              {searchResults.length !== 1 && "s"} found for{" "}
              <span className="text-yellow-400">"{debouncedQuery}"</span>
            </motion.p>
          )}

          {debouncedQuery && searchResults.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {searchResults.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          {/* No Results */}
          {debouncedQuery && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-xl text-white mb-4">No results found</p>
              <p className="text-gray-500 mb-8">
                Try a different keyword or explore our collections
              </p>
              <Link
                to="/shop"
                className="inline-block px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
              >
                Browse Collection
              </Link>
            </motion.div>
          )}

          {/* Empty State */}
          {!debouncedQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <SearchIcon className="w-16 h-16 mx-auto mb-6 text-yellow-400/50" />
              <h2 className="font-serif text-2xl text-white mb-4">
                Begin Your Search
              </h2>
              <p className="text-gray-500">
                Enter a keyword to explore premium fashion
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
