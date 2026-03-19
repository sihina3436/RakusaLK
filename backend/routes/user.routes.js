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
  getUserById,
  verifyToken
} = require("../controller/user.controller");


router.post("/register", register); // ☑️
router.post("/signin", signin); // ☑️
router.post("/signout", signout); // ☑️
router.get("/", getAllUsers); // ☑️
router.delete("/:id", deleteUser); // ☑️
router.put("/profile", updateUserProfile); // ☑️
router.get("/verify-token",authMiddleware,  verifyToken);
router.get("/:id", getUserById); 

module.exports = router;
