import { toast } from 'react-toastify';
import Cookies from "js-cookie"

export const useLogout = () => {

    const logout = (handleClose) => async (dispatch) => {
        dispatch({type: "LOGOUT"})
        dispatch({type: "GET_CART",payload: []})
        dispatch({type: "GET_ORDERS",payload: []})
        dispatch({type: "GET_ADDRESSES",payload: []})
        dispatch({type: "ORDER_AMOUNT",payload: 0})
        dispatch({type: "ORDER_DISCOUNT",payload: 0})
        dispatch({type: "APPLY_COUPON",payload: ""}) 
        Cookies.remove("token")
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        handleClose()
        toast.success("Logout",{autoClose: 1000})
    }

    return {logout}
}