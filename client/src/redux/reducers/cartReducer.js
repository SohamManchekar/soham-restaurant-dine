const initialState = {
    cart: [],
}

const cartReducer = (state = initialState,action) =>{
    switch(action.type){
        case "ADD_TO_CART":
            const Dish = action.payload

            // ? Check if dish exists or not if it exists it will replace with new data of existing dish else it will add new dish to the cart
            const isDishExist = state.cart.find((i) => i.dishId === Dish.dishId)
            if(isDishExist){
                return {
                    ...state,
                    cart: state.cart.map((i) => 
                        i.dishId === isDishExist.dishId ? Dish : i
                    )
                }
            }else{
                return{
                    ...state,
                    cart: [...state.cart, Dish],
                }
            }

        case "GET_CART":
            return{
                ...state,
                cart: action.payload
            }
        case "CLEAR_CART":
            return{
                ...state,
                cart: action.payload
            }
        case "DELETE_FROM_CART":
            return{
                ...state,
                cart: state.cart.filter((dish) => dish.dishId !== action.payload)
            }

        case "UPDATE_QUANTITY":
            const updateDish = state.cart.find((i) => i.dishId === action.payload.dishId)
            if(updateDish){
                return {
                    ...state,
                    cart: state.cart.map((i) => 
                        i.dishId === updateDish.dishId ? action.payload : i
                    )
                }
            }

            break;
        default:
            return state
    }
}

export default cartReducer