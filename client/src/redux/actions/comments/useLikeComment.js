import { toast } from "react-toastify"

export const useLikeComment = () => {

    const likeComment = (data) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/comment/comLikes/${data.rev_id}/${data.com_id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                likeUserId : data.likeUserId,
                likeUserName : data.likeUserName,
                createdAt: data.createdAt
            })
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        dispatch({type: "UPDATE_REVIEW", payload: json.review})
    }

    return {likeComment}
}