import React,{useState} from 'react';
import {Link,useNavigate} from "react-router-dom";
import {IoRestaurant} from "react-icons/io5"
import { toast} from 'react-toastify';
import { useSearch } from '../redux/actions/Dishes/useSearch';
import "./css/search.css";


const Search = () => {
    
    const history = useNavigate()
    const {titleData} = useSearch()
    const [searchList, setSearchList] = useState([])
    const [userInput, setUserInput] = useState("")

    // search food items according user input
    const handleSearchItems = (e) => {
        setUserInput(e.target.value)
        const searchWord = e.target.value
        const suggestionBox = document.querySelector(".auto-complete-suggestion")
        let searches = []
        if(searchWord){
            titleData.map((data) => {
                return searches.push(data)
            })
            searches = searches.filter((elem) => {
                return elem.title.toLocaleLowerCase().startsWith(searchWord.toLocaleLowerCase())
            })
            searches = searches.map((item) => {
                return item
            })
            suggestionBox.classList.add("active")
        }
        setSearchList(searches)
    }

    const handleSearching = (dish) =>{
        if(dish){
            history(`/search/${dish}`)
        }else{
            toast.error("Enter something !",{autoClose: 2000})
        }
    }

  return (
    <div className='search-page'>
        <div className="resto-det">
            <h1>Soham Restaurant & Dine</h1>
            <p>Enjoy a <b style={{fontSize:"1.2em",color:"#e6e6e6"}}>Taste</b> of <b style={{fontSize:"1.2em",color:"#e6e6e6"}}>Heaven</b></p>
        </div>
        <div className="search-comp">
           <div className="search-inp-btn">
                <input type="text" className='search-inp' id='searchInput' placeholder='Search your favorite dish...' onChange={handleSearchItems} onKeyUp={(e) => e.keyCode === 13 ? handleSearching(userInput) : null} />
                <button className='search-btn' onClick={() => handleSearching(userInput)}><IoRestaurant/></button>
           </div>
           <div className="auto-complete-suggestion">
                <ul>
                    {
                        searchList.map((item) => {
                            let elem = item.title.split(' ')
                            let title = elem.join("")
                            return <Link to={`/search/${item.type}/${item.category}/${title}/${item._id}`} key={item._id} style={{textDecoration:"none",color:"white"}}><li key={item._id}>{item.title}</li></Link>
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Search