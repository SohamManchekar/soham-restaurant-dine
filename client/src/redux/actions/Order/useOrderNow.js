import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useOrderNow = () => {

    const history = useNavigate()
    const pushUserToTop = () =>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
      }  
    const orderNow = (order) => async (dispatch) => {
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
                history("/orders")
            }
        }

    return {orderNow}
}