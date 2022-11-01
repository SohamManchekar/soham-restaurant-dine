import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import swal from 'sweetalert'

const Coupon = ({data}) => {

  const dispatch = useDispatch()
  const {orderReducer} = useSelector(state => state)
  let amount = orderReducer.amount
  let discountAmount = amount - (amount * data.discount) / 100
  
  const handleCouponApply = (id,discount) => {
    if(orderReducer.couponId.length !== 0){
      toast.info("Coupon has been applied",{autoClose: 2000})
    }else{
      swal({ title: "Apply Coupon", text: "Do you want to apply coupon ? once coupon is applied, coupon will reset after order is placed.", icon: "https://img.icons8.com/external-flat-02-chattapat-/2x/external-offer-cyber-monday-flat-02-chattapat-.png", buttons: true,dangerMode: false,})
      .then((apply) => {
          if (apply) {
              swal("Coupon applied successfully", { icon: "success",})
              localStorage.setItem("amount",Number(amount))
              localStorage.setItem("couponId",id)
              localStorage.setItem("discount",Number(discount))
              localStorage.setItem("payment",Number(discountAmount))
              dispatch({type: "ORDER_AMOUNT",payload: Number(amount)})
              dispatch({type: "ORDER_DISCOUNT",payload: Number(discount)})
              dispatch({type: "APPLY_COUPON",payload: id}) 
              dispatch({type: "ORDER_PAYMENT",payload: Number(discountAmount)})
          }
      });
    }
  }

  return (
    <div className="coupon-comp" key={data.id} style={{width:"220px",height:"150px",backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 1),rgba(0, 0, 0, 0.9),rgba(0,0,0,0)), url(${data.img})`}}>
        <div className="coupon-desc" style={{width:"100%",height:"auto",backgroundColor:"white"}}>
            <p style={{color:"#808080",fontSize:"1em",fontWeight:"500",fontFamily:"Poppins",padding:"0 0.3em"}}><b style={{color:"black"}}>{data.discount}%</b> off upto <b style={{color:"black",fontFamily:"Arial"}}>₹{data.upto}</b></p>
        </div>
        <img style={{width:"40px",height:"40px",margin:"0 0.3em"}} src="https://img.icons8.com/external-flat-02-chattapat-/2x/external-offer-cyber-monday-flat-02-chattapat-.png" alt="" />
            <div className="coupon-user-total-discount" style={{margin:"0 0 0 0.3em"}}>
              <del style={{fontFamily:"Arial",color:"#ccc",fontSize:"0.8em"}}>Pay ₹<b>{amount >= data.upto ? amount : 0}</b></del>
              <h4 style={{fontFamily:"Arial",color:"white"}}>Pay ₹<b>{amount >= data.upto ? discountAmount.toFixed() : 0}</b></h4>
            </div>
        {
          orderReducer.couponId === data.id ? 
            <button style={{width:"100px",height:"30px",display:"flex",alignItems:"center",justifyContent:"space-evenly",margin:"0.5em 0.4em",fontSize:"0.8em",fontFamily:"Poppins",fontWeight:"500",backgroundColor:"#333",color:"white",border:"none",borderRadius:"5px",outline:"none",cursor:"pointer"}} onClick={() => toast.info("Coupon has been applied",{autoClose: 2000})}><img style={{width:"18px",height:"18px"}} src="https://img.icons8.com/external-those-icons-flat-those-icons/2x/external-Check-interface-those-icons-flat-those-icons-2.png" alt="" /><p>Applied</p></button>
          :
            <button style={{width:"100px",height:"30px",margin:"0.5em 0.4em",fontSize:"0.8em",fontFamily:"Poppins",fontWeight:"500",backgroundColor:"#333",color:"white",border:"none",borderRadius:"5px",outline:"none",cursor:"pointer"}} disabled={amount < data.upto} onClick={() => handleCouponApply(data.id,data.discount)}>Apply now</button>
        }
    </div>
  )
}

export default Coupon