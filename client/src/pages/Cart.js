import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link,useNavigate} from "react-router-dom"
import {FaShoppingCart} from "react-icons/fa"
import CartDish from "../components/CartDish"
import "./css/cart.css"
import { toast } from 'react-toastify'


const Cart = () => {

  const history = useNavigate()
  const dispatch = useDispatch()
  const {cartReducer,userReducer,orderReducer} = useSelector(state => state)
  const token = userReducer.token
  const [isLoading, setIsLoading] = useState(false)

   //* Total cart quantity
  const cartQty = cartReducer.cart.map((item) => { return item.qty })
  const qtyReducer = (accumulator,currentValue) => accumulator + currentValue
  const totalCartQty = cartQty.reduce(qtyReducer,0)

  //* Total cart price
  const cartAmount = cartReducer.cart.map((item) => { return item.totalPrice })
  const amountReducer = (accumulator,currentValue) => accumulator + currentValue
  const totalCartAmount = cartAmount.reduce(amountReducer,0)

  //* verify whether the discount has been applied or not 
  const confirmPayment = orderReducer.discount > 0 ? totalCartAmount - (totalCartAmount * orderReducer.discount) / 100 : totalCartAmount

  const pushUserToTop = () =>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  }

  const proceedToOrder = () => {
     pushUserToTop()
     if(token){
        dispatch({type: "ORDER_VIA_CART",payload: true})
        if(cartReducer.cart.length !== 0){
            localStorage.setItem("amount",Number(totalCartAmount))
            localStorage.setItem("payment",Number(totalCartAmount))
            dispatch({type: "ORDER_AMOUNT",payload: Number(totalCartAmount)})
            dispatch({type: "ORDER_PAYMENT",payload: Number(confirmPayment)})
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                history("/orderConfirm")
            }, 1500);
        }
        else{
          toast.error("Your cart is empty",{autoClose: 2000})
        }
     }else{
        toast.error("Login first",{autoClose: 2000})
     }
  }

  useEffect(() => {
    if(!token){
        return history("/")
    }
    history("/cart")
},[token,history])

  return (
    <div className="cart-page">
        <div className="cart-header">
            {
              token ?
                <>
                  <div className="cart-text"><FaShoppingCart/><p style={{paddingLeft: "0.5em"}}>{cartQty.length <= 0 ? "Your Cart is empty" : `Items in Your Cart : ${cartQty.length}`}</p></div>
                  <Link to="/orders" style={{textDecoration:"none"}}><button className='your-ord-btn'>Your Orders</button></Link>
                </>
                :
                <button className='sign-in-btn' onClick={() => history("/login")}>Login</button>
            }
        </div>

        <div className="cart-comp">
          <div className="cart-dish-display">
            <ul className='cart-dish-display-ul'>
              {
                token ? 
                  cartReducer.cart.length !== 0 ?
                      cartReducer.cart.map((dish) => {
                          return <li className='cart-dish-display-ul-li' key={dish.dishId}><CartDish dish={dish} key={dish.dishId}/></li>                
                      })
                      :
                      <div className="cart-dish-display-empty">
                        <img src="https://img.icons8.com/external-nawicon-outline-color-nawicon/344/external-cloche-food-delivery-nawicon-outline-color-nawicon.png" alt="" style={{width: "250px",height:"250px"}} />
                        <h1 style={{fontFamily:"Poppins",color:"white"}}>Order Now !</h1>
                      </div>
                  :
                  null
              }
            </ul>
          </div>

          <div className="cart-checkout-comp">
              <div className="cart-checkout-text">Summary</div>
              <p style={{width:"100%",height:"auto",textAlign:"left",fontSize:"0.7em",fontFamily:"Poppins",fontWeight:"400",paddingLeft:"1em"}}>{cartQty.length <= 0 ? null : totalCartAmount >= 200 ? "(No Delivery charges above 200)*" : "(Delivery charges ₹25)*"}</p>
              <div className="cart-checkout-items-total-display">
                 <div className="items-total-display">
                    <div className="items-total">SubItems</div>
                    <div className="items-total">{totalCartQty}</div>
                 </div>
                 <div className="items-total-display">
                    <div className="items-total">SubTotal</div>
                    <div className="items-total">₹{totalCartAmount}</div>
                 </div>
                 <div className="items-total-display">
                    <div className="items-total">Delivery Charges</div>
                    <div className="items-total">₹{cartQty.length <= 0 ? 0 : totalCartAmount >= 200 ? 0 : 25}</div>
                 </div>
              </div>
              <div className="cart-checkout-total">
                    <div className="items-total">Total</div>
                    <div className="items-total">₹{cartQty.length <= 0 ? 0 : totalCartAmount >= 200 ? totalCartAmount : totalCartAmount + 25}</div>
              </div>
              {
                token ? 
                <button className='proceed-to-checkout-btn' disabled={cartQty.length <= 0} onClick={() => proceedToOrder()}>
                  <img src="https://img.icons8.com/external-victoruler-flat-gradient-victoruler/2x/external-online-order-food-and-delivery-victoruler-flat-gradient-victoruler.png" alt="" />
                  <p>{isLoading === true ? "Proceeding..." : "Proceed Order"}</p>
                </button>
                :
                <button className='proceed-to-checkout-btn' disabled={cartQty.length <= 0} onClick={() => history("/login")}>
                  <p>Sign in</p>
                </button>
              }        
          </div>
        </div>
    </div>
  )
}

export default Cart