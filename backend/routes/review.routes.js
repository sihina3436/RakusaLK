const express = require("express");
const router = express.Router();

const { createReview, getReviewsByProduct } = require("../controller/review.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createReview);
router.get("/:productId", getReviewsByProduct);

module.exports = router;