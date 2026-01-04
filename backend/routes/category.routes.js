const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const {
  createCategory,getAllCategories,getSubCategoryByCategory
} = require("../controller/category.controller");
const {
  createSubCategory,getAllSubCategories
} = require("../controller/subCategoty.controller");

router.post("/", authMiddleware, roleMiddleware("seller"), createCategory); //☑️
router.get("/", getAllCategories); //☑️

router.post("/sub", authMiddleware, roleMiddleware("seller"), createSubCategory); //☑️
router.get("/sub", getAllSubCategories); //☑️
router.get("/:categoryId/sub", getSubCategoryByCategory); //☑️

module.exports = router;
