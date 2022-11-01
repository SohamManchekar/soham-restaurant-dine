const initialState = {
    orders: [],
    addresses: [],
    amount: 0,
    discount: 0,
    payment: 0,
    couponId: "",
    orderViaCart: false
}

const orderReducer = (state = initialState,action) => {
    switch (action.type){
        case "ORDER_AMOUNT":
            return{
                ...state,
                amount: action.payload
            }
        case "APPLY_COUPON":
            return{
                ...state,
                couponId: action.payload
            }
        case "ORDER_DISCOUNT":
            return{
                ...state,
                discount: action.payload
            }
        case "ORDER_PAYMENT":
            return{
                ...state,
                payment: action.payload
            }
        case "ORDER_VIA_CART":
            return{
                ...state,
                orderViaCart: action.payload
            }
        case "GET_ORDERS":
            return{
                ...state,
                orders: action.payload
            }
        case "UPDATE_ORDERS":
            return{
                ...state,
                orders: action.payload
            }
        case "GET_ADDRESSES":
            return{
                ...state,
                addresses: action.payload
            }
        case "UPDATE_ADDRESSES":
            return{
                ...state,
                addresses: action.payload
            }
        default:
                return state
    }
}

export default orderReducer