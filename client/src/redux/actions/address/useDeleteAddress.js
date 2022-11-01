import { toast } from "react-toastify"

export const useDeleteAddress = () => {

    const deleteAddress = (id,token) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/address/remove/${id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
               token: token
            })
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        if(response.ok){
            dispatch({type: "UPDATE_ADDRESSES",payload: json.address.reverse()})
            dispatch({type: "SET_DELIVERY_ADDRESS",payload: json.selectedAddress})
        }
    }

    return {deleteAddress}
}