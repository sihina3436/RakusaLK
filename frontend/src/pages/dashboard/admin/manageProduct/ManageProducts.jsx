import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../../../redux/products/productApi";

import { useGetAllColorsQuery } from "../../../../redux/color/colorApi";
import { useGetAllSizesQuery } from "../../../../redux/size/sizeAPI";

const ManageProducts = () => {
  const { data: products = [], isLoading } = useGetAllProductsQuery();
  const { data: colors = [] } = useGetAllColorsQuery();
  const { data: sizes = [] } = useGetAllSizesQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [search, setSearch] = useState("");

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

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400 text-xl">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold text-amber-400 tracking-wide">
            Product Management
          </h1>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 
              rounded-lg px-4 py-2 text-sm text-zinc-200 
              focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* TABLE CARD */}
        <div className="rounded-xl bg-zinc-900/70 backdrop-blur border border-zinc-800 shadow-lg overflow-x-auto">

          <table className="min-w-full text-sm text-left text-zinc-300">

            {/* TABLE HEAD */}
            <thead className="bg-zinc-900 border-b border-zinc-800 text-amber-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Colors</th>
                <th className="px-6 py-4">Sizes</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
                >
                  {/* PRODUCT */}
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={product.images?.[0] || "https://via.placeholder.com/80"}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover border border-zinc-700"
                    />
                    <div>
                      <p className="font-semibold text-amber-400">
                        {product.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {product.subCategory?.name || "No SubCategory"}
                      </p>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-4">
                    {product.category?.name || "N/A"}
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 font-semibold text-amber-400">
                    Rs. {product.price}
                  </td>

                  {/* STOCK */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        product.countInStock > 0
                          ? "bg-emerald-600/80"
                          : "bg-red-600/80"
                      }`}
                    >
                      {product.countInStock}
                    </span>
                  </td>

                  {/* COLORS */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {product.colors?.map((id) => {
                        const color = colorMap[id];
                        if (!color) return null;

                        return (
                          <div
                            key={color._id}
                            className="w-6 h-6 rounded-full border border-zinc-600 hover:scale-110 transition"
                            style={{ backgroundColor: color.hexCode }}
                            title={color.name}
                          />
                        );
                      })}
                    </div>
                  </td>

                  {/* SIZES */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {product.sizesAvailable?.map((id) => {
                        const size = sizeMap[id];
                        if (!size) return null;

                        return (
                          <span
                            key={size._id}
                            className="px-3 py-1 text-xs font-semibold 
                              rounded-full bg-amber-400 text-black"
                          >
                            {size.name}
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/dashboard/edit-product/${product._id}`}
                        className="px-4 py-2 rounded-lg text-sm font-semibold
                          bg-amber-400 text-black hover:bg-amber-500 transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold
                          border border-red-500 text-red-500
                          hover:bg-red-500 hover:text-black transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-zinc-500">
            No products found
          </p>
        )}

      </div>
    </div>
  );
};

export default ManageProducts;
