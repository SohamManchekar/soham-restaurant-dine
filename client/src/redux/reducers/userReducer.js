const initialState = {}

const userReducer = (state = initialState,action) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                selectedAddress: action.payload.selectedAddress
            }
        case "LOGOUT":
            return{
                ...state,
                token: null,
                user: null,
                selectedAddress: null
            }
        case "GET_SELECTED_ADDRESS":
            return{
                ...state,
                selectedAddress: action.payload
            }
        case "SET_DELIVERY_ADDRESS":
            return{
                ...state,
                selectedAddress: action.payload
            }

        default:
            return state;
    }
}

export default userReducer