import React from 'react'
import Rating from '@mui/material/Rating';
import "./css/orderComp.css"

const OrderComp = ({item}) => {
  return (
        <div className="placed-order-item-comp" key={item.dishId}>
            <div className="placed-order-item-comp-img"><img src={item.Img} alt="" /></div>
            <div className="placed-order-item-comp-det">
                <div className="placed-order-item-comp-det-title">{item.title.slice(0,15)}...</div>
                <div className="place-order-item-comp-det-rating">
                    <Rating size='small' name="half-rating-read" value={item.rating} precision={0.5} readOnly />
                    <p className='place-order-item-comp-det-rating-num'>{item.rating}</p>
                </div>
                <div className="place-order-item-comp-det-desc">{item.description.slice(0,18)}...</div>
                <div className="place-order-item-comp-det-price">
                    <p style={{fontFamily:"Arial",color:"black"}}>₹</p>
                    <p style={{fontFamily:"Poppins",color:"#595959"}}>{item.price} ({item.qty}x)</p>
                </div>
            </div>
        </div>
  )
}

export default OrderComp