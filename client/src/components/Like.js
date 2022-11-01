import React from 'react'
import moment from 'moment';
import "./css/like.css"

const AvatarUserName = (name) => {
    let userName = name.toUpperCase() 
    return (`${userName.split(' ')[0][0]}${userName.split(' ')[1][0]}`)
}

const Like = ({like,bg}) => {
  return (
            <div className="like-comp-img-name-time" key={like._id} style={{backgroundColor: bg}}>
                 <div className="like-comp-img">
                    {AvatarUserName(like.likeUserName)}
                </div>
                    <div className="like-comp-nt">
                        <p className='like-comp-user-name'>{like.likeUserName}</p>
                        <p className='like-comp-time'>{moment(like.createdAt).fromNow()}</p>
                    </div>
                </div>
    )
}

export default Like