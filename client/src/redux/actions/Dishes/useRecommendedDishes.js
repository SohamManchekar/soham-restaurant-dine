import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"


export const useRecommendedDishes = () => {

    const {type,category} = useParams()
    const [recommendedDishes, setRecommendedDishes] = useState([])

    useEffect(() => {
        const getRecommendedDishes = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/menu/recommended/${type}/${category}`,{
                method: "GET"
            })
    
            const json = await response.json()
    
            if(response.ok){
                setRecommendedDishes(json.dishes)
            }
        }

        getRecommendedDishes()
    },[type,category])
   
    return {recommendedDishes}
}