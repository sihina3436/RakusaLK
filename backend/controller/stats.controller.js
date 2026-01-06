const Order = require("../model/order.model");
const User = require("../model/user.model");
const Product = require("../model/product.model");

/* =========================
   ADMIN (SELLER) DASHBOARD
   ========================= */

/* =========================
   ALL-IN-ONE ADMIN DASHBOARD STATS
   ========================= */
const getAdminDashboardStats = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { year, month, topProductsLimit = 5 } = req.query;

    if (!year || !month) {
      return res
        .status(400)
        .json({ message: "Year and month are required" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // =========================
    // TOTALS
    // =========================
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    // =========================
    // MONTHLY ORDERS & REVENUE
    // =========================
    const monthlyStats = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          orders: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // =========================
    // ORDER STATUS
    // =========================
    const orderStatusStats = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // =========================
    // TOP PRODUCTS OF THE MONTH
    // =========================
    const topProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
          status: { $ne: "cancelled" },
        },
      },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          productName: { $first: "$products.name" },
          totalSold: { $sum: "$products.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: Number(topProductsLimit) },
    ]);

    // =========================
    // PRODUCT SALES (ALL TIME)
    // =========================
    const productSales = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          productName: { $first: "$products.name" },
          totalQuantitySold: { $sum: "$products.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
    ]);

    // =========================
    // SALES BY STATE
    // =========================
    const salesByState = await Order.aggregate([
      {
        $match: {
          status: { $ne: "cancelled" },
          "shippingAddress.state": { $exists: true, $ne: "" },
        },
      },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$shippingAddress.state",
          totalOrders: { $addToSet: "$_id" },
          totalItemsSold: { $sum: "$products.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          state: "$_id",
          totalOrders: { $size: "$totalOrders" },
          totalItemsSold: 1,
          totalRevenue: 1,
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    // =========================
    // SALES BY CITY
    // =========================
    const salesByCity = await Order.aggregate([
      {
        $match: {
          status: { $ne: "cancelled" },
          "shippingAddress.city": { $exists: true, $ne: "" },
        },
      },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$shippingAddress.city",
          totalOrders: { $addToSet: "$_id" },
          totalItemsSold: { $sum: "$products.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
          totalOrders: { $size: "$totalOrders" },
          totalItemsSold: 1,
          totalRevenue: 1,
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    // =========================
    // BEST CUSTOMER OF THE MONTH
    // =========================
    const bestCustomer = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$totalAmount" },
          ordersCount: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          userId: "$userInfo._id",
          username: "$userInfo.username",
          email: "$userInfo.email",
          totalSpent: 1,
          ordersCount: 1,
        },
      },
    ]);

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      monthlyStats,
      orderStatusStats,
      topProducts,
      productSales,
      salesByState,
      salesByCity,
      bestCustomer: bestCustomer[0] || null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




/* =========================
   USER DASHBOARD
   ========================= */
const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId });

    const totalOrders = orders.length;
    const totalSpent = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    // Order status breakdown
    const orderStatus = await Order.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent orders
    const recentOrders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("totalAmount status createdAt");

    res.status(200).json({
      totalOrders,
      totalSpent,
      orderStatus,
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAdminDashboardStats,
  getUserStats,
};

