import React from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineClose} from "react-icons/ai"
import {useLogout} from "../redux/actions/User/useLogout"
import {useDispatch,useSelector} from "react-redux"
import "./css/userDetails.css"


const UserDetails = ({handleUserDetailsClose,user}) => {

  const dispatch = useDispatch()
  const {cartReducer,orderReducer} = useSelector(state => state)
  const AvatarUserName = (name) => {
    let userName = name.toUpperCase() 
    return (`${userName.split(' ')[0][0]}${userName.split(' ')[1][0]}`)
  }

  const {logout} = useLogout()
  const handleLogout = async () => {
      dispatch(logout(handleUserDetailsClose))
  }

   // * Total cart *
   const cartQty = cartReducer.cart.map((item) => { return item.qty })

   // * Total orders *
   const totalOrder = orderReducer.orders ? orderReducer.orders.length : 0

  return (
        <>
          {
            user ? 
            <div className='user-det' id='userDet'>
              <button className='user-det-close-btn' onClick={handleUserDetailsClose}><AiOutlineClose/></button>
              <div className="user-head">
                  <div className="user-logo">
                    {AvatarUserName(user.name)}
                  </div>
                  <div className="user-name">{user.name}</div>
                  <div className="user-emailId">{user.email}</div>
              </div>
              <div className="user-middle">
                  <Link to="/cart" style={{textDecoration:"none"}}><button className='userDir-btn' onClick={handleUserDetailsClose}><h2>Cart</h2> <p style={{fontFamily:"Poppins"}}>{cartQty.length}</p></button></Link>
                  <Link to="/orders" style={{textDecoration:"none"}}><button className='userDir-btn' onClick={handleUserDetailsClose}><h2>Orders</h2> <p style={{fontFamily:"Poppins"}}>{totalOrder}</p></button></Link>
              </div>
              <div className="user-lower">
                  <button className='user-logout' onClick={handleLogout}>Logout</button>
              </div>
            </div>
            :
            null
          }
        </>
  )
}

export default UserDetails