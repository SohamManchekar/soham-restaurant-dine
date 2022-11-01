import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import AccordionComp from "../components/AccordionComp"
import "./css/order.css"
import { CircularProgress } from '@mui/material'


const Order = () => {

    const history = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { orderReducer,userReducer } = useSelector(state => state)
    const totalOrder = orderReducer.orders ? orderReducer.orders.length : 0
    let token = userReducer.token ? userReducer.token : ""

    useEffect(() => {
      setIsLoading(true)
      if(!token){
          return history("/")
      }
      history("/orders")
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
  },[token,history])

  return (
    <div className="placed-order-page">
        <div className="placed-order-page-head">
            <img src="https://img.icons8.com/external-victoruler-flat-gradient-victoruler/2x/external-food-package-food-and-delivery-victoruler-flat-gradient-victoruler.png" alt="" />
            <p>Your Orders {totalOrder}</p>
        </div>
        <div className="placed-order-section">
                <ul className='placed-order-section-ul'>
                    {
                      isLoading === true ? 
                        <CircularProgress/>
                      :
                        orderReducer.orders.length !== 0 ? 
                          orderReducer.orders.map((order) => {
                            return <li className='placed-order-section-ul-li' key={order._id}>
                                        <AccordionComp order={order} key={order._id} />
                                    </li>
                          })
                        : 
                          <>
                            <h1 style={{fontFamily:"Poppins",fontWeight:"500",color:"white",padding:"0.2em 0.3em"}}>Order Now !</h1>
                            <h3 style={{fontFamily:"Poppins",fontWeight:"500",color:"#808080",padding:"0 0.5em"}}>No Orders...</h3>
                            <img src="https://img.icons8.com/external-nawicon-outline-color-nawicon/344/external-cloche-food-delivery-nawicon-outline-color-nawicon.png" alt="" style={{width: "250px",height:"250px"}} />
                          </>
                    }
                </ul>
        </div>
    </div>
  )
}

export default Order