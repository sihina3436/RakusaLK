import React, { useState } from "react";
import {
  useCreateProductMutation,
  useUploadImagesMutation,
} from "../../../../redux/products/productApi";

import {
  useGetAllCategoriesQuery,
  useGetSubCategoryByCategoryQuery,
} from "../../../../redux/category/categoryAPI";

import { useGetAllColorsQuery } from "../../../../redux/color/colorApi";
import { useGetAllSizesQuery } from "../../../../redux/size/sizeAPI";

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
  });

  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: subcategories = [] } =
    useGetSubCategoryByCategoryQuery(selectedCategory, {
      skip: !selectedCategory,
    });

  const { data: colors = [] } = useGetAllColorsQuery();
  const { data: sizes = [] } = useGetAllSizesQuery();

  const [uploadImages] = useUploadImagesMutation();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleColor = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleSize = (id) => {
    setSelectedSizes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) return alert("Maximum 5 images allowed");

    setImages(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrls = [];

    if (images.length > 0) {
      const formDataImages = new FormData();
      images.forEach((file) =>
        formDataImages.append("images", file)
      );

      const uploadRes = await uploadImages(formDataImages).unwrap();
      imageUrls = uploadRes.urls;
    }

    await createProduct({
      ...formData,
      price: Number(formData.price),
      countInStock: Number(formData.countInStock),
      category: selectedCategory,
      subCategory: selectedSubCategory,
      colors: selectedColors,
      sizesAvailable: selectedSizes,
      images: imageUrls,
    });

    alert("Product Created Successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Add New Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-zinc-900/70 backdrop-blur border border-zinc-800 p-10 shadow-2xl space-y-10"
        >

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-6">

              <div>
                <label className="text-sm text-amber-400">Product Name</label>
                <input
                  name="name"
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700 
                  focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-amber-400">Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  rows="4"
                  className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700 
                  focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                />
                <input
                  name="countInStock"
                  type="number"
                  placeholder="Stock"
                  onChange={handleChange}
                  className="p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                />
              </div>

            </div>

            {/* CATEGORY */}
            <div className="space-y-6">

              <div>
                <label className="text-sm text-amber-400">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubCategory("");
                  }}
                  className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-amber-400">SubCategory</label>
                <select
                  value={selectedSubCategory}
                  onChange={(e) =>
                    setSelectedSubCategory(e.target.value)
                  }
                  disabled={!selectedCategory}
                  className="w-full mt-2 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                >
                  <option value="">Select SubCategory</option>
                  {subcategories.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* COLORS */}
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-4">
              Select Colors
            </h3>

            <div className="flex flex-wrap gap-4">
              {colors.map((color) => (
                <div
                  key={color._id}
                  onClick={() => toggleColor(color._id)}
                  className={`relative cursor-pointer transition 
                    ${selectedColors.includes(color._id)
                      ? "scale-110"
                      : "hover:scale-105"}`}
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 shadow-lg"
                    style={{
                      backgroundColor: color.hexCode,
                      borderColor: selectedColors.includes(color._id)
                        ? "#facc15"
                        : "#444",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-4">
              Select Sizes
            </h3>

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size._id}
                  type="button"
                  onClick={() => toggleSize(size._id)}
                  className={`px-5 py-2 rounded-full font-semibold transition ${
                    selectedSizes.includes(size._id)
                      ? "bg-amber-400 text-black"
                      : "bg-zinc-800 border border-zinc-700 text-amber-400"
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-4">
              Product Images
            </h3>

            <label className="flex flex-col items-center justify-center 
              w-full h-40 border-2 border-dashed border-zinc-700 
              rounded-xl cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition">

              <span className="text-amber-400 text-lg">
                Click to Upload (Max 5)
              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <div className="grid grid-cols-4 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt=""
                    className="h-24 w-full object-cover rounded-lg border border-zinc-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-amber-400 text-black font-bold 
              hover:bg-amber-500 transition shadow-lg"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddProduct;
