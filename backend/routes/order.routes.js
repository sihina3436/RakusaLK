const express = require('express');
const router = express.Router();
const Order = require('../model/order.model');
const { placeOrder,getAllSellerOrders, getUserOrders, getOrderById, updateOrderStatus, deleteOrder  } = require('../controller/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');


// Place a new order
router.post('/place', authMiddleware,placeOrder); //☑️
// Get all orders for a seller
router.get('/getAllOrder', authMiddleware,getAllSellerOrders); //☑️
// Get all orders for the logged-in user
router.get('/getUserOrders', authMiddleware, getUserOrders);//☑️
// get ordrer by id
router.get('/:id', authMiddleware, getOrderById); //☑️
// update order status
router.put('/:id/status', authMiddleware, roleMiddleware('seller'), updateOrderStatus);//☑️
// delete order
router.delete('/:id', authMiddleware,roleMiddleware('seller'), deleteOrder); // ☑️

    

module.exports = router;