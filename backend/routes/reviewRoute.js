const express = require('express');
const { createReview, deleteReview, getReviews, LikeReview, unLikeReview,} = require('../controllers/reviewController');
const reviewRouter = express.Router()

// * REVIEWS *

// create review via user_id
reviewRouter.post("/:id", createReview)

// get reviews via dish_id
reviewRouter.get("/:id", getReviews)

// delete review via rev_id only if user is the owner of that review 
reviewRouter.delete("/:id", deleteReview)

// like review via rev_id 
reviewRouter.put("/revLikes/:id",LikeReview)

// unLike review via rev_id & likeUser_id 
reviewRouter.put("/revLikes/:rev_id/:userId", unLikeReview)




module.exports = reviewRouter