import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Header from './components/Header';
import SearchResults from './pages/SearchResults';
import Order from './pages/Order';
import TypeCategory from './pages/TypeCategory';
import DishDetail from './components/DishDetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';
import ErrorComp from './components/ErrorComp';
import Cart from './pages/Cart';
import Cookies from 'js-cookie';
import {ToastContainer} from "react-toastify"
import OrderConfirmation from './pages/OrderConfirmation';
import { useUserData } from './redux/actions/User/useUserData';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const dispatch = useDispatch()
  const { userData } = useUserData()

  useEffect(() => {
    let data = localStorage.getItem("token")
    let getUser = localStorage.getItem("user")
    let amount = localStorage.getItem("amount")
    let couponId = localStorage.getItem("couponId")
    let discount = localStorage.getItem("discount")
    let payment = localStorage.getItem("payment")
    let user = JSON.parse(getUser)
    let token = JSON.parse(data)
    if(token){
      dispatch({type: "LOGIN", payload: {user,token}})
      dispatch({type: "ORDER_AMOUNT",payload: Number(amount) ? Number(amount) : 0})
      dispatch({type: "ORDER_DISCOUNT",payload: Number(discount) ? Number(discount) : 0})
      dispatch({type: "APPLY_COUPON",payload: couponId ? couponId : ""}) 
      dispatch({type:"ORDER_PAYMENT",payload: Number(payment) ? Number(payment) : 0})
      dispatch(userData(user.userId))
      Cookies.remove("_ga")
      Cookies.remove("_gid")
    }else{
      dispatch({type: "LOGOUT"})
      Cookies.remove("_ga")
      Cookies.remove("_gid")
    }
  },[dispatch,userData])

  return (
    <BrowserRouter>
      <div className="App">
      <ToastContainer/>
        <Header/>
        <Routes>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/orders' element={<Order/>} />
          <Route path='/search/:type/:category/:title/:id' element={<DishDetail/>} />  
          <Route path='/search/:search' element={<SearchResults/>} />
          <Route path='/:type/:category' element={<TypeCategory/>}/>
          <Route path='/orderConfirm' element={<OrderConfirmation/>} />
          <Route path="*" element={<ErrorComp img="https://i.ibb.co/9tXZPhb/animation-500-l6tacm3g.gif" error="No Route Match !" status="404" />}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
