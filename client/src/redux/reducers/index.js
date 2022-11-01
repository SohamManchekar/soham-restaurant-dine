import { combineReducers } from "redux"
import reviewReducer from "./reviewReducer"
import userReducer from "./userReducer"
import cartReducer from "./cartReducer"
import orderReducer from "./orderReducer"

export default combineReducers({
    userReducer,
    reviewReducer,
    cartReducer,
    orderReducer
})