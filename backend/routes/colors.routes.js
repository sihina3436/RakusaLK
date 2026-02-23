const {createColor, getAllColors, getColorById}  = require("../controller/colors.controller");
const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();


router.post("/", authMiddleware, createColor);
router.get("/", getAllColors);
router.get("/:id", getColorById);

module.exports = router;

