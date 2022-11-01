import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useDeleteComment} from "../redux/actions/comments/useDeleteComment"
import {useLikeComment} from "../redux/actions/comments/useLikeComment"
import {useUnLikeComment} from "../redux/actions/comments/useUnLikeComment"
import {MdDelete} from "react-icons/md"
import {FaRegHeart,FaHeart} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import {toast} from "react-toastify"
import moment from 'moment';
import Like from './Like'
import swal from 'sweetalert'
import "./css/reply.css"



const AvatarUserName = (name) => {
  let userName = name.toUpperCase() 
  return (`${userName.split(' ')[0][0]}${userName.split(' ')[1][0]}`)
}


const Reply = ({rev_userName,review,comment,rev_userId,logUser_Id,rev_id,userName}) => {

  let like = {rev_id: rev_id,com_id: comment._id,likeUserId: logUser_Id,likeUserName: userName,createdAt: moment.now()}
  let unLike = {rev_id: rev_id,com_id: comment._id,userId: logUser_Id}

  const {userReducer} = useSelector(state => state)
  const dispatch = useDispatch()
  const {deleteComment} = useDeleteComment()
  const {likeComment} = useLikeComment()
  const {unLikeComment} = useUnLikeComment()
  const [isCommentLike, setIsCommentLike] = useState(false)
  const [openLikesSection, setOpenLikesSection] = useState(false)
  let token = userReducer.token

  // ? like comment functionality
  const handleCommentLike = () => {
    if(token){
      setIsCommentLike(true)
      dispatch(likeComment(like))
    }else{
      toast.error("Login First",{autoClose: 2000})
    }
  }

  // ? unlike comment functionality
  const handleCommentUnLike = () => {
    if(token){
      setIsCommentLike(false)
      dispatch(unLikeComment(unLike))
    }else{
      toast.error("Login First",{autoClose: 2000})
    }
  }

  const handleViewLikesSection = (state) => {
      setOpenLikesSection(state)
  }

  // ? delete comment functionality
  const handleDeleteComment = (r_id,c_id) => {
    if(token){
      swal({ title: "Delete comment", text: "Do you want to delete comment ?", icon: "warning", buttons: true,dangerMode: true,})
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteComment(review,r_id,c_id))
          swal("comment has been deleted", { icon: "success",})
        } 
        else {
          swal("Your comment is important For us");
        }
      });
    }else{
        toast.error("Login First",{autoClose: 2000})
    }
  }

  useEffect(() => {
    if(comment.likes.find(elem => elem.likeUserId === logUser_Id)){
      setIsCommentLike(true)
    }
  },[comment,logUser_Id])

  return (
            <div className='reply-comp'>
                {
                  openLikesSection === false ?
                      <>
                        <div className="reply-comp-img-userName">
                            <div className="reply-comp-img">{AvatarUserName(comment.commentUserName)}</div>
                            <div className='reply-comp-userTime'>
                                <p className='reply-comp-userName'>{comment.commentUserName}</p>
                                <p className='reply-comp-created-at'>{moment(comment.createdAt).fromNow()}</p>
                            </div>
                            {
                              logUser_Id === comment.commentUserId || logUser_Id === rev_userId ?
                                <button className='reply-comp-del-btn' onClick={() => handleDeleteComment(rev_id,comment._id)}><MdDelete/></button>
                                :
                                null
                            }
                        </div>
                        <div className="comment-user-name"><b>@</b>{rev_userName}</div>
                        <div className="reply-comp-text-likeComp">
                          <p className='reply-comp-text'>{comment.comment}</p>
                          {
                            isCommentLike === true ? 
                            <button className='reply-comp-like-btn' title='You liked' onClick={handleCommentUnLike}><FaHeart/></button>
                            :
                            <button className='reply-comp-like-btn' title='Click to like comment' onClick={handleCommentLike}><FaRegHeart/></button>
                          }
                        </div>
                        <div className="reply-comp-option">
                          <button className='reply-option-btn' title='Click to view likes' onClick={() => handleViewLikesSection(true)} disabled={comment.likes.length === 0}>Likes {comment.likes.length} </button>
                        </div>
                        </>
                        :
                        <>
                        <div className="reply-comp-desc-like-close">
                            <p className='reply-comp-like-length'>Comment Likes {comment.likes.length}</p>
                            <button className='reply-comp-likes-close-btn' title='Click to close' onClick={() => handleViewLikesSection(false)}><AiOutlineClose/></button>
                          </div>
                        <div className="reply-comp-all-user-likes">
                          <ul className='reply-comp-all-user-likes-ul'>
                          {
                            comment.likes.map((like) => {
                                return <li className="reply-comp-all-user-likes-li" key={like._id}><Like like={like} key={like._id} bg="#d9d9d9"/></li>
                            })
                          }
                          </ul>
                        </div>
                        </>
                }
            </div>
  )
}

export default Reply