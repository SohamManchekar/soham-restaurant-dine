const express = require('express');
const { pushCommentToReview, pullCommentFromReview, pushLikeToComment, pullLikeFromComment } = require('../controllers/commentController');
const commentRouter = express.Router()

// * COMMENTS *

// push comment via review_id
commentRouter.post("/:rev_id",pushCommentToReview)

// pull comment via review_id & comment_id only if user is the owner
commentRouter.put("/:rev_id/:com_id", pullCommentFromReview)

// like comment via review_id & comment_id
commentRouter.put("/comLikes/:rev_id/:com_id", pushLikeToComment)

// unlike comment via review_id,comment_id & user_id
commentRouter.put("/comLikes/:rev_id/:com_id/:user_id", pullLikeFromComment)


module.exports = commentRouter