import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import {Link,useNavigate} from "react-router-dom";
import {FaUserPlus} from "react-icons/fa";
import {HiLogin,HiMenu} from "react-icons/hi";
import {AiOutlineArrowUp} from "react-icons/ai";
import UserDetails from './UserDetails';
import Backdrop from '@mui/material/Backdrop';
import "./css/header.css"


const Header = () => {

  const [open, setOpen] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false)
  const { userReducer } = useSelector(state => state)
  const history = useNavigate()
  let token = userReducer.token
  let user = userReducer.user

  const toggleMenuBar = (top) => {
      const menuBar = document.getElementById("menuBar")
      menuBar.style.top = top
  }

  const toggleUserDetailsOpen = () =>{
      setOpenUserDetails(true)
  }

  const toggleUserDetailsClose = () => {
      setOpenUserDetails(false)
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const AvatarUserName = (name) => {
    let userName = name.toUpperCase() 
    return (`${userName.split(' ')[0][0]}${userName.split(' ')[1][0]}`)
  }

  return (
    <>
      <div className="header" id='header'>
        <div className="logo-det">
            <div className="logo" onClick={() => history("/")}><img src="https://i.ibb.co/LkXS2vL/istockphoto-1268953650-612x612-removebg-preview.png" alt="" /></div>
            <div className="logo-name" onClick={() => history("/")}>Soham</div>
        </div>
        {
           !token &&
            <div className="user-panel">
              <Link to="/signup" style={{textDecoration:"none"}}><button className='signLog-btn one'><p>Sign up </p> <FaUserPlus style={{fontSize:"0.9em"}}/></button></Link>
              <Link to="/login" style={{textDecoration:"none"}}><button className='signLog-btn two'><p>Login</p> <HiLogin style={{fontSize:"0.9em"}}/></button></Link>
            </div>
        }
        {
          token &&
            <div className="user-end">
              <button className='user-btn' onClick={() => toggleUserDetailsOpen()}>
                   {
                     user ? 
                        AvatarUserName(user.name)
                      :
                        null
                    }
              </button>
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openUserDetails}>
                    <UserDetails handleUserDetailsClose={toggleUserDetailsClose} user={user} />
              </Backdrop>
            </div>
        }
        {
          !token && 
            <div className="menu-bar">
              <button className='menu-btn' onClick={() => {toggleMenuBar("0px");handleOpen();}}><HiMenu/></button>
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                <div className="menu-details" id='menuBar' style={{top:"-210px"}}>
                    <button className="menu-close" onClick={() => {toggleMenuBar("-210px");handleClose();}}><AiOutlineArrowUp/></button>
                    <Link to="/signup" style={{textDecoration:"none"}}><button className='signLog-btn one' style={{width:"150px",height:"50px",fontSize:"1.4em"}} onClick={() => {toggleMenuBar("-210px");handleClose()}}><p>Sign up </p> <FaUserPlus style={{fontSize:"0.9em"}}/></button></Link>
                    <Link to="/login" style={{textDecoration:"none"}}><button className='signLog-btn two' style={{width:"150px",height:"50px",fontSize:"1.4em"}} onClick={() => {toggleMenuBar("-210px");handleClose()}}><p>Login</p> <HiLogin style={{fontSize:"0.9em"}}/></button></Link>
                </div>
              </Backdrop>
            </div>
        }
    </div>
    </>
  )
}

export default Header