const Category = require("../model/category.model");
const SubCategory = require("../model/subCategory.model");

const createCategory = async (req, res) => {
  try {
    if (req.user.role !== "seller" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
      console.log("Access denied");
    }

    const category = await Category.create({
      name: req.body.name,
      createdBy: req.user._id,
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.error(err);
  }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
}

const getSubCategoryByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const subCategories = await SubCategory.find({ category: categoryId });
        res.status(200).json(subCategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

module.exports = { createCategory, getAllCategories, getSubCategoryByCategory };