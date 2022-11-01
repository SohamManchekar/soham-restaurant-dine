import { useEffect, useState } from "react"

export const useSearch = () => {

    const [titleData, setTitleData] = useState([])

    const search = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/titles`,{
            method: "GET"
        })

        const json = await response.json()

        if(response.ok){
            setTitleData(json.dishTitlesData)
        }

        if(!response.ok){
            console.log(json.error)
        }
    }

    useEffect(() => {
        search()
    },[])

    return {titleData}
}