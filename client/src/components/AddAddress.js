import React,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {toast} from "react-toastify"
import { useAddAddress } from '../redux/actions/address/useAddAddress'
import "./css/Address.css"

const AddAddress = ({isClose}) => {

  const dispatch = useDispatch()
  const { userReducer } = useSelector(state => state)
  const { addAddress } = useAddAddress()
  let user = userReducer.user
  let token = userReducer.token
  let userId = user ? user.userId : ""
  
  const [userAddress, setUserAddress] = useState({
    buildingRoom: "",
    societyApartment: "",
    roadNearby: "",
    town: "",
    city: "",
    pinCode: ""
  })

   //* handle user input 
   const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserAddress({...userAddress,[name]:value})
  }

  const handleAddAddress = (e) => {
    e.preventDefault()
    if(token){
      if(userAddress.buildingRoom.length === 0 || userAddress.societyApartment.length === 0 || userAddress.roadNearby.length === 0 || userAddress.town.length === 0 || userAddress.city.length === 0 || userAddress.pinCode.length === 0){
        toast.error("Empty fields",{autoClose: 2000})
      }else if(userAddress.pinCode.length < 6 || userAddress.pinCode.length > 6){
        toast.error("PinCode must be 6 number digit",{autoClose: 2000})
      }else if(!Number(userAddress.pinCode)){
      toast.error("PinCode must be in Numerical values only",{autoClose: 3500})
      }
      else{
      dispatch(addAddress(userId,userAddress))
      isClose()
      }
    }else{
      toast.error("Login first",{autoClose: 2000})
    }
  }

  return (
      <div className="order-address-section">
        <h3 style={{fontFamily:"Poppins",textAlign:"center",padding:"0.1em 0"}}>Add new address</h3>
        <form action="" className='order-address-form' onSubmit={handleAddAddress}>
            <div className="order-address-lab-inp">
              <div className="order-address-label">Building/Room no.</div>
              <div className="order-address-inp-comp">
                <input type="text" placeholder='D/202' name='buildingRoom' className='order-address-inp' value={userAddress.buildingRoom} onChange={handleInput} />
              </div>
            </div>
            <div className="order-address-lab-inp">
              <div className="order-address-label">Society/Apartment</div>
              <div className="order-address-inp-comp">
                <input type="text" placeholder='Apurva Society/Apartment' name='societyApartment' className='order-address-inp' value={userAddress.societyApartment} onChange={handleInput} />
              </div>
            </div>
            <div className="order-address-lab-inp">
              <div className="order-address-label">Road/Nearby</div>
              <div className="order-address-inp-comp">
                <input type="text" placeholder='Chandan road, near st.louis school' name='roadNearby' className='order-address-inp' value={userAddress.roadNearby} onChange={handleInput} />
              </div>
            </div>
            <div className="order-address-lab-inp">
              <div className="order-address-label">Town</div>
              <div className="order-address-inp-comp">
                <input type="text" placeholder='Vikhroli(W/E)' name='town' className='order-address-inp' value={userAddress.town} onChange={handleInput} />
              </div>
            </div>
            <div className="order-address-lab-inp">
              <div className="order-address-label">City</div>
              <div className="order-address-inp-comp">
                <input type="text" placeholder='Thane' name='city' className='order-address-inp' value={userAddress.city} onChange={handleInput} />
              </div>
            </div>
            <div className="order-address-lab-inp">
              <div className="order-address-label">PinCode</div>
              <div className="order-address-inp-comp">
                <input type="text" placeholder='401515' name='pinCode' className='order-address-inp' value={userAddress.pinCode} onChange={handleInput} />
              </div>
            </div>
            <button className='order-address-btn' type='submit'>Add Address</button>
        </form>
      </div>
  )
}

export default AddAddress