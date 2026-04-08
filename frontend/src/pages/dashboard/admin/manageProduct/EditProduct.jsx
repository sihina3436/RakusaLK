import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadImagesMutation,
} from "../../../../redux/products/productApi";

import {
  useGetAllCategoriesQuery,
  useGetSubCategoryByCategoryQuery,
} from "../../../../redux/category/categoryAPI";

import { useGetAllColorsQuery } from "../../../../redux/color/colorApi";
import { useGetAllSizesQuery } from "../../../../redux/size/sizeAPI";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useGetProductByIdQuery(id);

  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: colors = [] } = useGetAllColorsQuery();
  const { data: sizes = [] } = useGetAllSizesQuery();

  const [updateProduct, { isLoading: updating }] =
    useUpdateProductMutation();

  const [uploadImages] = useUploadImagesMutation();

  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: subcategories = [] } =
    useGetSubCategoryByCategoryQuery(selectedCategory, {
      skip: !selectedCategory,
    });

  const [selectedSubCategory, setSelectedSubCategory] =
    useState("");

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

  /* =========================
     Prefill Form
  ========================= */
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        countInStock: product.countInStock,
      });

      setSelectedCategory(product.category?._id);
      setSelectedSubCategory(product.subCategory?._id);

      setSelectedColors(product.colors || []);
      setSelectedSizes(product.sizesAvailable || []);

      setPreviewUrls(product.images || []);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleColor = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const toggleSize = (id) => {
    setSelectedSizes((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) return alert("Max 5 images");

    setImages(files);
    setPreviewUrls(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrls = previewUrls;

    if (images.length > 0) {
      const fd = new FormData();
      images.forEach((file) => fd.append("images", file));

      const uploadRes = await uploadImages(fd).unwrap();
      imageUrls = uploadRes.urls;
    }

    await updateProduct({
      id,
      updatedData: {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        category: selectedCategory,
        subCategory: selectedSubCategory,
        colors: selectedColors,
        sizesAvailable: selectedSizes,
        images: imageUrls,
      },
    });

    alert("Product Updated Successfully!");
    navigate("/dashboard/manage-products");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto bg-zinc-900 border border-yellow-500/30 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-3xl font-bold text-yellow-400 mb-8">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-500/40"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-500/40"
          />

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="p-4 rounded-xl bg-black border border-yellow-500/40"
            />

            <input
              name="countInStock"
              type="number"
              value={formData.countInStock}
              onChange={handleChange}
              className="p-4 rounded-xl bg-black border border-yellow-500/40"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="p-4 rounded-xl bg-black border border-yellow-500/40"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedSubCategory}
              onChange={(e) =>
                setSelectedSubCategory(e.target.value)
              }
              className="p-4 rounded-xl bg-black border border-yellow-500/40"
            >
              <option value="">Select SubCategory</option>
              {subcategories.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-yellow-400 mb-3">
              Select Colors
            </h3>

            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => (
                <div
                  key={color._id}
                  onClick={() => toggleColor(color._id)}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                    selectedColors.includes(color._id)
                      ? "border-yellow-400 scale-110"
                      : "border-gray-600"
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-yellow-400 mb-3">
              Select Sizes
            </h3>

            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size._id}
                  type="button"
                  onClick={() => toggleSize(size._id)}
                  className={`px-4 py-1 rounded-full font-semibold ${
                    selectedSizes.includes(size._id)
                      ? "bg-yellow-500 text-black"
                      : "bg-black border border-yellow-500/40 text-yellow-400"
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="text-yellow-400"
          />

          <div className="grid grid-cols-4 gap-4">
            {previewUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="h-24 w-full object-cover rounded-xl"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full py-4 rounded-xl bg-gradient-to-r 
              from-yellow-500 to-yellow-300 text-black font-bold"
          >
            {updating ? "Updating..." : "Update Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;
