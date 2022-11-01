import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useCreateOrder = () => {

    const history = useNavigate()
    const pushUserToTop = () =>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
      }  
    const createOrder = (order) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/order/create/${order.id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                paymentDetails: order.paymentDetails,
                orderItems: order.orderItems,
                address: order.address,
                orderDate: order.orderDate,
                orderDeliveryDate: order.orderDeliveryDate,
                paymentType: order.paymentType,
                items: order.items,
                amount: order.amount,
                discount: order.discount,
                payment: order.payment,
                isPaid: order.isPaid
            })
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        if(response.ok){
            pushUserToTop()
            toast.success("Order has been placed",{autoClose: 2500})
            dispatch({type: "UPDATE_ORDERS",payload: json.order.reverse()})
            dispatch({type: "CLEAR_CART",payload: json.cart})
            dispatch({type: "ORDER_AMOUNT",payload: 0})
            dispatch({type: "APPLY_COUPON",payload: ""})
            dispatch({type: "ORDER_DISCOUNT",payload: 0})
            dispatch({type: "ORDER_PAYMENT",payload: 0})
            localStorage.removeItem("amount")
            localStorage.removeItem("discount")
            localStorage.removeItem("couponId")
            localStorage.removeItem("payment")
            history("/orders")
        }
    }

    return { createOrder }
}