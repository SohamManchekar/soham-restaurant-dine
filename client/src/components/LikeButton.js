import React from 'react'
import {FaRegHeart,FaHeart} from "react-icons/fa"

const LikeButton = ({isLike,handleLike,handleUnLike,rev_id,likeUser_id}) => {
  return (
    <>
        {
            isLike ? 
                <button className='comment-option-btn' title='You liked' onClick={() => handleUnLike(rev_id,likeUser_id)}><FaHeart style={{fontSize: "1.3em",margin: "0 0 0 0.3em",color: "#ff0000"}}/><p className='comment-option-text' style={{paddingTop: "2px",margin: "0 0.3em"}}>like</p></button>
                    :
                <button className='comment-option-btn' title='Click to like review' onClick={handleLike}><FaRegHeart style={{fontSize: "1.3em",margin: "0 0 0 0.3em"}}/><p className='comment-option-text' style={{paddingTop: "2px",margin: "0 0.3em"}}>like</p></button>
                
        }
    </>
  )
}

export default LikeButton