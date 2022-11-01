const mongoose = require('mongoose');

const Schema = mongoose.Schema

// creating user schema
const userSchema = new Schema({
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [
        {
            dishId:{
                type: String,
                required: true
            },
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
            qty:{
                type: Number,
                required: true,
            },
            price:{
                type: Number,
                required: true
            },
            totalPrice: {
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
        }
    ],
    orders: [
        {
            paymentDetails:{},
            orderItems: [],
            address:{
                type: String,
                required: true
            },
            orderDate: {
                type: String,
                required: true
            },
            orderDeliveryDate: {
                type: String,
                required: true
            },
            paymentType: {
                type: String,
                required: true
            },
            items: {
                type: Number,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            discount: {
                type: Number,
                required: true
            },
            payment: {
                type: Number,
                required: true
            },
            isPaid: {
                type: String,
                required: true
            }
        }
    ],
    address: [
        {
            token: {
                type: String,
                required: true
            },
            buildingRoom: {
                type: String,
                required: true
            },
            societyApartment: {
                type: String,
                required: true
            },
            roadNearby: {
                type: String,
                required: true
            },
            town: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            pinCode: {
                type: Number,
                required: true
            },
        }
    ],
    selectedAddress: {
        token: {
            type: String,
        },
        buildingRoom: {
            type: String,
        },
        societyApartment: {
            type: String,
        },
        roadNearby: {
            type: String,
        },
        town: {
            type: String,
        },
        city: {
            type: String,
        },
        pinCode: {
            type: Number,
        },
      },
},
    {
        timestamps : true
    }
)

module.exports = mongoose.model("Users",userSchema)
