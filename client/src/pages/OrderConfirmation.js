import React,{useEffect, useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {useDeleteAddress} from "../redux/actions/address/useDeleteAddress"
import {useSelectAddress} from "../redux/actions/address/useSelectAddress"
import {useCreateOrder} from "../redux/actions/Order/useCreateOrder"
import {useCreatePayment} from "../redux/actions/payment/useCreatePayment"
import OrderConfirmationDishComp from "../components/OrderConfirmationDishComp"
import AddAddress from "../components/AddAddress"
import Backdrop from '@mui/material/Backdrop';
import {toast} from "react-toastify"
import {IoIosArrowForward,IoIosArrowDown,IoMdArrowDropright} from "react-icons/io"
import {MdArrowBackIosNew,MdAdd,MdEditLocationAlt,MdDelete} from "react-icons/md"
import UpdateAddress from '../components/UpdateAddress'
import Coupon from '../components/Coupon'
import { CouponData } from "../Data/CouponData"
import moment from "moment"
import swal from 'sweetalert'
import { CircularProgress } from '@mui/material'
import "./css/orderConfirmation.css"



const OrderConfirmation = () => {

    const history = useNavigate()
    const dispatch = useDispatch()
    const {cartReducer,userReducer,orderReducer} = useSelector(state => state)
    const { deleteAddress } = useDeleteAddress()
    const { selectAddress } = useSelectAddress()
    const { createOrder } = useCreateOrder()
    const { createPayment } = useCreatePayment()

    const [isUserDetailsView, setIsUserDetailsView] = useState(false)
    const [isCouponsSectionOpen, setIsCouponsSectionOpen] = useState(false)
    const [isPolicyOpen, setIsPolicyOpen] = useState(false)
    const [isChangeAddress, setIsChangeAddress] = useState(false)
    const [isAddAddress, setIsAddAddress] = useState(false)
    const [isEditAddress, setIsEditAddress] = useState(false)
    const [isSelectPayType, setIsSelectPayType] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [paymentType, setPaymentType] = useState("Cash on delivery")
    const [updateAddress, setUpdateAddress] = useState({})

    let user = userReducer.user 
    let token = userReducer.token 
    let userId = user ? user.userId : ""
    let selectedAddress = userReducer.selectedAddress ? userReducer.selectedAddress.token ? `${userReducer.selectedAddress.buildingRoom}, ${userReducer.selectedAddress.societyApartment}, ${userReducer.selectedAddress.roadNearby}, ${userReducer.selectedAddress.town}, ${userReducer.selectedAddress.city} - ${userReducer.selectedAddress.pinCode}` : "No delivery address" : ""

    //* Time to deliver
    const timeArray = cartReducer.cart.map((item) => { return item.time })
    const deliveryTime = Math.max(...timeArray) + 8

    //* Total cart quantity
    const cartQty = cartReducer.cart.map((item) => { return item.qty })

    const pushUserToTop = () =>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
      }

    // handle edit of the cart items
    const handleEdit = () => {
        if(token){
            toast.info("Changes can be done via Cart",{autoClose: 3000})
            setTimeout(() => history("/cart"),1000)
        }else{
            toast.error("Login first",{autoClose: 1500})
        }
    }
    
    // delete address from the user address list
    const handleDeleteAddress = (id,t) => {
       if(token){
        swal({ title: "Remove Address", text: "Do you want to remove Address ?", icon: "https://img.icons8.com/external-nawicon-outline-color-nawicon/2x/external-route-food-delivery-nawicon-outline-color-nawicon.png", buttons: true,dangerMode: true,})
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteAddress(id,t))
                    swal("Address removed successfully", { icon: "success",})
                }
            });
       }else{
            toast.error("Login first",{autoClose: 2000})
       }
    }

    // select the delivery address from the user address list
    const handleSelectAddress = (id,address) => {
        if(token){
            swal({title: "Select Address",text:"Do you want to select this address as delivery address.",icon:"https://img.icons8.com/external-nawicon-outline-color-nawicon/2x/external-route-food-delivery-nawicon-outline-color-nawicon.png", buttons: true, dangerMode: false})
            .then((apply) => {
                if (apply) {
                    dispatch(selectAddress(id,address))
                    swal("Address Selected", { icon: "success",})
                }
            });
        }else{
            toast.error("Login first",{autoClose: 2000})
        }
    }

    // create order requirements
    let orderRequirements = {
        id: user ? user.userId : "",
        paymentDetails: paymentType === "Cash on delivery" ? {} : "",
        orderItems: cartReducer.cart ? cartReducer.cart : [],
        address: selectedAddress,
        orderDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
        orderDeliveryDate: moment().add(deliveryTime, "minutes").format('MMMM Do YYYY, h:mm:ss a'),
        paymentType: paymentType ? paymentType : "",
        items: cartQty.length ? cartQty.length : 0,
        amount : orderReducer.amount,
        discount: orderReducer.discount,
        payment: orderReducer.payment,
        isPaid: paymentType === "Pay now" ? "Paid" : "Not paid"
    }

    // handle place order
    const handlePlaceOrder = (order) => {
       setIsLoading(true)
       if(token){
            if(cartReducer.cart.length !== 0){
                if(selectedAddress === "No delivery address"){
                        setTimeout(() => {
                            toast.info("Add/Select delivery address",{autoClose: 2000})
                            setIsLoading(false)
                        }, 1000);
                    }else{
                        if(paymentType === "Cash on delivery"){
                            setTimeout(() => {
                                setIsLoading(false)
                            }, 2000);
                            setTimeout(() => {
                                pushUserToTop()
                                dispatch(createOrder(order))
                            }, 2100);
                        }
                        if(paymentType === "Pay now"){
                            toast.info("Payment section opening",{autoClose: 1000})
                            setTimeout(() => {
                                pushUserToTop()
                                dispatch(createPayment(order))
                            }, 1000);
                            setTimeout(() => {
                                setIsLoading(false)
                            }, 2000);
                        }
                }
            }else{
                toast.error("Your cart is empty",{autoClose: 2000})
            }
       }else{
            toast.error("Login first",{autoClose: 2000})
       }
    }

    const closeAddAddressSection = () => {setIsAddAddress(false)}
    const closeEditAddressSection = () => {setIsEditAddress(false)}

    // user is not logged in then redirect user to home page
    useEffect(() => {
        if(!token){
            return history("/")
        }
        history("/orderConfirm")
    },[token,history])

  return (
    <div className='order-confirmation-page'>

        <div className="your-order-section">
            <div className="your-order-head"><p className="your-order-head-text">Your Order Summary </p><button className='your-order-edit-btn' title='Changes can be done via Cart' onClick={() => handleEdit()}>Edit</button></div>
            <div className="your-order-display">
                <ul className="your-order-display-ul">
                    {
                        user ? 
                            <>
                                {
                                    cartReducer.cart && cartReducer.cart.map((dish) => {
                                        return  <li className="your-order-display-ul-li" key={dish._id}><OrderConfirmationDishComp key={dish._id} data={dish} /></li>
                                    })
                                }
                            </>
                        :
                            <h1 style={{fontFamily:"Poppins",color:"white"}}>Sign in</h1>
                    }              
                </ul>
            </div>
        </div>

        <div className="your-details-comp">
          <div className="your-details-head">
            <div className="your-details-l">
                <div className="your-details-head-text">Your details</div>
                <div className="your-details-lower-text">{user ? user.name : "Sign in"}</div>
            </div>
            {
                isUserDetailsView === true ? 
                    <button className="your-details-r" onClick={() => setIsUserDetailsView(false)}><IoIosArrowDown/></button>
                :
                    <button className="your-details-r" onClick={() => setIsUserDetailsView(true)}><IoIosArrowForward/></button>
            }
          </div>
          {
             user ? 
                isUserDetailsView === true ? 
                    <div className="your-details-lower">
                        <p>Name : {user.name}</p>
                        <p>Email : {user.email}</p>
                        <p>Address : {selectedAddress.slice(0,60)}...</p>
                        <p>Orders : {orderReducer.orders.length}</p>
                    </div>
                :
                    null
            :
                null
          }
        </div>

        <div className="coupons-section">
            <div className="coupons-head">
                <div className="coupons-head-text">
                    <img src="https://img.icons8.com/color/2x/discount.png" alt="" />
                    <h4 style={{fontFamily:"Poppins",padding:"0 0.2em",color:"#333"}}>Use coupons</h4>
                </div>
                {
                    isCouponsSectionOpen === true ? 
                    <button className="your-details-r" onClick={() => setIsCouponsSectionOpen(false)}><IoIosArrowDown/></button>
                    :
                    <button className="your-details-r" onClick={() => setIsCouponsSectionOpen(true)}><IoIosArrowForward/></button>
                }
            </div>
            {
               user ? 
                    isCouponsSectionOpen === true ?
                        <div className="coupons-comp">
                            <p className='coupons-comp-disc-head'>Get Upto <b style={{color:"white"}}>40% off</b> on large orders (UnLimited discounts)</p>
                                <div className="coupons-comp-common-list">
                                    <ul> 
                                        {
                                            CouponData && CouponData.map((data) => {
                                                return <li key={data.id}><Coupon data={data} key={data.id} /></li>
                                            })
                                        }
                                    </ul>
                                </div>
                        </div>
                    :
                        null
                :
                    null
            }
        </div>

        <div className="cancellation-policy">
            <div className="cancellation-policy-head-text">
                <p>Cancellation Policy</p> 
                {
                    isPolicyOpen === true ? 
                        <button className="your-details-r" onClick={() => setIsPolicyOpen(false)}><IoIosArrowDown/></button>
                    :
                        <button className="your-details-r" onClick={() => setIsPolicyOpen(true)}><IoIosArrowForward/></button>
                }
            </div>
                {
                    isPolicyOpen === true ? 
                        <div className="cancellation-policy-description">100% cancellation fee will be applicable if you decide to cancel the order anytime after order placement.Avoid cancellation as it leads to food wastage</div>
                    :
                        null
                }
        </div>

        <div className="order-confirmation-comp">
            <div className="change-order-address-section">
                <div className="location-img"><img src="https://img.icons8.com/external-nawicon-outline-color-nawicon/72/external-location-food-delivery-nawicon-outline-color-nawicon.png" alt="" /></div>
                <div className="order-addresses">
                    <p className='order-addresses-head-text' style={{color:"#ccc"}}>Delivery at <b style={{color:"white"}}>Home</b></p>
                    <p className='order-addresses-default-address'>{selectedAddress.slice(0,60)}...</p>
                </div>
                {
                    user ? 
                        orderReducer.addresses.length !== 0 ?
                            selectedAddress === "No delivery address" ? 
                                <button className="change-order-delivery-address-btn" onClick={() => setIsChangeAddress(true)}>SELECT</button>
                            :
                                <button className="change-order-delivery-address-btn" onClick={() => setIsChangeAddress(true)}>CHANGE</button>
                        :
                            <button className="change-order-delivery-address-btn" onClick={() => {setIsChangeAddress(true);setIsAddAddress(true)}}>ADD</button>
                    :
                        <button className="change-order-delivery-address-btn" onClick={() => history('/login')}>Sign in</button>
                }
            </div>
            <div className="order-delivery-time-comp">
                <div className="delivery-time-img"><img src="https://i.ibb.co/sJQ8f91/clock.png" alt="" /></div>
                <div className="order-delivery-time" style={{color:"#ccc"}}>Delivery in <b style={{color:"white"}}>{user ? deliveryTime : 0} mins</b></div>
            </div>
            <div style={{width:"100%",height:"35px",display:"flex",flexDirection:"row",alignItems:"center"}}><img style={{width:"25px",height:"25px",margin:"0 0.2em"}} src="https://img.icons8.com/external-fauzidea-flat-fauzidea/2x/external-payment-e-commerce-fauzidea-flat-fauzidea.png" alt="" /><p style={{fontSize:"0.9em",fontFamily:"Poppins",fontWeight:"500",color:"white",padding:"0 0.2em"}}>Payment Type</p> </div>
            <div className="order-confirmation-payment-comp">
                {
                    isSelectPayType === true ? 
                        <div className="select-payment-type-section">
                            <span onClick={() => {setIsSelectPayType(false);setPaymentType("Cash on delivery")}}>Cash on delivery</span>
                            <span onClick={() => {setIsSelectPayType(false);setPaymentType("Pay now")}}>Pay now</span>
                        </div>
                    :
                        <button className='order-confirmation-payment-type-btn' onClick={() => {setIsSelectPayType(true)}}><p>{paymentType}</p><IoMdArrowDropright/></button>
                } 
                {
                    user ? 
                        <button className='order-confirmation-place-order-btn' onClick={() => handlePlaceOrder(orderRequirements)}>
                            <div className="order-confirmation-t-p">
                                <div className="order-confirmation-p"><p style={{fontFamily:"Arial"}}>₹</p> <p style={{fontFamily:"Poppins"}}>{orderReducer.payment}</p></div>
                                <p className="order-confirmation-t">Total</p>
                            </div>
                            <div className='order-confirmation-p-o'>{isLoading === true ? <CircularProgress/> : <><p>Place Order</p><IoMdArrowDropright/></>}</div>
                        </button>
                    :
                        <button className='order-confirmation-place-order-btn' onClick={() => history("/login")}>
                            <p style={{width:"100%",height:"100%",fontSize:"1.3em",fontFamily:"Poppins",fontWeight:"500",textAlign:"center",paddingTop:"0.5em"}}>Sign in</p>
                        </button>
                }                 
            </div>
        </div>

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isChangeAddress}>
            <div className="change-order-delivery-address-section">
                {
                    isEditAddress === true ?
                        <button style={{width:"70px",height:"30px",cursor:"pointer",backgroundColor:"black",color:"white",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"0.9em",fontFamily:"Poppins",fontWeight:"500",textAlign:"center",border:"none",borderRadius:"8px",margin:"0.3em 0.4em"}} onClick={() => setIsEditAddress(false)}><MdArrowBackIosNew/> <p style={{paddingLeft:"0.2em"}}>back</p></button>
                    :
                        isAddAddress === true ? 
                            <button style={{width:"70px",height:"30px",cursor:"pointer",backgroundColor:"black",color:"white",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"0.9em",fontFamily:"Poppins",fontWeight:"500",textAlign:"center",border:"none",borderRadius:"8px",margin:"0.3em 0.4em"}} onClick={() => setIsAddAddress(false)}><MdArrowBackIosNew/> <p style={{paddingLeft:"0.2em"}}>back</p></button>
                            :
                            <button style={{width:"70px",height:"30px",cursor:"pointer",backgroundColor:"black",color:"white",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"0.9em",fontFamily:"Poppins",fontWeight:"500",textAlign:"center",border:"none",borderRadius:"8px",margin:"0.3em 0.4em"}} onClick={() => setIsChangeAddress(false)}><MdArrowBackIosNew/> <p style={{paddingLeft:"0.2em"}}>back</p></button>
                }
                <button className="change-order-delivery-address-add-btn" onClick={() => {setIsAddAddress(true);setIsEditAddress(false)}}>
                    <MdAdd style={{fontSize:"1.3em"}} />
                    <p style={{padding:"0 0.5em"}}>ADD ADDRESS</p>
                </button>
                <div className="all-order-delivery-address">
                    {
                        isEditAddress === true ? 
                            <UpdateAddress isClose={closeEditAddressSection} address={updateAddress} />
                        :
                            isAddAddress === true ? 
                                <AddAddress isClose={closeAddAddressSection} />
                            :
                                <ul>
                                    {
                                        orderReducer.addresses.length !== 0 ? 
                                            orderReducer.addresses && orderReducer.addresses.map((data) => {
                                                let otherAddress = `${data.buildingRoom}, ${data.societyApartment}, ${data.roadNearby}, ${data.town}, ${data.city} - ${data.pinCode}`
                                                return ( 
                                                        <li key={data._id}>
                                                            <div className="update-order-delivery-address" key={data._id}>
                                                                {
                                                                    data.token === userReducer.selectedAddress.token ? 
                                                                        <img src="https://img.icons8.com/external-those-icons-flat-those-icons/2x/external-Check-interface-those-icons-flat-those-icons-2.png" style={{cursor:"pointer"}} title='Selected' alt="" />
                                                                    :
                                                                        <img src="https://img.icons8.com/external-nawicon-outline-color-nawicon/2x/external-route-food-delivery-nawicon-outline-color-nawicon.png" title='Select' alt="" />
                                                                }
                                                                <p className='update-order-delivery-address-text' title={data.token === userReducer.selectedAddress.token ? "Selected Address" : "Select Address"} onClick={() => data.token === userReducer.selectedAddress.token ? toast.info("Address has been already selected",{autoClose: 2000}) : handleSelectAddress(userId,data)}>{otherAddress.slice(0,50)}...</p>
                                                                <button className='update-order-delivery-address-btn' title='Edit address' style={{color:"black"}} onClick={() => {setIsEditAddress(true);setUpdateAddress(data)}}><MdEditLocationAlt/></button>
                                                                <button className='update-order-delivery-address-btn' title='Remove address' style={{color:"red"}} onClick={() => handleDeleteAddress(userId,data.token)}><MdDelete/></button>
                                                            </div>
                                                        </li>
                                                        )
                                            })
                                        :
                                            <p style={{fontFamily:"Poppins",fontWeight:"500",textAlign:"center",padding:"0.5em 0",color:"#808080"}}>No list of Addresses</p>
                                    }
                                   
                                </ul>
                    }
                </div>
            </div>
        </Backdrop>

    </div>

  )
}

export default OrderConfirmation