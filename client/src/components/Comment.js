import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Reply from './Reply'
import Like from './Like'
import LikeButton from './LikeButton'
import {MdDelete} from "react-icons/md"
import {BiCommentDetail} from "react-icons/bi"
import {FaStar} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import swal from "sweetalert"
import moment from 'moment';
import { toast } from 'react-toastify'
import { useLikeReview } from '../redux/actions/review/useLikeReview'
import { useUnLikeReview } from '../redux/actions/review/useUnLikeReview'
import { useDeleteReview } from "../redux/actions/review/useDeleteReview"
import { useAddComment } from '../redux/actions/comments/useAddComment'
import "./css/comment.css"


const AvatarUserName = (name) => {
  let userName = name.toUpperCase() 
  return (`${userName.split(' ')[0][0]}${userName.split(' ')[1][0]}`)
}

const Comment = ({dishId,review,userId,userName,likes,comments}) => {

  const {userReducer} = useSelector(state => state)
  const dispatch = useDispatch()
  let like = {id: review._id,likeUserId: userId,likeUserName: userName,createdAt: moment.now()}
  let token = userReducer.token

  // * controllers
  const {deleteReview} = useDeleteReview()
  const {likeReview} = useLikeReview()
  const {unLikeReview} = useUnLikeReview()
  const {addComment} = useAddComment()

  // * section opening and closing functionality
  const [openSection, setOpenSection] = useState(false)
  const [openCommentSection, setOpenCommentSection] = useState(false)
  const [openLikeSection, setOpenLikeSection] = useState(false)

  // * review functionality and state update
  const [isReviewLike, setIsReviewLike] = useState(false)

  // * comment functionality and state update
  const [comment, setComment] = useState("")

  // ? open comment section functionality
  const handleOpenCommentSection = () => {
     setOpenSection(true)
     setOpenCommentSection(true)
     setOpenLikeSection(false)
  }

  // ? open like section functionality
  const handleOpenLikeSection = () => {
      setOpenSection(true)
      setOpenCommentSection(false)
      setOpenLikeSection(true)
  }

  // ? close all section functionality
  const handleCloseSection = () => {
      setOpenSection(false)
      setOpenCommentSection(false)
      setOpenLikeSection(false)
  }

  // ? delete review functionality
  const handleDeleteReview = (id) => {
    if(token){
      swal({ title: "Delete Review", text: "Do you want to delete review ?", icon: "warning", buttons: true,dangerMode: true,})
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteReview(id))
          swal("Your review has been deleted", { icon: "success",})
        } 
        else {
          swal("Your review is important For us");
        }
      });
    }else{
      toast.error("Login First",{autoClose: 1500})
    }
  }

  // ? like review functionality
  const handleLikeReview = () => {
    if(token){
       dispatch(likeReview(like))
       setIsReviewLike(true)
    }else{
      toast.error("Login First",{autoClose: 2000})
    }
  } 

  // ? unLike review functionality
  const handleUnLikeReview = (rev_id,likeUser_id) => {
      if(token){
        dispatch(unLikeReview(rev_id,likeUser_id))
        setIsReviewLike(false)
      }else{
        toast.error("Login First",{autoClose: 2000})
      }
  }

  // ? add comment functionality
  let commentOnReview = {dish_id:dishId,rev_id: review._id,rev_userName: review.userName,comment: comment,commentUserId: userId,commentUserName: userName,createdAt: moment.now()}
  const handleAddComment = () => {
     if(comment.length === 0){
        toast.error("Add comment",{autoClose: 1500})
     }else{
        if(token){
            dispatch(addComment(commentOnReview))
            setComment("")
        }else{
            toast.error("Login First",{autoClose: 2000})
        }
     }
  }

  useEffect(() => {
    if(review.likes.find(elem => elem.likeUserId === userId)){
        setIsReviewLike(true)
    }
  },[review.likes,userId])

  return (
    <>
          <div className='comment-comp' key={review._id}>
          <div className="comment-comp-img-name">
            <div className="comment-comp-igna">
                <div className="comment-comp-img">
                    {AvatarUserName(review.userName)}
                </div>
                <p className='comment-comp-user-name'>{review.userName}</p>
            </div>
            {
                  openSection === true ?
                    <button title='Close' className='comment-comp-user-cd-btn' onClick={handleCloseSection}><AiOutlineClose/></button>
                  :
                    null
            }
          </div>
          <div className="comment-comp-rating-type-time">
            <div className="comment-comp-user-rating"><p>{review.rating}</p><FaStar style={{color:"orange", fontSize:"0.8em"}} /></div>
            <p className='comment-comp-user-choose-type'>{review.reviewType}</p>
            <p className='comment-comp-user-created-at'>{moment(review.createdAt).fromNow()}</p>
          </div>
          <div className="comment-comp-comment-reply-section">
              <div className="comment-comp-user-comment">{review.review}</div>
              {
                  openSection === true ?
                      openCommentSection === true && openLikeSection === false ?
                          <>
                            <div className="comment-comp-all-user-reply">
                              <ul className='comment-comp-all-user-reply-ul'>
                                {
                                    comments && comments.map((comment) => {
                                      return  <li className='comment-comp-all-user-reply-li' key={comment._id}>
                                                 <Reply key={comment._id} rev_id={review._id} review={review} comment={comment} rev_userName={review.userName} rev_userId={review.userId} logUser_Id={userId} userName={userName} />
                                              </li>
                                    })
                                }
                              </ul>
                            </div> 
                            <div className="comment-comp-user-reply">
                              <input type="text" className='user-reply-inp' placeholder='Write a comment...' name='reply' value={comment} onChange={(e) => setComment(e.target.value)} />
                              <button className='user-reply-btn' onClick={handleAddComment}>ADD</button>
                            </div>
                          </>
                        :
                        <>
                        <div className="comment-comp-all-user-like-desc"><p style={{margin: "0 0.3em"}}>Review Likes {likes.length}</p></div>
                          <div className="comment-comp-all-user-likes">
                            <ul className="comment-comp-all-user-likes-ul">
                                  {
                                      likes && likes.map((like) => {
                                        return (
                                                  <li className='comment-comp-all-user-likes-li' key={like._id}>
                                                      <Like like={like} key={like._id} bg="white" />
                                                  </li>
                                               ) 
                                      })
                                  }
                            </ul>
                          </div>
                          </>
                    :
                      null
              }
          </div>
          <div className="comment-comp-lengths">
            <button className='comment-comp-lengths-btn' title='Click to view likes' onClick={handleOpenLikeSection} disabled={likes.length === 0}>Likes {likes.length}</button>
            <button className='comment-comp-lengths-btn' title='Click to view comments' onClick={handleOpenCommentSection} disabled={comments.length === 0}>Comments {comments.length}</button>
          </div>
          <div className="comment-comp-option">
              <LikeButton isLike={isReviewLike} handleLike={handleLikeReview} handleUnLike={handleUnLikeReview} rev_id={review._id} likeUser_id={like.likeUserId} />
              <button className='comment-option-btn' title={`comment on ${review.userName} review`} onClick={handleOpenCommentSection}><BiCommentDetail style={{fontSize: "1.3em",margin: "0 0 0 0.3em"}}/><p className='comment-option-text' style={{margin: "0 0.3em"}}>Comment</p></button>
              {
                userId === review.userId ?
                  <button className='comment-option-btn' title='Delete Review' onClick={() => handleDeleteReview(review._id)}><MdDelete style={{fontSize: "1.3em",margin: "0 0 0 0.3em"}}/><p className='comment-option-text' style={{margin: "0 0.3em"}}>Delete</p></button>
                  :
                  null
              }
            </div>
          </div>
    </>
  )
}

export default Comment