const Order = require("../model/order.model");
const User = require("../model/user.model");
const Product = require("../model/product.model");

/**
 * =========================
 * USER DASHBOARD STATS
 * =========================
 */
exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Total orders
    const totalOrders = await Order.countDocuments({ user: userId });

    // Total spent
    const totalSpentAgg = await Order.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalSpent = totalSpentAgg[0]?.total || 0;

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Recent orders
    const recentOrders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("totalAmount status createdAt");

    res.json({
      totalOrders,
      totalSpent,
      ordersByStatus,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load user stats" });
  }
};

/**
 * =========================
 * ADMIN DASHBOARD STATS
 * =========================
 */
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Total revenue
    const revenueAgg = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Monthly revenue (for charts)
    const monthlyRevenue = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({
      totalUsers,
      totalSellers,
      totalProducts,
      totalOrders,
      totalRevenue,
      ordersByStatus,
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};
