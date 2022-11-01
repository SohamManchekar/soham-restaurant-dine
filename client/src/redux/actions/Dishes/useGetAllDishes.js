import {useState,useEffect} from 'react'

export const useGetAllDishes = () => {

    const [getAllDishesData, setGetAllDishesData] = useState([])

    const getAllDishes = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/menu/`,{
            method: "GET"
        })

        const json = await response.json()

        if(response.ok){
            setGetAllDishesData(json.dishes)
        }
    }

    useEffect(() => {
        getAllDishes()
    },[])

    return {getAllDishesData}
}