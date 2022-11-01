import React,{useState} from 'react';
import { CircularProgress } from '@mui/material';
import Item from "../components/Item"
import SearchInstead from '../components/SearchInstead';
import CartDropdown from "../components/CartDropdown"
import Backdrop from '@mui/material/Backdrop';
import BackButton from '../components/BackButton';
import ErrorComp from '../components/ErrorComp';
import {useGetTypeCategory} from "../redux/actions/Dishes/useGetTypeCategory"
import "./css/TypeCategory.css"


const TypeCategory = () => {

    const {isLoading,results} = useGetTypeCategory()
    const [cartDropDownOpen, setCartDropDownOpen] = useState(false)

    // handle close cart-dropdown
    const handleCloseCartDropdown = () => {
      setCartDropDownOpen(false)
    }

  return (
      <>
      <BackButton location="/" />
         {
             isLoading === true ? 
                <div className="loading">
                    <CircularProgress/>
                </div>
                :
                results.length === 0 ? 
                    <ErrorComp img="https://i.ibb.co/BHJyvvj/404-error-with-people-holding-the-numbers-rafiki.png" error="No such category found !" status="404" />
                    :
                    <>
                        <SearchInstead/>
                        <div className="type-category-page">
                            {
                                results && results.map((item) => {
                                    return <Item data={item} key={item._id} openCart={() => setCartDropDownOpen(true)} />
                                })
                            }
                            <p style={{width:"100%",height:"40px",backgroundColor:"transparent",color:"white",fontSize:"1.4em",fontFamily:"Poppins",fontWeight:"500",textAlign:"center",paddingTop:"0.2em",margin:"1em 0"}}>No more dishes...</p>
                        </div>
                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={cartDropDownOpen}>
                            <CartDropdown isOpen={handleCloseCartDropdown} />
                        </Backdrop>
                    </>
         }
      </>
  )
}

export default TypeCategory