import {toast} from "react-toastify"

export const useDeleteFromCart = () => {

    const deleteFromCart = (userId,dishId) => async (dispatch) => {

        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/cart/delete/${userId}/${dishId}`,{
            method: "PUT"
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        if(response.ok){
            dispatch({type: "DELETE_FROM_CART",payload: dishId})
        }
    }

    return {deleteFromCart}
}