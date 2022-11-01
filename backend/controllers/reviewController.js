const Review = require("../models/reviewSchema")

const createReview = async (req,res) => {
    const {id} = req.params
    const {dishId,review,reviewType,rating,userName} = req.body
    const userReview = new Review({userId: id,dishId,review,reviewType,rating,userName})
    try {
        await userReview.save()
    } catch (error) {
        return res.status(400).json({error: error.message})
    }

    return res.status(201).json({message: `Thank you ${userName} for your Review`, review: userReview})
}

const getReviews = async (req,res) => {
    const {id} = req.params
    const reviews = await Review.find({dishId: id})
    try {
        if(reviews.length !== 0){
            return res.status(200).json({reviews: reviews})
        }else{
            return res.status(200).json({message: "No Review",reviews})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteReview = async (req,res) => {
    const {id} = req.params
    const review = await Review.findByIdAndDelete(id)
    try {
        if(review){
            return res.status(200).json({message: "Review deleted"})
        }else{
            return res.status(404).json({error: "Review not found"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const LikeReview = async (req,res) => {
    const {id} = req.params
    const {likeUserId,likeUserName,createdAt} = req.body
    const userLike = await Review.findByIdAndUpdate(id,{$push : {likes: {likeUserId,likeUserName,createdAt}}},{new: true})
    try {
        if(userLike){
            return res.status(201).json({message: "You liked review", review: userLike})
        }else{
            return res.status(400).json({error: "something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const unLikeReview = async (req,res) => {
    const {rev_id,userId} = req.params
    const userUnLike = await Review.findByIdAndUpdate(rev_id,{$pull: {likes: {likeUserId: userId}}},{new: true})
    try {
        if(userUnLike){
            return res.status(200).json({message: "You unLiked review", review: userUnLike})
        }else{
            return res.status(400).json({error: "something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}



module.exports.createReview = createReview
module.exports.deleteReview = deleteReview
module.exports.getReviews = getReviews

module.exports.LikeReview = LikeReview
module.exports.unLikeReview = unLikeReview
