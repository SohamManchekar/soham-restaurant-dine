import {toast} from "react-toastify"

export const useUpdateAddress = () => {

    const updateAddress = (id,address) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/address/update/${id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                buildingRoom: address.buildingRoom,
                societyApartment: address.societyApartment,
                roadNearby: address.roadNearby,
                town: address.town,
                city: address.city,
                pinCode: address.pinCode,
                token: address.token,
            })
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        if(response.ok){
            toast.success("Address updated",{autoClose: 2000})
            dispatch({type: "UPDATE_ADDRESSES",payload: json.address.reverse()})
            dispatch({type: "SET_DELIVERY_ADDRESS",payload: json.selectedAddress})
        }

    }

    return {updateAddress}
}