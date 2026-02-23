const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductbyCategory,
  getProductbySubCategory,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");


router.post(
  "/",
  authMiddleware,
  roleMiddleware("seller"),
  upload.array("images", 5),
  createProduct
);
router.get("/", getAllProducts);//☑️
router.get("/:id", getProductById);//☑️
router.get("/category/:categoryId", getProductbyCategory);//☑️
router.get("/subcategory/:subCategoryId", getProductbySubCategory);//☑️
router.put("/:id", authMiddleware, roleMiddleware("seller"), updateProduct);//☑️
router.delete("/:id", authMiddleware, deleteProduct); //☑️

module.exports = router;