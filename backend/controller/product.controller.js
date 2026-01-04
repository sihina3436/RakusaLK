const Product = require("../model/product.model");
const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");


const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can add products" });
    }

    const {
      name,
      description,
      price,
      images,
      sizes,
      colors,
      countInStock,
      category,
      subCategory,
    } = req.body;

    // Validate category
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Validate subcategory belongs to category
    const subCategoryExists = await SubCategory.findOne({
      _id: subCategory,
      category: category,
    });

    if (!subCategoryExists) {
      return res
        .status(400)
        .json({ message: "SubCategory does not belong to this category" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      images,
      sizes,
      colors,
      countInStock,
      category,
      subCategory,
      user: req.user._id,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * GET ALL PRODUCTS
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("user", "username email");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET PRODUCT BY ID
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("user", "username email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};

/**
 * GET PRODUCTS BY CATEGORY
 */
const getProductbyCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const products = await Product.find({ category: categoryId })
      .populate("category", "name")
      .populate("subCategory", "name");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET PRODUCTS BY SUBCATEGORY
 */
const getProductbySubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.subCategoryId;

    const products = await Product.find({ subCategory: subCategoryId })
      .populate("category", "name")
      .populate("subCategory", "name");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPDATE PRODUCT (Seller who owns the product)
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Only owner seller can update
    if (
      req.user.role !== "seller" ||
      product.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE PRODUCT (Seller who owns the product)
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      req.user.role !== "seller" ||
      product.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductbyCategory,
  getProductbySubCategory,
  updateProduct,
  deleteProduct,
};
