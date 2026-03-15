const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const {
  register,
  signin,
  signout,
  deleteUser,
  getAllUsers,
  updateUserProfile,
<<<<<<< HEAD
  getUserById,
  verifyToken
=======
  forgotPassword,
  resetPassword,
>>>>>>> 3eace8c59cd90c257ff03885d4c0663edd68aa56
} = require("../controller/user.controller");


router.post("/register", register); // ☑️
router.post("/signin", signin); // ☑️
router.post("/signout", signout); // ☑️
router.get("/", getAllUsers); // ☑️
router.delete("/:id", deleteUser); // ☑️
router.put("/profile", updateUserProfile); // ☑️
<<<<<<< HEAD
router.get("/verify-token",authMiddleware,  verifyToken);
router.get("/:id", getUserById); 
=======
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
>>>>>>> 3eace8c59cd90c257ff03885d4c0663edd68aa56

module.exports = router;
