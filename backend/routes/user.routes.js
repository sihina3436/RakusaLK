const express = require("express");
const router = express.Router();

const {
  register,
  signin,
  signout,
  deleteUser,
  getAllUsers,
  updateUserProfile,
} = require("../controller/user.controller");

router.post("/register", register); // ☑️
router.post("/signin", signin); // ☑️
router.post("/signout", signout); // ☑️
router.get("/", getAllUsers); // ☑️
router.delete("/:id", deleteUser); // ☑️
router.put("/profile", updateUserProfile); // ☑️

module.exports = router;
