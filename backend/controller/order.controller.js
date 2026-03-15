const mongoose = require("mongoose");
const Order = require("../model/order.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");

const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id; // from auth middleware
    const { cartItems, paySlip } = req.body;

    if(!paySlip) {
      throw new Error("PaySlip is required, can not place order without paySlip");
    }

    // 1️⃣ Get user address
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("User not found");

    let totalAmount = 0;
    const orderProducts = [];

    // 2️⃣ Loop cart items
    for (const item of cartItems) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) throw new Error("Product not found");

      if (product.countInStock < item.quantity) {
        throw new Error(`Out of stock: ${product.name}`);
      }

      // 3️⃣ Reduce stock
      await Product.updateOne(
        { _id: product._id },
        { $inc: { countInStock: -item.quantity } },
        { session }
      );

      totalAmount += product.price * item.quantity;

      // 4️⃣ Push snapshot
      orderProducts.push({
        product: product._id,
        seller: product.user,
        name: product.name,
        image: product.images[0],
        price: product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
    }



    // 5️⃣ Create order
    const order = await Order.create(
      [
        {
          user: user._id,
          shippingAddress: user.address,
          products: orderProducts,
          totalAmount,
          paySlip,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(order);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: err.message });
  }
};

// GET /api/orders/seller
const getAllSellerOrders = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await Order.find({
      "products.seller": req.user._id,
    })
      .populate("user", "username email")
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//view order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "username email")
      .populate("products.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    
    if (req.user.role === "user") {
      if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    
    if (req.user.role === "seller") {
      const isSellerProduct = order.products.some(
        (item) => item.seller.toString() === req.user._id.toString()
      );

      if (!isSellerProduct) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update order status
const updateOrderStatus = async (req, res) => {
  try { 
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    } 
    order.status = req.body.status || order.status;

    if (req.body.status === "cancelled") {
      order.orderCancelled = true;
    }
    
    await order.save();
    res.json(order);

  }catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};



// GET /api/orders/my
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete order
const deleteOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(req.params.id).session(session);
    if (!order) {
      throw new Error("Order not found");
    }

    //  Restore stock
    for (const item of order.products) {
      await Product.updateOne(
        { _id: item.product },
        { $inc: { countInStock: item.quantity } },
        { session }
      );
    }

    await Order.deleteOne({ _id: order._id }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Order deleted & stock restored" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
};




module.exports = { placeOrder, getAllSellerOrders, getUserOrders, getOrderById, updateOrderStatus, deleteOrder };
