import { toast } from "react-toastify"

export const useAddComment = () => {

    const addComment = (commentOnReview) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/comment/${commentOnReview.rev_id}`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                commentUserName: commentOnReview.commentUserName,
                commentUserId: commentOnReview.commentUserId,
                comment: commentOnReview.comment,
                rev_userName: commentOnReview.rev_userName,
                createdAt: commentOnReview.createdAt
            })
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2500})
        }

        if(response.ok){
            dispatch({type:"UPDATE_REVIEW", payload: json.review})
            toast.success(json.message,{autoClose: 2000})
        }
    }

    return {addComment}
}