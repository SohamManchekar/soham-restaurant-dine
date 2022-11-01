import React from 'react'
import "./css/orderConfirmationDishComp.css"

const OrderConfirmationDishComp = ({data}) => {
  return (
      <div className="your-order-comp" key={data._id}>
          <div className="your-order-img"><img src={data.Img} alt="" title={data.title} /></div>
          <div className="your-order-details">
            <div className="your-order-title">{data.title.slice(0,18)}...</div>
            <div className="your-order-price-qty">
                <div className="your-order-p">
                    <p style={{fontFamily:"Arial",fontSize:"1.1em"}}>₹</p>
                    <p>{data.price}</p>
                </div>
                <div className="your-order-q" title={`Qty: ${data.qty}`}>
                  <p className='your-order-q-text'>Qty :</p>
                  <p className='your-order-q-qty'>{data.qty}</p>
                </div>
            </div>
          </div>
      </div>
  )
}

export default OrderConfirmationDishComp