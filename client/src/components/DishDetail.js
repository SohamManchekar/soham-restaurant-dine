import React,{ useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import Item from "../components/Item"
import Review from './Review';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CartDropdown from "./CartDropdown"
import UpdateAddress from '../components/UpdateAddress'
import AddAddress from "../components/AddAddress"
import Backdrop from '@mui/material/Backdrop';
import {HiMinus,HiPlus} from "react-icons/hi"
import {toast} from "react-toastify";
import { useDishDetails } from '../redux/actions/Dishes/useDishDetails';
import { useAddToCart } from '../redux/actions/Cart/useAddToCart';
import {useSelectAddress} from "../redux/actions/address/useSelectAddress"
import {useDeleteAddress} from "../redux/actions/address/useDeleteAddress"
import {useOrderNow} from "../redux/actions/Order/useOrderNow"
import { useCreatePayment } from '../redux/actions/payment/useCreatePayment';
import { useRecommendedDishes } from '../redux/actions/Dishes/useRecommendedDishes';
import {IoMdArrowDropright} from "react-icons/io"
import {MdArrowBackIosNew,MdAdd,MdEditLocationAlt,MdDelete} from "react-icons/md"
import {AiOutlineClose} from "react-icons/ai"
import moment from "moment"
import swal from 'sweetalert'
import { CircularProgress } from '@mui/material';
import "./css/dishDetail.css"
import "../pages/css/orderConfirmation.css"



const DishDetail = () => {

  const dispatch = useDispatch()
  const {userReducer,orderReducer} = useSelector(state => state)
  const { addToCart } = useAddToCart()
  const { dishDetails } = useDishDetails()
  const { selectAddress } = useSelectAddress()
  const { deleteAddress } = useDeleteAddress()
  const { orderNow } = useOrderNow()
  const { createPayment } = useCreatePayment()
  const { recommendedDishes } = useRecommendedDishes()

  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const [cartDropDownOpen, setCartDropDownOpen] = useState(false)
  const [isOrderNow, setIsOrderNow] = useState(false)
  const [isPaymentSelected, setIsPaymentSelected] = useState(false)
  const [isAddAddress, setIsAddAddress] = useState(false)
  const [isEditAddress, setIsEditAddress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [updateAddress, setUpdateAddress] = useState({})
  const [paymentType, setPaymentType] = useState("Cash on delivery")

  let token = userReducer.token
  let user = userReducer.user
  let selectedAddress = userReducer.selectedAddress ? userReducer.selectedAddress.token ? `${userReducer.selectedAddress.buildingRoom}, ${userReducer.selectedAddress.societyApartment}, ${userReducer.selectedAddress.roadNearby}, ${userReducer.selectedAddress.town}, ${userReducer.selectedAddress.city} - ${userReducer.selectedAddress.pinCode}` : "No delivery address" : ""


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

    let dishData = {
        userId: user ? user.userId : "",
        dishId: dishDetails._id,
        title: dishDetails.title,
        Img: dishDetails.Img ? dishDetails.Img : "https://i.ibb.co/BHJyvvj/404-error-with-people-holding-the-numbers-rafiki.png",
        rating: dishDetails.rating,
        description: dishDetails.description,
        qty: quantity,
        price: dishDetails.price,
        totalPrice: dishDetails.price * quantity,
        time: dishDetails.time,
        type: dishDetails.type,
        category: dishDetails.category,
    }

    let orderNowData = {
        dishId: dishDetails._id,
        title: dishDetails.title,
        Img: dishDetails.Img ? dishDetails.Img : "https://i.ibb.co/BHJyvvj/404-error-with-people-holding-the-numbers-rafiki.png",
        rating: dishDetails.rating,
        description: dishDetails.description,
        qty: quantity,
        price: dishDetails.price,
        totalPrice: dishDetails.price * quantity,
        time: dishDetails.time,
        type: dishDetails.type,
        category: dishDetails.category,
    }

    // create order requirements
    let orderRequirements = {
      id: dishData.userId,
      paymentDetails: paymentType === "Cash on delivery" ? {} : "",
      orderItems: orderNowData,
      address: selectedAddress,
      orderDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
      orderDeliveryDate: moment().add(orderNowData.time + 8, "minutes").format('MMMM Do YYYY, h:mm:ss a'),
      paymentType: paymentType ? paymentType : "",
      items: 1,
      amount : orderNowData.totalPrice,
      discount: 0,
      payment: orderNowData.totalPrice,
      isPaid: paymentType === "Pay now" ? "Paid" : "Not paid"
  }

    // handle add to cart 
    const handleAddToCart = (dish) => {
        if(token){
            dispatch(addToCart(dish))
            setQuantity(1)
            setTimeout(() => {
              setCartDropDownOpen(true)
            },1000)
        }else{
            toast.error("Login First",{autoClose: 2000})
            setQuantity(1)
        }
    }

    // handle order now
    const handleOrderNow = (order) => {
      setIsLoading(true)
       if(token){
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
                          dispatch(orderNow(order))
                      }, 2100);
                  }
                  if(paymentType === "Pay now"){
                      dispatch({type: "ORDER_VIA_CART",payload: false})
                      toast.info("Payment section opening",{autoClose: 1000})
                      setTimeout(() => {
                          dispatch(createPayment(order))
                      }, 1000);
                      setTimeout(() => {
                          setIsLoading(false)
                      }, 2000);
                  }
                }
       }else{
            toast.error("Login first",{autoClose: 2000})
       }
    }

    // handle close cart-dropdown
    const handleCloseCartDropdown = () => {
      setCartDropDownOpen(false)
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

  const closeAddAddressSection = () => {setIsAddAddress(false)}
  const closeEditAddressSection = () => {setIsEditAddress(false)}

  return (
      <div className="dish-detail-page">

      {/* dish component  */}
        <div className="dish-detail-comp" key={dishDetails._id}>
          <div className="dish-detail-img">
            <img src={dishDetails.Img} alt={dishDetails.title} title={dishDetails.title} onError={(e) => (e.target.onerror = null, e.target.src = "https://i.ibb.co/BHJyvvj/404-error-with-people-holding-the-numbers-rafiki.png")} />
          </div>
          <div className="dish-details">
              <div className="dish-name">{dishDetails.title}</div>
              <div className="dish-rating">
                  <Rating size='inherit' name="half-rating-read" value={dishDetails.rating} precision={0.5} readOnly />
                  <p className='dish-rating-num'>{dishDetails.rating}</p>
              </div>
              <div className='dish-desc'>{dishDetails.description}</div>
              <div className="dish-price-time">
                  <input type="text" className='dish-price' value={`₹ ${dishDetails.price}`} readOnly/>
                  <div className="dish-time">
                    <img onClick={handleOpen} src="https://i.ibb.co/sJQ8f91/clock.png" alt="" />
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={`Time taken to Cook ${dishDetails.time} mins`} action={action} /> 
                    <p>{dishDetails.time} mins</p>
                  </div>
              </div>
              <div className="dish-qty">
                    <p className='dish-qty-label'>Qty</p>
                    <div className="dish-qty-inc-dec">
                       <button className='dish-in-de-btn' onClick={() => handleDecrement()}><HiMinus/></button>
                       <input type="text" className='dish-qty-inp' name="number" placeholder='Enter Qty' value={quantity} readOnly />
                       <button className='dish-in-de-btn' onClick={() => handleIncrement()}><HiPlus/></button>
                    </div>
              </div>
              <div className="dish-other-details">
                <div className="dish-tc">Type : {dishDetails.type}</div>
                <div className="dish-tc">Category : {dishDetails.category}</div>
              </div>
              <div className="dish-a-o-btn">
                <button className='dish-add-to-cart' onClick={() => handleAddToCart(dishData)} title={`Add ${dishDetails.title} to your Cart`}>Add To Cart</button> 
                <button className='dish-add-to-cart' onClick={() => {token ? setIsOrderNow(true) : toast.error("Login first",{autoClose:2000})}} style={{backgroundColor: "#333",color:"white"}} title={`Order ${dishDetails.title} Now`}>Order Now</button> 
                
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOrderNow}>
                  <div className="order-now-section">
                      <div className="order-now-comp">
                        <div className='order-now-comp-main'>
                          <div className="order-now-comp-t-c">
                            <h3 style={{fontFamily:"Poppins",padding:"0.2em 0.5em",color:"#ccc"}}>Order now</h3>
                            <button className='order-now-comp-close-btn' onClick={() => setIsOrderNow(false)}><AiOutlineClose/></button>
                          </div>
                          <div className="order-now-comp-dish-det">
                            <img src={dishData.Img} alt="" title={dishData.title} />
                            <h4 style={{fontFamily:"Poppins",fontWeight:"500",color:"#808080"}}>X</h4>
                            <h2 style={{fontFamily:"Poppins",fontWeight:"500",color:"black"}}>{dishData.qty}</h2>
                            <h3 style={{fontFamily:"Arial",padding:"0 0.2em",fontWeight:"500",color:"#1a1a1a"}}>Total : ₹{dishData.totalPrice}</h3>
                          </div>
                          <div className="order-now-comp-pay-type">
                            {
                              isPaymentSelected === true ? 
                                <>
                                <button className='order-now-comp-pay-type-btn' onClick={() => {setIsPaymentSelected(false);setPaymentType("Cash on delivery")}}><p>Cash on delivery</p></button>
                                <button className='order-now-comp-pay-type-btn' onClick={() => {setIsPaymentSelected(false);setPaymentType("Pay now")}}><p>Pay now</p></button>
                                </>
                              :
                                <button className='order-now-comp-pay-type-btn' onClick={() => setIsPaymentSelected(true)}><p>{paymentType}</p><IoMdArrowDropright/></button>
                            }
                          </div>
                          <div className="change-order-delivery-address-section">
                          <button style={{width:"70px",height:"30px",cursor:"pointer",backgroundColor:"black",color:"white",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"0.9em",fontFamily:"Poppins",fontWeight:"500",textAlign:"center",border:"none",borderRadius:"8px",margin:"0.3em 0.4em"}} onClick={() => {setIsAddAddress(false);setIsEditAddress(false)}}><MdArrowBackIosNew/> <p style={{paddingLeft:"0.2em"}}>back</p></button>
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
                                                                    <p className='update-order-delivery-address-text' title={data.token === userReducer.selectedAddress.token ? "Selected Address" : "Select Address"} onClick={() => {data.token === userReducer.selectedAddress.token ? toast.info("Address has been already selected",{autoClose: 2000}) : handleSelectAddress(dishData.userId,data)}}>{otherAddress.slice(0,50)}...</p>
                                                                    <button className='update-order-delivery-address-btn' title='Edit address' style={{color:"black"}} onClick={() => {setIsEditAddress(true);setUpdateAddress(data)}}><MdEditLocationAlt/></button>
                                                                    <button className='update-order-delivery-address-btn' title='Remove address' style={{color:"red"}} onClick={() => handleDeleteAddress(dishData.userId,data.token)}><MdDelete/></button>
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
                        </div>
                      </div>
                      <button className='order-now-comp-confirm-btn' style={{margin:"0.7em auto 0 auto"}} onClick={() => handleOrderNow(orderRequirements)}>{isLoading === true ? <CircularProgress/> : "Confirm Order"}</button>
                  </div>
                </Backdrop>
              </div>
          </div>
        </div>


      {/* reviews of dishes  */}
       <Review title={dishDetails.title} />


      {/* recommended dishes according to type and category */}
       <div className="dish-recommend-page">
          <div className="dish-recommend-text">Recommended Dishes</div>
          <div className="dish-recommend-comp">
            <ul>
              {
                recommendedDishes.map((item) => {
                    return <li key={item._id}><Item data={item} key={item._id} openCart={() => setCartDropDownOpen(true)} /></li>      
                })
              }
            </ul>
          </div>
       </div>

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={cartDropDownOpen}>
          <CartDropdown isOpen={handleCloseCartDropdown} />
        </Backdrop>
       
      </div>
  )
}

export default DishDetail