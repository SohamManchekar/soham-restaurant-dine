import { useParams } from "react-router-dom"
import { toast } from "react-toastify"


export const useGetReview = () => {

    const {id} = useParams()

            const getReviewsByDishId = () => async (dispatch) => {
                const response = await fetch(`${process.env.REACT_APP_SERVER_API}/review/${id}`,{
                    method: "GET",
                })
                const json = await response.json()
                if(!response.ok){
                    toast.error(json.error,{autoClose: 2000})
                }
                if(response.ok){
                    if(json.reviews){
                        dispatch({type: "GET_REVIEWS", payload: json.reviews.reverse()})
                }
              }
           }
 

    return {getReviewsByDishId}
}