import {toast} from "react-toastify"

export const useDeleteComment = () => {

    const deleteComment = (review,rev_id,com_id) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/comment/${rev_id}/${com_id}`,{
            method: "PUT"
        })

        const json = response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        if(response.ok){
            const newReview = {
                ...review,
                comments: review.comments.filter(elem => elem._id !== com_id)
            }
            dispatch({type:"UPDATE_REVIEW", payload: newReview})
        }
    }

    return {deleteComment}
}