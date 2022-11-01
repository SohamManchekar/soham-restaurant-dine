import React,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { toast } from 'react-toastify'
import { useUpdateAddress } from '../redux/actions/address/useUpdateAddress'
import "./css/Address.css"

const UpdateAddress = ({address,isClose}) => {

    const dispatch = useDispatch()
    const { userReducer } = useSelector(state => state)
    const { updateAddress } = useUpdateAddress()
    let user = userReducer.user
    let token = userReducer.token
    let userId = user ? user.userId : ""

    const [userAddress, setUserAddress] = useState({
        buildingRoom: address.buildingRoom,
        societyApartment: address.societyApartment,
        roadNearby: address.roadNearby,
        town: address.town,
        city: address.city,
        pinCode: address.pinCode,
        token: address.token,
      })
    
       //* handle user input 
       const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserAddress({...userAddress,[name]:value})
      }

      const handleUpdateAddress = (e) => {
        e.preventDefault()
        if(token){
          dispatch(updateAddress(userId,userAddress))
          isClose()
        }else{
          toast.error("Login first",{autoClose: 2000})
        }
      }

  return (
    <div className="order-address-section">
        <h3 style={{fontFamily:"Poppins",textAlign:"center",padding:"0.1em 0"}}>Update address</h3>
        <form action="" className='order-address-form' onSubmit={handleUpdateAddress}>
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
            <button className='order-address-btn' type='submit'>Update Address</button>
        </form>
      </div>
  )
}

export default UpdateAddress