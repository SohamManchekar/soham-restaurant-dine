import React from 'react'
import Display from '../components/Display'
import AOS from 'aos';
import DownloadApp from '../components/DownloadApp'
import Other from '../components/Other'
import Search from '../components/Search'
import TypeSection from '../components/TypeSection'
import {TypeSectionData} from "../Data/TypeSectionData"
import "./css/Home.css"

const Home = () => {

  // options for animation
  AOS.init({
    delay: 350,
    duration: 1800,
    throttleDelay: 99
  })

  return (
    <div className='home-page'>
        <Search/>
        <Display/>
        <h1 data-aos="fade-up" style={{width:"100%",height:"auto",color:"whitesmoke",fontSize:"2.5em",fontFamily:"Poppins",fontWeight:"900",textAlign:"center",margin:"2em 0 0 0"}}>Check Section</h1>
        {
          TypeSectionData && TypeSectionData.map((data) => {
              return <TypeSection item={data} key={data.id} />
          })
        }
        <DownloadApp/>
        <Other/>
    </div>
  )
}

export default Home