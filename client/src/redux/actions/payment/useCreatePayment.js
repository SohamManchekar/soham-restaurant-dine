import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import {useVerifyPayment} from "./useVerifyPayment"

export const useCreatePayment = () => {

    const {userReducer} = useSelector(state => state)
    const { verifyPayment } = useVerifyPayment()
    let user = userReducer.user

    const createPayment = (order) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/payment/create`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                amount: Number(order.payment * 100)
            })
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        if(response.ok){
            const data = await json.order
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
                amount: data.amount, 
                currency: "INR",
                name: "Soham",
                description: "Soham Restaurant & Dine",
                image: "https://i.ibb.co/LkXS2vL/istockphoto-1268953650-612x612-removebg-preview.png",
                order_id: data.id, 
                handler: function (response){
                    dispatch(verifyPayment(response,order))
                },
                prefill: {
                    name: user ? user.name : "fake",
                    email: user ? user.email : "fake@gmail.com",
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#333"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open()
        }
    }

    return { createPayment }
}