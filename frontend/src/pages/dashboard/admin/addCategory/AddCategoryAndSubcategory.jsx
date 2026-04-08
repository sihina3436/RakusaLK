import React, { useState } from "react";
import {
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSubCategoryByCategoryQuery,
} from "../../../../redux/category/categoryAPI";

const AddCategoryAndSubcategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categories = [], isLoading } =
    useGetAllCategoriesQuery();

  const { data: subcategories = [], isLoading: isSubLoading } =
    useGetSubCategoryByCategoryQuery(selectedCategory, {
      skip: !selectedCategory,
    });

  const [createCategory] = useCreateCategoryMutation();
  const [createSubcategory] = useCreateSubCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) return;
    await createCategory({ name: categoryName });
    setCategoryName("");
  };

const handleCreateSubcategory = async (e) => {
  e.preventDefault();

  if (!subcategoryName || !selectedCategory) return;

  try {
    await createSubcategory({
      name: subcategoryName,
      category: selectedCategory,
    }).unwrap();

    setSubcategoryName("");
  } catch (err) {
    console.error("Subcategory create error:", err);
  }
};


  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-amber-400">
          Category Management
        </h1>

        {/* CATEGORY CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-amber-300 mb-4">
            Add Category
          </h2>

          <form
            onSubmit={handleCreateCategory}
            className="flex gap-3"
          >
            <input
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-5 py-2 rounded-lg transition"
            >
              Add
            </button>
          </form>

          <div className="mt-4">
            {isLoading ? (
              <p className="text-zinc-400">Loading...</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((c) => (
                  <li
                    key={c._id}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* SUBCATEGORY CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-amber-300 mb-4">
            Add Subcategory
          </h2>

          <form
            onSubmit={handleCreateSubcategory}
            className="grid md:grid-cols-3 gap-3"
          >
            <select
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Subcategory name"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
            />

            <button
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg px-5 py-2 transition"
            >
              Add
            </button>
          </form>

          <div className="mt-4">
            {isSubLoading ? (
              <p className="text-zinc-400">Loading...</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {subcategories.map((s) => (
                  <li
                    key={s._id}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddCategoryAndSubcategory;
