const express = require("express");
const router = express.Router();
const { getAdminDashboardStats,getUserStats } = require("../controller/stats.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/admin/dashboard", authMiddleware, roleMiddleware("seller"), getAdminDashboardStats);
router.get("/user/dashboard", authMiddleware, roleMiddleware("user"), getUserStats);

module.exports = router;

