import React,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Backdrop from '@mui/material/Backdrop';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import {MdDelete,MdModeEdit} from "react-icons/md"
import {HiMinus,HiPlus} from "react-icons/hi"
import {toast} from "react-toastify";
import {AiOutlineClose} from "react-icons/ai"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteFromCart } from '../redux/actions/Cart/useDeleteFromCart';
import { useUpdateCart } from '../redux/actions/Cart/useUpdateCart';
import swal from "sweetalert"
import "./css/cartDish.css"


const CartDish = ({dish}) => {

    const dispatch = useDispatch()
    const {userReducer} = useSelector(state => state)
    const {deleteFromCart} = useDeleteFromCart()
    const {updateQuantity} = useUpdateCart()
    const [open, setOpen] = useState(false)
    const [openQtySection, setOpenQtySection] = useState(false)
    const [quantity, setQuantity] = useState(dish.qty)
    let token = userReducer.token
    let user = userReducer.user

     // snackbar open
     const handleOpen = () => {
        setOpen(true);
    };
    // snackbar close
    const handleClose = () => {
        setOpen(false);
    };

     // snackbar action
     const action = (
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

      // quantity section open
      const handleOpenQtySection = () => {
        setOpenQtySection(true)
      }

      // quantity section close
      const handleCloseQtySection = () => {
        setOpenQtySection(false)
      }

       // handle qty increment
        const handleIncrement = () => {
            setQuantity(quantity + 1)
        }

        // handle qty decrement
        const handleDecrement = () => {
            if(quantity === 1){
                toast.error("Default Quantity 1",{autoClose: 2000})
            }else{
                setQuantity(quantity - 1)
            }
        }

        // handle delete dish from cart
        const handleDeleteFromCart = (dishId) => {
            let userId = user ? user.userId : ""
            if(token){
                swal({ title: "Remove Dish", text: `Do you want to remove ${dish.title} dish ?`, icon: `${dish.Img}`, buttons: true,dangerMode: true,})
                .then((willDelete) => {
                    if (willDelete) {
                        dispatch(deleteFromCart(userId,dishId))
                        swal("Dish removed successfully", { icon: "success",})
                    }
                });
            }else{
                toast.error("Login First",{autoClose: 2000})
            }
        }

        // handle update quantity of a dish in cart
        const handleUpdateQuantity = (id,qty) => {
           let userId = user ? user.userId : ""
           if(token){
                dispatch(updateQuantity(id,qty,userId))
                setOpenQtySection(false)
           }else{
                toast.error("Login First",{autoClose: 2000})
            }
        }

  return (
    <div className="cart-dish-comp">
       <div className="cart-dish-comp-img"><img src={dish.Img} alt="" /></div>
       <div className="cart-dish-comp-details">
            <div className="cart-dish-comp-header">
                <p className="cart-dish-comp-title">{dish.title}</p>
                <button className='cart-dish-comp-del-btn' title='Remove Dish' onClick={() => handleDeleteFromCart(dish.dishId)}><MdDelete/></button></div>
            <div className="cart-dish-comp-rating">
                <Rating size='small' name="half-rating-read" value={dish.rating} precision={0.5} readOnly />
                <p className='cart-dish-comp-rating-num'>{dish.rating}</p>
            </div>
            <div className="cart-dish-comp-prt">
                <div className="cart-dish-comp-price"><p style={{fontFamily:"Arial"}}>₹</p>{dish.price}</div>
                <div className="cart-dish-comp-time">
                    <img onClick={handleOpen} src="https://i.ibb.co/sJQ8f91/clock.png" alt=""/>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={`Time taken to Cook ${dish.time} mins`} action={action} /> 
                    <p className='cart-dish-comp-timer'>{dish.time} mins</p>
                </div>
            </div>
            <div className="cart-dish-comp-desc">
                <p className='cart-dish-comp-desc-1'>{dish.description}</p>
                <p className='cart-dish-comp-desc-2'>({dish.type},{dish.category})</p>
            </div>
            <div className="cart-dish-comp-edit-qty">
                <p className="cart-dish-comp-qty">Qty: {dish.qty}</p>
                <button className='cart-dish-comp-edit-btn' title='Edit Quantity' onClick={() => handleOpenQtySection()}><MdModeEdit/></button>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openQtySection}>
                    <div className="cart-dish-comp-update-qty">
                        <div className="cart-dish-comp-update-qty-tc">
                            <p className="cart-dish-comp-update-qty-text">{dish.title.slice(0,20)}...</p>
                            <button className="cart-dish-comp-update-qty-close" onClick={() => handleCloseQtySection()}><AiOutlineClose/></button>
                        </div>
                        <div className="cart-dish-comp-qty-inc-dec">
                            <button className='cart-dish-comp-in-de-btn' onClick={() => handleDecrement()} style={{borderTopLeftRadius:"8px",borderBottomLeftRadius:"8px"}}><HiMinus/></button>
                            <input type="text" className='cart-dish-comp-qty-inp' name="number" placeholder='Enter Qty' value={quantity} readOnly />
                            <button className='cart-dish-comp-in-de-btn' onClick={() => handleIncrement()} style={{borderTopRightRadius:"8px",borderBottomRightRadius:"8px"}}><HiPlus/></button>
                        </div>
                        <div className="cart-dish-comp-conf-can">
                            <button className='cart-dish-comp-cc-btn' onClick={() => setQuantity(dish.qty)}>Reset</button>
                            <button className='cart-dish-comp-cc-btn' onClick={() => handleUpdateQuantity(dish.dishId,quantity)}>Update</button>
                        </div>
                    </div>
                </Backdrop>
            </div>
       </div>
    </div>
  )
}

export default CartDish