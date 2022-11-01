const Menu = require("../models/menuSchema")

const createDish = async (req,res) =>{
    const {title,Img,description,rating,price,time,type,category} = req.body

    let existingItem = await Menu.findOne({title})
    if(existingItem){
        return res.status(400).json({message:"dish already exists"})
    }else{
        const dish = new Menu({title,Img,description,rating,price,type,category,time})
        try {
            await dish.save()
        } catch (error) {
            return res.status(404).json({error: error.message})
        }
        return res.status(201).json({message:"dish added Successfully",dish: dish})
    }
}

const getDishById = async (req,res) =>{
    let dish = await Menu.findById(req.params.id)
    try {
        if(dish){
            return res.status(200).json({dish})
        }else{
            return res.status(400).json({error:"No dish found"})
        }
    } catch (error) {
            return res.status(400).json({error: error.message})
    }
}

const updateDishById = async (req,res) =>{
    let dish = await Menu.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
    try {
        if(dish){
            return res.status(200).json({message:"dish updated successfully",dish: dish})
        }else{
            return res.status(400).json({error:"No dish found"})
        }
    } catch (error) {
            return res.status(400).json({error: error.message})
    }
}

const deleteDishById = async (req,res) =>{
    let dish = await Menu.findByIdAndDelete(req.params.id)
    try {
        if(dish){
            return res.status(200).json({message: "dish deleted successfully",DeletedItem: dish})
        }else{
            return res.status(400).json({error:"No match found"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const getAllDishes = async(req,res) =>{
    let dishes = await Menu.find()
    try {
        if(dishes.length !== 0){
            return res.status(200).json({dishes})
        }else{
            return res.status(400).json({error:"No dishes"})
        }
    } catch (error) {
            return res.status(400).json({error: error.message})
    }
}

const getAllDishTitles = async(req,res) =>{
   const dishTitlesData = await Menu.find({},{"title": 1,"type": 1,"category": 1})
   try {
       if(dishTitlesData.length !== 0){
           return res.status(200).json({dishTitlesData})
       }else{
            return res.status(400).json({error: "No match found"})
       }
   } catch (error) {
            return res.status(400).json({error: error.message})
   }
}

const getDishByTypeAndCategory = async(req,res) =>{
    const type = req.query.type 
    const category = req.query.category 
    const dishes = await Menu.find({type: type,category: category})
    try {
        if(dishes.length !== 0){
            return res.status(200).json({dishes})
        }else{
            return res.status(404).json({error: "No dish found"})
        }
    } catch (error) {
            return res.status(400).json({error: error.message})
    }
}

const getRecommendedDishes = async(req,res) =>{
    const {type,category} = req.params
    let dishes = await Menu.find({type: type, category: category}).limit(10)
    try {
        if(dishes.length !== 0){
            return res.status(200).json({dishes})
        }else{
            return res.status(404).json({error: "No dish found"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports.createDish = createDish
module.exports.getDishById = getDishById
module.exports.updateDishById = updateDishById
module.exports.deleteDishById = deleteDishById
module.exports.getAllDishTitles = getAllDishTitles
module.exports.getAllDishes = getAllDishes
module.exports.getDishByTypeAndCategory = getDishByTypeAndCategory
module.exports.getRecommendedDishes = getRecommendedDishes