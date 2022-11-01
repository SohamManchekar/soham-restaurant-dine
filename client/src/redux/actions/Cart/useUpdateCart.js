import {useSelector} from "react-redux"
import { toast } from "react-toastify"


export const useUpdateCart = () => {

    const {cartReducer} = useSelector(state => state)

    const updateQuantity = (id,qty,userId) => async (dispatch) => {
        const dish = cartReducer.cart.find(i => i.dishId === id)
        if(dish){
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/cart/update/${userId}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    dishId: id,
                    qty: qty,
                    totalPrice: dish.price * qty
                })
            })

            const json = await response.json()

            if(!response.ok){
                toast.error(json.error,{autoClose: 2000})
            }

            if(response.ok){
                dispatch({type: "UPDATE_QUANTITY",payload: json.dish})
                toast.success("Quantity updated successfully",{autoClose: 2000})
            }
        } 
    }

    return {updateQuantity}
}