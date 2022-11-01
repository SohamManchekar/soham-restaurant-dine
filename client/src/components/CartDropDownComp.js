import React,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useUpdateCart } from '../redux/actions/Cart/useUpdateCart';
import { useDeleteFromCart } from '../redux/actions/Cart/useDeleteFromCart';
import {MdDelete,MdModeEdit} from "react-icons/md"
import {HiMinus,HiPlus} from "react-icons/hi"
import {AiOutlineClose} from "react-icons/ai"
import Backdrop from '@mui/material/Backdrop';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import "./css/cartDropdown.css"


const CartDropDownComp = ({dish}) => {

    const dispatch = useDispatch()
    const {userReducer} = useSelector(state => state)
    const {updateQuantity} = useUpdateCart()
    const {deleteFromCart} = useDeleteFromCart()
    const [quantity, setQuantity] = useState(dish.qty)
    const [openQtySection, setOpenQtySection] = useState(false)
    let token = userReducer.token
    let user = userReducer.user

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

      // handle delete dish from cart
      const handleDeleteFromCart = (dishId) => {
        let userId = user ? user.userId : ""
        if(token){
            swal({ title: "Remove Dish", text: `Do you want to remove ${dish.title} dish ?`, icon: dish.Img, buttons: true,dangerMode: true,})
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

  return (
        <div className="cart-dropdown-comp-dish" key={dish._id}>
            <div className="cart-dropdown-comp-dish-img"><img src={dish.Img} alt="" title={dish.title} /></div>
            <div className="cart-dropdown-comp-dish-details">
                <div className="cart-dropdown-comp-dish-details-td">
                    <div className="cart-dropdown-comp-dish-details-title">{dish.title.slice(0,18)}...</div>
                    <button className="cart-dropdown-comp-dish-details-del-btn" onClick={() => handleDeleteFromCart(dish.dishId)}><MdDelete/></button>
                </div>
                <div className="cart-dropdown-comp-dish-details-price">₹{dish.price}</div>
                <div className="cart-dropdown-comp-dish-details-edit-qty">
                    <p className='cart-dropdown-comp-dish-details-qty'>Qty : {dish.qty}</p>
                    <button className='cart-dropdown-comp-dish-details-edit-btn' onClick={() => handleOpenQtySection()}><MdModeEdit/></button>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openQtySection}>
                    <div className="cart-dropdown-comp-update-qty">
                        <div className="cart-dropdown-comp-update-qty-tc">
                            <p className="cart-dropdown-comp-update-qty-text">{dish.title.slice(0,18)}...</p>
                            <button className="cart-dropdown-comp-update-qty-close" onClick={() => handleCloseQtySection()}><AiOutlineClose/></button>
                        </div>
                        <div className="cart-dropdown-comp-qty-inc-dec">
                            <button className='cart-dropdown-comp-in-de-btn' onClick={() => handleDecrement()} style={{borderTopLeftRadius:"8px",borderBottomLeftRadius:"8px"}}><HiMinus/></button>
                            <input type="text" className='cart-dropdown-comp-qty-inp' name="number" placeholder='Enter Qty' value={quantity} readOnly />
                            <button className='cart-dropdown-comp-in-de-btn' onClick={() => handleIncrement()} style={{borderTopRightRadius:"8px",borderBottomRightRadius:"8px"}}><HiPlus/></button>
                        </div>
                        <div className="cart-dropdown-comp-conf-can">
                            <button className='cart-dropdown-comp-cc-btn' onClick={() => setQuantity(dish.qty)}>Reset</button>
                            <button className='cart-dropdown-comp-cc-btn' onClick={() => handleUpdateQuantity(dish.dishId,quantity)}>Update</button>
                        </div>
                    </div>
                </Backdrop>
                </div>
            </div>
        </div>
  )
}

export default CartDropDownComp