import {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useSignup = () => {

    const history = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    //? send request to backend
    const signup = async (data) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/user/signup`,{
              method: "POST",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify({
                firstName : data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            })
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(true)
            toast.error(json.error,{autoClose: 2000})
            setIsLoading(false)
        }

        if(response.ok){
            setIsLoading(true)
            toast.success("Sign up Successful",{autoClose: 2000})
            setTimeout(() => {
                toast.info("Login",{autoClose: 2000})
            }, 1000);
            setTimeout(() => {
                history("/login")
                setIsLoading(false)
            }, 1500);
        }
    }

    return { signup, isLoading }
    
}