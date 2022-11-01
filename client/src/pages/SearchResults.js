import React,{useState,useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import {useParams} from "react-router-dom";
import Item from "../components/Item"
import BackButton from '../components/BackButton';
import ErrorComp from "../components/ErrorComp"
import CartDropdown from "../components/CartDropdown"
import Backdrop from '@mui/material/Backdrop';
import { useGetAllDishes } from '../redux/actions/Dishes/useGetAllDishes';
import "./css/SearchResults.css"

const SearchResult = () => {

    const {search} = useParams()
    const {getAllDishesData} = useGetAllDishes()
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cartDropDownOpen, setCartDropDownOpen] = useState(false)

    // handle close cart-dropdown
    const handleCloseCartDropdown = () => {
      setCartDropDownOpen(false)
    }

    // get the sorted result
    useEffect(() => {
      const getResults = () => {
          let items = []
          getAllDishesData.map((data) => {
            return items.push(data)
          })
          items = items.filter((elem) => {
              return elem.title.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
          })
          items = items.map((item) => {
            return item 
          })
          setResults(items)
      }

       getResults()
       setTimeout(() => {
        setIsLoading(false)
     }, 1000);
    }, [getAllDishesData,search])
    
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
                <ErrorComp img="https://i.ibb.co/BHJyvvj/404-error-with-people-holding-the-numbers-rafiki.png" error="No match found !" status="404" />
                :
                <>
                    <p className='search-result-length'>About {results.length} results</p>
                    <div className="search-page-results">
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

export default SearchResult