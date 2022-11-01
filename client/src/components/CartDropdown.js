import React from 'react';
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {AiOutlineClose} from "react-icons/ai"
import CartDropDownComp from './CartDropDownComp';
import "./css/cartDropdown.css";

const CartDropdown = ({isOpen}) => {

  const { cartReducer } = useSelector(state => state)
  const history = useNavigate()

   //* Total cart quantity
   const cartQty = cartReducer.cart.map((item) => { return item.qty })
   const qtyReducer = (accumulator,currentValue) => accumulator + currentValue
   const totalCartQty = cartQty.reduce(qtyReducer,0)
 
   //* Total cart price
   const cartAmount = cartReducer.cart.map((item) => { return item.totalPrice })
   const amountReducer = (accumulator,currentValue) => accumulator + currentValue
   const totalCartAmount = cartAmount.reduce(amountReducer,0)

   const pushUserToTop = () =>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  }

  return (
    <div className='cart-dropdown-section'>
          <div className="cart-dropdown-head">
            <button className='cart-dropdown-close-btn' onClick={isOpen}><AiOutlineClose/></button>
          </div>
          <div className="cart-dropdown-main">
              <div className="cart-dropdown-text">
              {
                cartQty.length <= 0 ? 
                "Your Cart is empty"
                :
                `Items in Your Cart : ${cartQty.length}`
              }
              </div>
              <div className="cart-dropdown-comp">
                  <ul className="cart-dropdown-comp-ul">
                    {
                      cartReducer.cart.map((dish) => {
                        return <li className='cart-dropdown-comp-ul-li' key={dish._id}><CartDropDownComp dish={dish} key={dish._id} /></li>
                      })
                    }
                  </ul>
              </div>
              <div className="cart-dropdown-comp-lower">
                <div className="cart-dropdown-comp-summary">
                    <div className="cart-dropdown-comp-summary-st">
                       <p>SubItems</p>
                       <p>{totalCartQty}</p>
                    </div>
                    <div className="cart-dropdown-comp-summary-st">
                       <p>Total</p>
                       <p style={{fontFamily:"Arial"}}>₹
                         {
                          cartQty.length <= 0 ?
                            0
                            :
                            <>{totalCartAmount >= 200 ? totalCartAmount : totalCartAmount + 25}{ totalCartAmount >= 200 ? null : `(${totalCartAmount} + 25)`}</>
                         }
                      </p>
                    </div>
                </div>
                <div className="cart-dropdown-comp-lower-btn">
                  <button className='cart-dropdown-comp-lb' disabled={totalCartAmount === 0} onClick={() => {history("/cart");pushUserToTop()}}>View Cart</button>
                </div>
              </div>
          </div>
    </div>
  )
}

export default CartDropdown