import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Grid, LayoutGrid } from "lucide-react";

import ProductCard from "./ProductCard.jsx";

import { useGetAllProductsQuery } from "../../redux/products/productApi";
import {
  useGetAllCategoriesQuery,
  useGetSubCategoryByCategoryQuery,
} from "../../redux/category/categoryAPI";

const Shop = () => {
  /* ================================
     RTK DATA
  ================================= */
  const { data: products = [], isLoading } = useGetAllProductsQuery();
  const { data: categories = [] } = useGetAllCategoriesQuery();

  /* ================================
     URL SEARCH PARAMS
  ================================= */
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory =
    searchParams.get("category") || "all";
  const selectedSubCategory =
    searchParams.get("subcategory") || "all";
  const sortBy = searchParams.get("sort") || "featured";

  /* ================================
     SUBCATEGORY QUERY (dynamic)
  ================================= */
  const { data: subCategories = [] } =
    useGetSubCategoryByCategoryQuery(selectedCategory, {
      skip: selectedCategory === "all",
    });

  /* ================================
     UI STATES
  ================================= */
  const [gridCols, setGridCols] = useState(4);

  /* ================================
     FILTER + SORT LOGIC
  ================================= */
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // CATEGORY FILTER
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category?._id === selectedCategory
      );
    }

    // SUBCATEGORY FILTER
    if (selectedSubCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.subCategory?._id === selectedSubCategory
      );
    }

    // SORTING
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [
    products,
    selectedCategory,
    selectedSubCategory,
    sortBy,
  ]);

  /* ================================
     UPDATE URL PARAM
  ================================= */
  const updateParam = (key, value) => {
    if (!value || value === "all") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  /* ================================
     LOADING
  ================================= */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        Loading Products...
      </div>
    );
  }

  /* ================================
     UI
  ================================= */
  return (
    <>
      {/* HERO */}
      <section className="bg-black py-24 text-center">
        <h1 className="text-5xl text-white tracking-widest">
          SHOP
        </h1>
      </section>

      <section className="bg-black min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* FILTER BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10 border-b border-yellow-500/20 pb-6">

            {/* CATEGORY */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => updateParam("category", "all")}
                className={`px-3 py-1 rounded ${
                  selectedCategory === "all"
                    ? "bg-yellow-500 text-black"
                    : "text-gray-400"
                }`}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() =>
                    updateParam("category", cat._id)
                  }
                  className={`px-3 py-1 rounded ${
                    selectedCategory === cat._id
                      ? "bg-yellow-500 text-black"
                      : "text-gray-400"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* SUB CATEGORY */}
            {selectedCategory !== "all" && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    updateParam("subcategory", "all")
                  }
                  className={`px-3 py-1 text-sm rounded ${
                    selectedSubCategory === "all"
                      ? "bg-yellow-500 text-black"
                      : "text-zinc-400"
                  }`}
                >
                  All Sub
                </button>

                {subCategories.map((sub) => (
                  <button
                    key={sub._id}
                    onClick={() =>
                      updateParam("subcategory", sub._id)
                    }
                    className={`px-3 py-1 text-sm rounded ${
                      selectedSubCategory === sub._id
                        ? "bg-yellow-500 text-black"
                        : "text-zinc-400"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}

            {/* SORT */}
            <select
              value={sortBy}
              onChange={(e) =>
                updateParam("sort", e.target.value)
              }
              className="bg-zinc-900 border border-yellow-500/30 px-3 py-2 rounded text-yellow-400 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price Low → High</option>
              <option value="price-desc">Price High → Low</option>
            </select>

            {/* GRID TOGGLE */}
            <div className="flex gap-3">
              <button onClick={() => setGridCols(5)}>
                <Grid className="text-yellow-500" />
              </button>
              <button onClick={() => setGridCols(4)}>
                <LayoutGrid className="text-yellow-500" />
              </button>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <motion.div
            layout
            className={`grid gap-6 ${
              gridCols === 5
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {filteredProducts.map((product, i) => (
              <ProductCard
                key={product._id}
                product={product}
                index={i}
              />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-400 py-20">
              No products found
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;
