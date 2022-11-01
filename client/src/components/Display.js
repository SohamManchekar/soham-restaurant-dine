import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { HeadTitles } from "../Data/HeadTitles"
import { DisplayItemsData } from "../Data/DisplayItemsData"
import Typewriter from "typewriter-effect"
import {ImArrowRight2} from "react-icons/im"
import { CircularProgress } from '@mui/material'
import "./css/display.css"

const Display = () => {

  const [randomDishes, setRandomDishes] = useState([])

  // get random dishes
  const handleRandomDishes = () => {
    const n = 8;
    const sample = DisplayItemsData
      .map(x => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(a => a.x)
      .slice(0, n);
    setRandomDishes(sample)
  }

  const pushUserToTop = () =>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  }

  useEffect(() => {
    handleRandomDishes()
  },[])

  return (
    <div className="display-dish-items-comp" data-aos="fade-up">
        <div className="display-dish-items-comp-head-text">
          <Typewriter options={{strings: HeadTitles, autoStart: true, loop: true, delay: 150, pauseFor: 3000}} />
          <p className="display-dish-items-comp-head-c-text">Order Now</p>
        </div>
        <ul className="display-dish-items-comp-ul">
           {
              randomDishes.length !== 0 ?
                randomDishes && randomDishes.map((dish) => {
                  return  <Link style={{textDecoration:"none"}} to={`${dish.forward}`} key={dish.id} onClick={() => pushUserToTop()} >
                              <li className="display-dish-items-comp-ul-li" key={dish.id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(0,0,0,0.75),rgba(0,0,0,1)), url(${dish.img})`}}>
                                  <div className="display-dish-items-comp-lower">
                                    <p className='display-dish-items-comp-lower-text'>{dish.title.slice(0,25)}...</p>
                                    <button className='display-dish-items-comp-lower-btn'><ImArrowRight2/></button>
                                  </div>
                              </li>
                          </Link>
                }) 
              :
                <CircularProgress/> 
           }
        </ul>
    </div>
  )
}

export default Display