const Razorpay = require("razorpay");
const shortId = require("shortid")
const crypto = require("crypto");

const createPayment = async (req,res) => {
    const { amount } = req.body
    const receipt = shortId.generate()

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

    const options = {
        amount: amount,
        currency: "INR",
        receipt: receipt
    }

    const createOrder = await instance.orders.create(options)
    
    try {
        if(createOrder){
            return res.status(201).json({message: "Order created",order: createOrder})
        }else{
            return res.status(400).json({error: "something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const paymentVerification = async (req,res) => {
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body

    const verify = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                  .update(verify.toString())
                                  .digest('hex');
   try {
        if(expectedSignature === razorpay_signature){
            return res.status(200).json({message: "Payment verified"})
        }else{
            return res.status(400).json({error: "Payment unauthorized"})
        }
   } catch (error) {
        return res.status(400).json({error: error.message})
   }

}

module.exports.createPayment = createPayment
module.exports.paymentVerification = paymentVerification