const User = require("../models/userSchema")

const addToCart = async (req,res) => {
    const {id} = req.params
    const {dishId,title,Img,rating,description,qty,price,totalPrice,time,type,category} = req.body 
    const user = await User.findById(id)
    const existingDish = user.cart.find(dish => dish.dishId === dishId)
    try {
        if(existingDish){
            const updateDish = await User.findOneAndUpdate({_id: id,"cart.dishId": dishId},{$set: {"cart.$.qty": qty,"cart.$.totalPrice": totalPrice}}, {new: true})
            return res.status(200).json({message: "Dish updated successfully",dish: updateDish.cart.find(dish => dish.dishId === dishId)})
        }else{
            const newDish = await User.findByIdAndUpdate(id,{$push: {cart: {dishId,title,Img,rating,description,qty,price,totalPrice,time,type,category}}}, {new: true})
            return res.status(200).json({message: "Dish added successfully",dish: newDish.cart.find(dish => dish.dishId === dishId)})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteFromCart = async (req,res) => {
    const {userId,dishId} = req.params
    const dish = await User.findByIdAndUpdate(userId,{$pull: {cart: {dishId: dishId}}},{new: true})
    try {
        if(dish){
            return res.status(200).json({message: "Dish deleted successfully"})
        }else{
            return res.status(400).json({error: "something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const updateQuantityInCart = async (req,res) => {
    const {userId} = req.params
    const {dishId,qty,totalPrice} = req.body
    const user = await User.findById(userId)
    const existingDish = user.cart.find(dish => dish.dishId === dishId)
    try {
        if(existingDish){
            const updateDish = await User.findOneAndUpdate({_id: userId,"cart.dishId": dishId},{$set: {"cart.$.qty": qty,"cart.$.totalPrice": totalPrice}}, {new: true})
            return res.status(200).json({message: "Dish updated successfully",dish: updateDish.cart.find(dish => dish.dishId === dishId)})
        }else{
            return res.status(400).json({error: "something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports.addToCart = addToCart
module.exports.deleteFromCart = deleteFromCart
module.exports.updateQuantityInCart = updateQuantityInCart

