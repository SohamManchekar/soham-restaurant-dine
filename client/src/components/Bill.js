import React from 'react'
import "./css/bill.css"

const Bill = ({amount,payment,discount,items,orderDate,paymentType}) => {
  return (
            <div className="placed-order-comp-main-bill">
                <div className="place-order-comp-main-bill-all">
                    <p className='place-order-comp-main-bill-all-text'>Payment</p>
                    {
                        discount === 0 ? 
                            <div className="place-order-comp-main-bill-all-dsa">
                                <p className='place-order-comp-main-bill-ta'>₹{payment}</p>
                            </div>
                        :
                            <div className="place-order-comp-main-bill-all-dsa">
                                <del className='place-order-comp-main-bill-td'>₹{amount}</del>
                                <p className='place-order-comp-main-bill-ta'>₹{payment}</p>
                                <p className='place-order-comp-main-bill-ts'>saved ₹{amount - payment}</p>
                            </div>
                    }
                </div>
                <div className="place-order-comp-main-bill-all">
                    <p className='place-order-comp-main-bill-all-text'>Items</p>
                    <p className='place-order-comp-main-bill-all-m'>{items}</p>
                </div>
                <div className="place-order-comp-main-bill-all">
                    <p className='place-order-comp-main-bill-all-text'>Order date</p>
                    <p className='place-order-comp-main-bill-all-m'>{orderDate}</p>
                </div>
                <div className="place-order-comp-main-bill-all">
                    <p className='place-order-comp-main-bill-all-text'>Payment Type</p>
                    <p className='place-order-comp-main-bill-all-m'>{paymentType}</p>
                </div>
            </div>
  )
}

export default Bill