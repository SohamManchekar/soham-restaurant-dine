import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import {useOrderNow} from "../Order/useOrderNow"
import {useCreateOrder} from "../Order/useCreateOrder"

export const useVerifyPayment = () => {

    const {orderReducer} = useSelector(state => state)
    const { orderNow } = useOrderNow()
    const { createOrder } = useCreateOrder()

    const verifyPayment = (verify,order) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/payment/paymentVerify`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                razorpay_payment_id: verify.razorpay_payment_id,
                razorpay_order_id: verify.razorpay_order_id,
                razorpay_signature: verify.razorpay_signature,
            })
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        if(response.ok){
           order.paymentDetails = verify
           if(orderReducer.orderViaCart === true){
                dispatch(createOrder(order))
           }else{
                dispatch(orderNow(order))
           }
        }
    }

    return { verifyPayment }
}