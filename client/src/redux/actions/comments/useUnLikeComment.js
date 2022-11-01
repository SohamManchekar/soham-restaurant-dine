import { toast } from "react-toastify"

export const useUnLikeComment = () => {

    const unLikeComment = (data) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/comment/comLikes/${data.rev_id}/${data.com_id}/${data.userId}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        dispatch({type: "UPDATE_REVIEW", payload: json.review})
    }

    return {unLikeComment}
}