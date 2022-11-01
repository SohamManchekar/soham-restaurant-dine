import React,{useState} from 'react'
import AOS from 'aos';
import {Link} from "react-router-dom"
import {AiOutlineClose} from "react-icons/ai"
import 'aos/dist/aos.css'; 
import "./css/TypeSection.css"

const TypeSection = ({item}) => {

  const [changeState, setChangeState] = useState(false)
  // options for animation
  AOS.init({
    delay: 350,
    duration: 1800,
    throttleDelay: 99
  })

  const pushUserToTop = () =>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  }

  return (
      <div className='type-comp' key={item.id}>
        <div className="type-comp-img" data-aos={item.Animation1} style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.8)),url(${item.Img1})`}}>
            {
              changeState === false ? 
              <button className='type-comp-btn1' onClick={() => setChangeState(true)}>{item.Type}</button>
              :
              <div className="type-comp-details" id='typeCompDetails' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.8)),url(${item.Img2})`}}>
                <button className='type-comp-close-btn' onClick={() => setChangeState(false)}><AiOutlineClose/></button>
                {
                  item.Categories && item.Categories.map((category,index) => {
                      return <Link to={`/${item.Type}/${category}`} style={{textDecoration:"none"}} key={index} onClick={pushUserToTop}><button className='type-comp-btn2' key={index} data-aos={item.Animation2}>{category}</button></Link>
                  })
                }
                <Link to="/Veg/Roti" style={{textDecoration:"none"}} key={6} onClick={pushUserToTop}><button className='type-comp-btn2' key={6} data-aos={item.Animation2}>Roti</button></Link>
              </div>
            }
        </div>
      </div>
  )
}

export default TypeSection