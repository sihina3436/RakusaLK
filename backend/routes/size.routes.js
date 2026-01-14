const express = require("express");
const router = express.Router();
const { createSize, getAllSizes } = require("../controller/size.controller");
const  authMiddleware  = require("../middleware/auth.middleware");

router.post("/sizes", authMiddleware, createSize);
router.get("/sizes", getAllSizes);

module.exports = router;