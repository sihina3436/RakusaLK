const SubCategory = require("../model/subCategory.model");

const createSubCategory = async (req, res) => {
  try {
    if (req.user.role !== "seller" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, category } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const subCategory = await SubCategory.create({
      name,
      category, 
      createdBy: req.user._id,
    });

    res.status(201).json(subCategory);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);   
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
}

module.exports = { createSubCategory, getAllSubCategories };
