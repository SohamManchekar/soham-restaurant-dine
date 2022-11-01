import { toast } from "react-toastify"

export const useCancelOrder = () => {

    const cancelOrder = (u_id,o_id) => async(dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/order/cancel/${u_id}/${o_id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        if(response.ok){
            dispatch({type: "UPDATE_ORDERS",payload: json.order})
        }
    }

    return { cancelOrder }
}