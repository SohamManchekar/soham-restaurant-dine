import {useState,useEffect} from 'react';
import {useParams} from "react-router-dom";


export const useGetTypeCategory = () => {

    const {type,category} = useParams()
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { 
        const getTypeCategory = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/typeCategory?type=${type}&category=${category}`,{
                method: "GET"
            })

            const json = await response.json()

            if(response.ok){
                setResults(json.dishes)
            }
        }

        getTypeCategory()
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    },[type,category])

    return {isLoading,results}
}