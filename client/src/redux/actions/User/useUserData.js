import { toast } from "react-toastify"

export const useUserData = () => {

    const userData = (id) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/user/${id}`,{
            method: "GET"
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }
        if(response.ok){
            dispatch({type: "GET_CART",payload: json.cart})
            dispatch({type: "GET_ADDRESSES",payload: json.addresses.reverse()})
            dispatch({type: "GET_ORDERS",payload: json.orders.reverse()})
            dispatch({type: "GET_SELECTED_ADDRESS",payload: json.selectedAddress})
        }
    }

    return { userData }
}