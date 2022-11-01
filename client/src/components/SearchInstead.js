import React,{useEffect, useState} from 'react'
import { Link,useParams,useNavigate} from 'react-router-dom'
import "./css/searchInstead.css"

const SearchInstead = () => {

    const history = useNavigate()
    const {type,category} = useParams()
    const [searchInstead, setSearchInstead] = useState(type)
    const [filterItems, setFilterItems] = useState([])
    
    const handleSearchInstead = (elem) => {
        setSearchInstead(elem)
        history(`/${elem}/Breakfast`)
    }

    useEffect(() => {
        const VegCategory = ["Breakfast","Starter","MainCourse","Rice","Noodles"]
        const NonVegCategory = ["Breakfast","Starter","MainCourse","Rice","Tandoori"]
        const filterItemsFromSearchInstead = () => {
            if(type === "Veg"){
                const items = VegCategory && VegCategory.filter((item) => {
                    return item !== category
                })
                setFilterItems(items)
            }else{
                const items = NonVegCategory && NonVegCategory.filter((item) => {
                    return item !== category
                })
                setFilterItems(items)   
            }
        }

        filterItemsFromSearchInstead()
    },[type,category])

  return (
    <div className='search-instead-comp'>
       <p className='search-instead-text'>Search other items in {type}.....</p>
            <div className="search-instead-comp-linking-buttons">
                    {
                        filterItems && filterItems.map((data,index) => {
                            return <Link to={`/${type}/${data}`} style={{textDecoration: "none"}} key={index}><button className='search-instead-link-btn' key={index}>Check for {data}</button></Link>      
                        })
                    }
                    <Link to="/Veg/Roti" style={{textDecoration: "none"}} key={5}><button className='search-instead-link-btn' key={5}>Check for Roti</button></Link>
            </div>
            {
                searchInstead === "Veg" ?
                <div className="search-instead-options">
                    <p className='suggestion-text'>Checkout for Non Veg ?</p>
                    <button className='search-instead-type-btn' onClick={() => handleSearchInstead("NonVeg")}>Non Veg</button>
                </div>
                :
                <div className="search-instead-options">
                    <p className='suggestion-text'>Checkout for Veg ?</p>
                    <button className='search-instead-type-btn' onClick={() => handleSearchInstead("Veg")}>Veg</button>
                </div>
            }
           
            
    </div>
  )
}

export default SearchInstead