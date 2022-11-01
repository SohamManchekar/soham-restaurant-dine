const express = require('express');
const {createDish,getDishById,updateDishById,deleteDishById,getRecommendedDishes, getAllDishes} = require('../controllers/menuController');
const menuRouter = express.Router()

// * ADMIN PANEL *


// CREATE DISH
menuRouter.post("/postDish",createDish)
// READ DISH
menuRouter.get("/:id",getDishById)
// UPDATE DISH
menuRouter.put("/:id",updateDishById)
// DELETE DISH
menuRouter.delete("/:id",deleteDishById)



// get all dishes
menuRouter.get("/",getAllDishes)
// get recommended dishes
menuRouter.get("/recommended/:type/:category",getRecommendedDishes)


module.exports = menuRouter