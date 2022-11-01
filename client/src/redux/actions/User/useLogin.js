import {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import { toast } from 'react-toastify'
import { useUserData } from './useUserData'



export const useLogin = () => {

    const history = useNavigate()
    const { userData } = useUserData()
    const [isLoading, setIsLoading] = useState(false)
    let amount = localStorage.getItem("amount")
    let couponId = localStorage.getItem("couponId")
    let discount = localStorage.getItem("discount")

    const login = (email,password) => async (dispatch) => {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/user/login`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                  email: email,
                  password: password
              })
          })
    
          const json = await response.json()
          if(!response.ok){
            toast.error(json.error,{autoClose: 2000})
            setIsLoading(false)
          }
    
          if(response.ok){
            setIsLoading(true)
            dispatch(userData(json.user.userId))
            dispatch({type: "LOGIN", payload: json})
            dispatch({type: "ORDER_AMOUNT",payload: Number(amount) ? Number(amount) : 0})
            dispatch({type: "ORDER_DISCOUNT",payload: Number(discount) ? Number(discount) : 0})
            dispatch({type: "APPLY_COUPON",payload: couponId ? couponId : ""}) 
            localStorage.setItem("user",JSON.stringify(json.user))
            localStorage.setItem("token",JSON.stringify(json.token))
            Cookies.set("token",json.token,{expires: 30,path: "/"})
            setTimeout(() => {
                toast.success("Login Successful",{autoClose: 2000})
                history("/")
                setIsLoading(false)
            }, 1000);
          }
    }

    return {login,isLoading}
}