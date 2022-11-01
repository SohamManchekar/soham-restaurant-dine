const express = require("express")
const { createPayment, paymentVerification } = require("../controllers/paymentController")
const paymentRouter = express.Router()

// * PAYMENT ROUTE *

// CREATE PAYMENT
paymentRouter.post("/create", createPayment)

// VERIFY PAYMENT VIA PAYMENT-ID,ORDER-ID AND PAYMENT-SIGNATURE
paymentRouter.post("/paymentVerify", paymentVerification)

module.exports = paymentRouter