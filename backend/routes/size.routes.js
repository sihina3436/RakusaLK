const express = require("express");
const router = express.Router();
const { createSize, getAllSizes, getSizeById } = require("../controller/size.controller");
const  authMiddleware  = require("../middleware/auth.middleware");

router.post("/sizes", authMiddleware, createSize);
router.get("/sizes", getAllSizes);
router.get("/sizes/:id", getSizeById);

module.exports = router;