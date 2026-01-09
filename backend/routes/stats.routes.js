const express = require("express");
const router = express.Router();
const {
  getUserStats,
  getAdminStats,
} = require("../controller/stats.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// User dashboard stats
router.get("/user", authMiddleware, roleMiddleware("user"), getUserStats);
// Admin dashboard stats
router.get("/admin", authMiddleware, roleMiddleware("seller"), getAdminStats);

module.exports = router;
