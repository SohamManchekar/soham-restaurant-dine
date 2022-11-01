const mongoose = require('mongoose');

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userId : {
        type : String,
        required: true
    },
    dishId:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    reviewType: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: [
        {
            isAdminMessage: {
                type: Boolean,
                default: false
            },
            commentUserId: {
                type: String,
                required: true
            },
            commentUserName: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            likes: [
                {
                    isAdminLike: {
                        type: Boolean,
                        default: false
                    },
                    likeUserId: {
                        type: String,
                        required: true
                    },
                    likeUserName: {
                        type: String,
                        required: true
                    },
                    createdAt : {
                        type: Date,
                        required: true
                    }
                }
                    ],
                createdAt: {
                    type: Date,
                    required: true
                }
        }
    ],
    likes: [
        {
            isAdminLike: {
                type: Boolean,
                default: false
            },
            likeUserId: {
                type: String,
                required: true
            },
            likeUserName: {
                type: String,
                required: true
            },
            createdAt : {
                type: Date,
                required: true
            }
        }
    ],
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("reviews",reviewSchema)