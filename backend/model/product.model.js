const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },

    images: { type: [String], default: [] },

    sizes: [String],
    colors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],

    countInStock: { type: Number, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // seller
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
