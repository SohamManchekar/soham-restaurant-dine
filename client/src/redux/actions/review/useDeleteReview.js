import { toast } from "react-toastify"

export const useDeleteReview = () => {

    const deleteReview = (id) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/review/${id}`,{
            method: "DELETE",
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        dispatch({type: "DELETE_REVIEW", payload: id})
    }

    return {deleteReview}
}