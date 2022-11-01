import { DeleteData } from "../actions/DeleteData"
import { UpdateData } from "../actions/UpdateData";

const initialState = {
    reviews: []
}

const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case "CREATE_REVIEW":
            return {
                ...state,
                reviews: [action.payload,...state.reviews]
            };
        case "GET_REVIEWS":
            return {
                ...state,
                reviews: action.payload
            };
        case "UPDATE_REVIEW":
            return {
                ...state,
                reviews: UpdateData(state.reviews, action.payload._id, action.payload)
            };
        case "DELETE_REVIEW":
            return {
                ...state,
                reviews: DeleteData(state.reviews, action.payload)
                };

            default:
                return state
    }
}

export default reviewReducer