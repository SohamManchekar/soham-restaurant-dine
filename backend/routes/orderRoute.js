const express = require('express');
const { createOrder, cancelOrder } = require("../controllers/orderController")
const orderRouter = express.Router()

// CREATE ORDER VIA USER-ID
orderRouter.put("/create/:id",createOrder)

// CANCEL ORDER VIA USER-ID AND ORDER-ID
orderRouter.put("/cancel/:userId/:orderId",cancelOrder)



module.exports = orderRouter