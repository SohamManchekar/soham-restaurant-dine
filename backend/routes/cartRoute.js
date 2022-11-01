const express = require("express")
const { addToCart, deleteFromCart, updateQuantityInCart } = require("../controllers/cartController")
const cartRouter = express.Router()

// * CART *

// add to cart via userId : if dish already exists into cart it will update the dish else it will create a new dish.
cartRouter.put("/addToCart/:id",addToCart)

// delete from cart via userId & dishId
cartRouter.put("/delete/:userId/:dishId",deleteFromCart)

// update quantity from cart via userId
cartRouter.put("/update/:userId",updateQuantityInCart)


module.exports = cartRouter