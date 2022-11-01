const mongoose = require('mongoose');

const Schema = mongoose.Schema

const menuSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    Img:{
        type:String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Menu",menuSchema)