import React from 'react'
import "./css/error.css"

const ErrorComp = ({img,status,error}) => {
  return (
    <div className='error-comp'>
        <h1 style={{color:"#bfbfbf",fontFamily:"Poppins"}}>{error}</h1>
        <img src={img} alt={status} title={status} />
    </div>
  )
}

export default ErrorComp