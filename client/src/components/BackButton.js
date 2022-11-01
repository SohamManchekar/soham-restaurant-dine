import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FaChevronLeft} from "react-icons/fa"
import "./css/backButton.css"

const BackButton = ({location}) => {

    const history = useNavigate()
    const handleBack = () => {
        history(`${location}`)
    }

  return (
    <div className='back-button-comp'>
        <button className='back-btn' onClick={handleBack}><FaChevronLeft/><p>Back</p></button>
    </div>
  )
}

export default BackButton