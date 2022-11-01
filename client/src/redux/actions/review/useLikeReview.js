import { toast } from "react-toastify"

export const useLikeReview = () => {

    const likeReview = (data) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/review/revLikes/${data.id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                likeUserId: data.likeUserId,
                likeUserName: data.likeUserName,
                createdAt: data.createdAt
            })
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        dispatch({type: "UPDATE_REVIEW", payload: json.review})
    }

    return {likeReview}
}