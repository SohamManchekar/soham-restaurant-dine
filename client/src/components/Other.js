import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import {OtherRestaurantData} from "../Data/OtherRestaurantData"
import "./css/other.css"

const Other = () => {


  return (
    <div className="other-restaurants-comp">
        <div className="other-restaurants-comp-head-text">
            Other Restaurant at
        </div>
        <div className="other-restaurants-comp-main">
            {
              OtherRestaurantData && OtherRestaurantData.map((elem) => {
                const id = uuidv4(); 
                return <div className="other-restaurants-comp-city-text" key={id}>{elem}</div>
              })
            }   
        </div>
    </div>
  )
}

export default Other