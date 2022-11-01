import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux"
import {useLogin} from "../redux/actions/User/useLogin"
import BackButton from '../components/BackButton'
import CircularProgress from '@mui/material/CircularProgress';
import "./css/form.css"

const Login = () => {    
   
    const dispatch = useDispatch()
    const { login, isLoading } = useLogin()
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })

    //* handle user input 
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginUser({...loginUser,[name]:value})
    }

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login(loginUser.email,loginUser.password))
    }

  return (
    <>
    <BackButton location="/" />
    <div className='login-page'>
        <h1 className='login-text'>Login</h1>
        <div className="login-comp">
            <form className='login-form' onSubmit={handleLogin}>
                <div className="login-img">
                    <img src="https://i.ibb.co/kMqC8Dt/Tablet-login-rafiki.png" alt="" />
                </div>
                <div className="login-section">
                    <div className="login-label-inp">
                        <p className='login-label-name'>Email ID</p>
                        <input type="text" name="email" id="" className='login-inp' placeholder='Enter your Email ID' value={loginUser.email} onChange={handleInput} />
                    </div>
                    <div className="login-label-inp">
                        <p className='login-label-name'>Password</p>
                        <input type="password" name="password" id="" className='login-inp' placeholder='Enter your password' value={loginUser.password} onChange={handleInput}/>
                    </div>
                    <div className="login-label-inp">
                        <button type='submit' className='login-form-submit-btn'>{isLoading === false ? "Login" : <CircularProgress/>}</button>
                        <p className='do-you-have-acc'>New to Soham ? <Link to='/signup' style={{textDecoration: "none",color:"white"}}>Create Account</Link></p>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login