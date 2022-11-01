import { toast } from "react-toastify"

export const useSelectAddress = () => {

    const selectAddress = (id,address) => async (dispatch) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/address/change/${id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                buildingRoom: address.buildingRoom,
                societyApartment: address.societyApartment,
                roadNearby: address.roadNearby,
                town: address.town,
                city: address.city,
                pinCode: address.pinCode,
                token: address.token
            })
        })

        const json = await response.json()

        if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
        }

        if(response.ok){
            dispatch({type: "SET_DELIVERY_ADDRESS",payload: json.selectedAddress})
        }
    }

    return {selectAddress}
}