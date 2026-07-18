import { useState , useEffect } from 'react'
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import {Homepage} from './components/home/Homepage'
import {Orders} from './components/Order'
import {Tracking} from './components/Tracking'
import {Checkoutpage} from './components/checkout/Checkoutpage'
import './App.css'

function App() {
  const [Cart, SetCart] = useState([]);

  const loadcart = async () => {
    const res = await axios.get('http://localhost:3000/api/cart-items?expand=product');
    SetCart(res.data);
  };

  // useEffect(()=>{

  //   //-------Normal api / url for fectch the cart items
  //   // axios.get('http://localhost:3000/api/cart-items')
  //   // .then((res)=>{
  //   //   setCart(res.data);
  //   // })

  //   //-----------This url have querry parameter to expand the product details in the cart items response
  //   // axios.get('http://localhost:3000/api/cart-items?expand=product')
  //   // .then((res)=>{
  //   //   SetCart(res.data);
  //   // })


  //   loadcart();
  // },[])

   useEffect(()=>{

    loadcart();
    
  },[])



  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage Cart={Cart} loadcart={loadcart} />} />
        <Route path="/orders" element={<Orders Cart= {Cart} />}/>
        <Route path="/checkout" element={<Checkoutpage Cart= {Cart} loadcart={loadcart}/>}/>
        <Route path="/tracking" element={<Tracking Cart= {Cart} />}/>
      </Routes>
    </>

  )
}

export default App
