import {toast} from "react-toastify"

export const useUnLikeReview = () => {

    const unLikeReview = (rev_id,likeUser_id) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/review/revLikes/${rev_id}/${likeUser_id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        dispatch({type: "UPDATE_REVIEW", payload: json.review})
    }

    return {unLikeReview}
}