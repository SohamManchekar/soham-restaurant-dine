import { toast } from "react-toastify"


export const useAddReview = () => {

    const addReview = (reviewData) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/review/${reviewData.userId}`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                dishId: reviewData.dishId,
                review: reviewData.review,
                reviewType: reviewData.reviewType,
                rating: reviewData.rating,
                userName: reviewData.userName,
            })
         })

         const json = await response.json()

         if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
         }

         if(response.ok){
            dispatch({type: "CREATE_REVIEW", payload: json.review})
            toast.success(json.message,{autoClose: 1500})
         }
    }

    return {addReview}
}