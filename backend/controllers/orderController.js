const User = require("../models/userSchema")

const createOrder = async (req,res) => {
    const {id} = req.params 
    const {paymentDetails,orderItems,address,orderDate,orderDeliveryDate,paymentType,items,amount,discount,payment,isPaid} = req.body 
    try {
        const clearCart = await User.findByIdAndUpdate(id, {$set :{cart: []}},{new: true})
        const order = await User.findByIdAndUpdate(id,{$push : {orders: {paymentDetails,orderItems,address,orderDate,orderDeliveryDate,paymentType,items,amount,discount,payment,isPaid}}},{new: true})
        if(order){
            return res.status(200).json({message: "Order placed",order: order.orders,cart: clearCart.cart})
        }else{
            return res.status(400).json({error: "something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const cancelOrder = async (req,res) => {
    const {userId,orderId} = req.params
    const cancel = await User.findByIdAndUpdate(userId, {$pull: {orders: {_id: orderId}}},{new: true})
    try {
        if(cancel){
            return res.status(200).json({message: "Order cancelled",order: cancel.orders})
        }else{
            return res.status(400).json({error: "something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports.createOrder = createOrder
module.exports.cancelOrder = cancelOrder