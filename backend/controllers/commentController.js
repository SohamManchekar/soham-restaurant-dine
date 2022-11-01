const Review = require("../models/reviewSchema")

const pushCommentToReview = async (req,res) => {
    const {rev_id} = req.params
    const {commentUserName,commentUserId,comment,rev_userName,createdAt} = req.body
    const userComment = await Review.findByIdAndUpdate(rev_id,{$push: {comments: {commentUserName,commentUserId,comment,createdAt}}},{new: true})
    try {
        if(userComment){
            return res.status(201).json({message: `Commented on ${rev_userName} review`, review: userComment})
        }else{
            return res.status(400).json({error: "Something Went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const pullCommentFromReview = async (req,res) => {
    const {rev_id,com_id} = req.params
    const userComment = await Review.findByIdAndUpdate(rev_id,{$pull: {comments: {_id: com_id}}},{new: true})
    try {
        if(userComment){
            return res.status(200).json({message: "Comment deleted"})
        }else{
            return res.status(400).json({error: "No comment found"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const pushLikeToComment = async (req,res) => {
    const {rev_id,com_id} = req.params
    const {likeUserId,likeUserName,createdAt} = req.body
    const userCommentLike = await Review.updateOne({_id: rev_id,comments: {$elemMatch: {_id: com_id}}},{$push: {"comments.$.likes": {likeUserId,likeUserName,createdAt}}},{new: true})
    try {
        if(userCommentLike){
            const review = await Review.findOne({_id: rev_id})
            return res.status(201).json({message: "You liked comment", review: review})
        }else{
            return res.status(400).json({message: "Something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const pullLikeFromComment = async (req,res) => {
    const {rev_id,com_id,user_id} = req.params
    const userCommentUnLike = await Review.updateOne({_id: rev_id, comments: {$elemMatch: {_id: com_id}}},{$pull: {"comments.$.likes": {likeUserId: user_id}}},{new: true})
    try {
        if(userCommentUnLike){
            const review = await Review.findOne({_id: rev_id})
            return res.status(200).json({message: "You unLiked comment", review: review})
        }else{
            return res.status(400).json({message: "Something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}



module.exports.pushCommentToReview = pushCommentToReview
module.exports.pullCommentFromReview = pullCommentFromReview

module.exports.pushLikeToComment = pushLikeToComment
module.exports.pullLikeFromComment = pullLikeFromComment