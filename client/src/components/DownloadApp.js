import React,{useState} from 'react'
import AOS from 'aos';
import {toast} from "react-toastify"
import { CircularProgress } from '@mui/material'
import validator from "validator"
import "./css/downloadApp.css"

const DownloadApp = () => {

  // options for animation
  AOS.init({
    delay: 350,
    duration: 1800,
    throttleDelay: 99
  })

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmail = () => {
    if(email.length !== 0){
        if(validator.isEmail(email)){
            setIsLoading(true)
            setTimeout(() => {
                toast.success(`App Link has been shared on this Email: ${email}`,{autoClose: 3000})
                setEmail("")
                setIsLoading(false)
            }, 1500);
        }else{
            toast.error("Email invalid",{autoClose: 2000})
        }
    }else{
        toast.error("Empty field",{autoClose: 2000})
    }
  }

  return (
    <div className="download-app-comp">
        <div className="download-app-comp-img" data-aos="fade-up">
            <img src="https://i.ibb.co/fXym4tT/phone.png" alt="" title='Download app from' />
        </div>
        <div className="download-app-comp-main">
            <div className="download-app-comp-main-head-text">Get the Soham app</div>
            <div className="download-app-comp-main-head-desc">We will send you a link, open it on your phone to download the app</div>
            <div className="download-app-comp-main-email-section">
                <p className='download-app-comp-main-email-head-text'>Enter Email</p>
                <div className="download-app-comp-main-email-add">
                    <input type="text" className='download-app-comp-main-email-inp' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button className='download-app-comp-main-email-btn' onClick={() => handleEmail()}>{isLoading === true ? <CircularProgress/> : "Share App Link"}</button>
                </div>
            </div>
            <div className="download-app-comp-main-dl">
                <div className="download-app-comp-main-dl-head-text">Download app from</div>
                <div className="download-app-comp-main-d-b">
                    <img className='download-app-comp-main-d-b-gp' src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="" title="Download Soham from Google Play" />
                    <img className='download-app-comp-main-d-b-as' src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="" title="Download Soham from App Store" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default DownloadApp