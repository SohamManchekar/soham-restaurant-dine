import {useSelector} from "react-redux"
import { toast } from "react-toastify"

export const useAddToCart = () => {

    const {cartReducer} = useSelector(state => state)
    
    const addToCart = (dish) => async (dispatch) => {

        const existingDish = cartReducer.cart.find(i => i.dishId === dish.dishId)
        if(existingDish){
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/cart/addToCart/${dish.userId}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                  dishId: dish.dishId,
                  qty: existingDish.qty + dish.qty,
                  totalPrice: existingDish.totalPrice + dish.totalPrice,
              })
            })

            const json = await response.json()

            if(!response.ok){
                toast.error(json.error,{autoClose: 2000})
            }

            if(response.ok){
                dispatch({type: "ADD_TO_CART",payload: json.dish})
                toast.success("Dish added successfully",{autoClose: 2000})
            }
            
        }else{
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/cart/addToCart/${dish.userId}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                  dishId: dish.dishId,
                  title: dish.title,
                  Img: dish.Img,
                  rating: dish.rating,
                  description: dish.description,
                  qty: dish.qty,
                  price: dish.price,
                  totalPrice: dish.totalPrice,
                  time: dish.time,
                  type: dish.type,
                  category: dish.category,
              })
            })

            const json = await response.json()

            if(!response.ok){
                toast.error(json.error,{autoClose: 2000})
            }

            if(response.ok){
                dispatch({type: "ADD_TO_CART",payload: json.dish})
                toast.success("Dish added successfully",{autoClose: 2000})
            }
        }
    }

    return {addToCart}
}


