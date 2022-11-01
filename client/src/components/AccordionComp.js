import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {useCancelOrder} from "../redux/actions/Order/useCancelOrder"
import OrderComp from './OrderComp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Bill from './Bill';
import swal from 'sweetalert';
import moment from "moment"
import { toast } from 'react-toastify';
import "./css/accordionComp.css"


const AccordionComp = ({order}) => {

    const dispatch = useDispatch()
    const { cancelOrder } = useCancelOrder()
    const {userReducer} = useSelector(state => state)
    let user = userReducer.user
    let token = userReducer.token
    let userId = user ? user.userId : ""


    const handleCancelOrder = (id) => {
        if(token){
            swal({ title: "Cancel Order", text: `Do you want to cancel your order: #${id} ? 100% cancellation fee will be applicable.`, icon: "https://img.icons8.com/fluency/2x/take-away-food.png", buttons: true,dangerMode: true,})
            .then((willDelete) => {
                if (willDelete) {
                     dispatch(cancelOrder(userId,id))
                    swal(`Order: #${id} has been cancelled`, { icon: "success",})
                }
            });    
        }else{
            toast.error("Login First",{autoClose: 2000})
        }
    }


    let currentDateTime = moment().format("MMMM Do YYYY, h:mm:ss a")
    let convertCurrentDateTimeIntoMilliseconds = moment(currentDateTime,"MMMM Do YYYY, h:mm:ss a").valueOf()
    let convertOrderDeliveryDateTimeIntoMilliseconds = moment(order.orderDeliveryDate,"MMMM Do YYYY, h:mm:ss a").valueOf()


  return (
    <div className="placed-order-comp" key={order._id}>
        <Accordion key={order._id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <div className="placed-order-comp-head">
                    <p className='placed-order-comp-head-order-id' title={`Order ID : ${order._id}`}>OrderID : #{order._id.slice(0,12)}...</p>
                    {
                         convertOrderDeliveryDateTimeIntoMilliseconds <= convertCurrentDateTimeIntoMilliseconds ? 
                            <p className='placed-order-comp-head-ispaid' style={{color:"#00ff00"}}>Paid</p>
                            :
                                order.isPaid === "Paid" ?
                                <p className='placed-order-comp-head-ispaid' style={{color:"#00ff00"}}>{order.isPaid}</p>
                                :
                                <p className='placed-order-comp-head-ispaid' style={{color:"#ff0000"}}>{order.isPaid}</p>
                    }
                </div>
                {
                        convertOrderDeliveryDateTimeIntoMilliseconds <= convertCurrentDateTimeIntoMilliseconds ? 
                        <p className='placed-order-comp-head-isDelivered' style={{color:"#00ff00"}}>Delivered</p>
                        :
                        <p className='placed-order-comp-head-isDelivered' style={{color:"#ff0000"}}>Not delivered</p>
                }
            </AccordionSummary>
            <AccordionDetails>
                <div className="placed-order-comp-main">
                    <div className="place-order-comp-main-head">Your items {order.orderItems.length}</div>
                    <div className="placed-order-comp-main-items">
                        <ul className='placed-order-comp-main-items-ul'>
                           {
                                order.orderItems.map((item) => {
                                    return  <li className='placed-order-comp-main-items-ul-li' key={item.dishId}>
                                                <OrderComp item={item} key={item.dishId} />
                                            </li>
                                })
                           }
                        </ul>
                    </div>
                    <Bill amount={order.amount} payment={order.payment} discount={order.discount} items={order.orderItems.length} orderDate={order.orderDate} paymentType={order.paymentType} key={order._id} />
                    <div className="placed-order-cancellation-comp">
                        {
                            convertOrderDeliveryDateTimeIntoMilliseconds <= convertCurrentDateTimeIntoMilliseconds ? 
                                <>
                                    <h5 style={{fontFamily:"Poppins",fontWeight:"500",color:"black"}}>Your order has been delivered, Enjoy the TASTE....</h5>
                                    <h3 style={{fontFamily:"Poppins",fontWeight:"500",color:"black"}}>Thank you !</h3>
                                </>
                            :
                                <>
                                    <p className='placed-order-cancellation-comp-can-text'>Your order will be delivered till {order.orderDeliveryDate}</p>
                                    <p style={{fontSize:"0.7em",color:"#808080"}} className='placed-order-cancellation-comp-can-text'>100% cancellation fee will be applicable if you decide to cancel the order anytime after order placement.</p>
                                    <button className='place-order-can-btn' onClick={() => handleCancelOrder(order._id)}>Cancel</button>
                                </>
                        }
                        
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    </div>  
  )
}

export default AccordionComp