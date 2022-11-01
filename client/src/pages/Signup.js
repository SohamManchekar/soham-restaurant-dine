import React,{useState} from 'react';
import {Link} from "react-router-dom";
import { useSignup } from '../redux/actions/User/useSignup.js';
import BackButton from '../components/BackButton';
import validator from "validator"
import CircularProgress from '@mui/material/CircularProgress';
import {toast} from "react-toastify"
import "./css/form.css"

const Signup = () => {

    const {signup,isLoading} = useSignup()
    const [signUpUser, setSignUpUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password : ""
    })

    //! show form error 
    const firstNameErr = document.getElementById("firstNameErr")
    const lastNameErr = document.getElementById("lastNameErr")
    const emailErr = document.getElementById("emailErr")
    const passwordErr = document.getElementById("passwordErr")

    //* handle user input 
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSignUpUser({...signUpUser,[name]:value})
    }

    //* validate sign up form 
    const validateForm = () => {
        if(validator.isAlpha(signUpUser.firstName)){
            firstNameErr.innerHTML = "Valid"
            firstNameErr.style.color = "#00ff00"
        }
        else if(signUpUser.firstName === ""){
            firstNameErr.innerHTML = "Required"
            firstNameErr.style.color = "#ff0000"
        }
        else{
            firstNameErr.innerHTML = "Invalid FirstName"
            firstNameErr.style.color = "#ff0000"
        }

        if(signUpUser.lastName === ""){
            lastNameErr.innerHTML = "Required"
            lastNameErr.style.color = "#ff0000"
        }
        else if(validator.isAlpha(signUpUser.lastName)){
            lastNameErr.innerHTML = "Valid"
            lastNameErr.style.color = "#00ff00"
        }
        else{
            lastNameErr.innerHTML = "Invalid LastName"
            lastNameErr.style.color = "#ff0000"
        }

        if(signUpUser.email === ""){
            emailErr.innerHTML = "Required"
            emailErr.style.color = "#ff0000"
        }
        else if(validator.isEmail(signUpUser.email)){
            emailErr.innerHTML = "Valid"
            emailErr.style.color = "#00ff00"
        }else{
            emailErr.innerHTML = "Invalid Email ID"
            emailErr.style.color = "#ff0000"
        }

        if(signUpUser.password === ""){
            passwordErr.innerHTML = "Required"
            passwordErr.style.color = "#ff0000"
        }
        else if(signUpUser.password.length < 8){
            passwordErr.innerHTML = "Password must contain 8 characters"
            passwordErr.style.color = "#ff0000"
        }else{
            passwordErr.innerHTML = "Valid"
            passwordErr.style.color = "#00ff00"
        }
    }

    
    //? sign up user
    const handleSignup = (e) => {
        e.preventDefault()
        validateForm()
        if(firstNameErr.innerHTML === "Valid" && lastNameErr.innerHTML === "Valid" && emailErr.innerHTML === "Valid" && passwordErr.innerHTML === "Valid"){
            signup(signUpUser)
        }else{
            toast.error("Something went wrong",{autoClose: 2000})
        }
    }

  return (
    <>
    <BackButton location="/"/>
    <div className='signup-page'>
        <h1 className='signup-text'>Sign up</h1>
        <div className="signup-comp">
            <form className='signup-form' onSubmit={handleSignup}>
                <div className="signup-section">
                    <div className="signup-label-inp">
                        <p className='signup-label-name'>FirstName</p>
                        <input type="text" name="firstName" id="" className='signup-inp' placeholder='Enter your Firstname' value={signUpUser.firstName} onChange={handleInput}/>
                        <p className='signup-err' id='firstNameErr'></p>
                    </div>
                    <div className="signup-label-inp">
                        <p className='signup-label-name'>LastName</p>
                        <input type="text" name="lastName" id="" className='signup-inp' placeholder='Enter your Lastname' value={signUpUser.lastName} onChange={handleInput}/>
                        <p className='signup-err' id='lastNameErr'></p>
                    </div>
                    <div className="signup-label-inp">
                        <p className='signup-label-name'>Email ID</p>
                        <input type="text" name="email" id="" className='signup-inp' placeholder='Enter your Email ID' value={signUpUser.email} onChange={handleInput}/>
                        <p className='signup-err' id='emailErr'></p>
                    </div>
                    <div className="signup-label-inp">
                        <p className='signup-label-name'>Password</p>
                        <input type="password" name="password" id="" className='signup-inp' placeholder='Enter your password' value={signUpUser.password} onChange={handleInput}/>
                        <p className='signup-err' id='passwordErr'></p>
                    </div>
                    <div className="signup-label-inp">
                        <button type='submit' className='signup-form-submit-btn'>
                            {
                                isLoading === false ?
                                "Sign up"
                                :
                                <CircularProgress/>
                            }
                        </button>
                        <p className='do-you-have-acc'>Already have an account ? <Link to='/login' style={{textDecoration: "none",color:"white"}}>Login</Link></p>
                    </div>
                </div>
                <div className="signup-img">
                    <img src="https://i.ibb.co/z4YYT5L/Sign-up-rafiki.png" alt="" />
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Signup

