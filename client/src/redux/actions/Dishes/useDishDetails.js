import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"

export const useDishDetails = () => {
    
   const {id} = useParams()
   const [dishDetails, setDishDetails] = useState({})

    useEffect(() => {
        const getDishDetails = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/menu/${id}`,{
                method: "GET"
            })
    
            const json = await response.json()

            if(response.ok){
                setDishDetails(json.dish)
            }
        }

        getDishDetails()
    },[id])


    return {dishDetails}
}