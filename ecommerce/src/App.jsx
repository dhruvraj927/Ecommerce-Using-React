//import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import {Homepage} from './components/Homepage'
import {Orders} from './components/Order'
import {Tracking} from './components/Tracking'
import {Checkoutpage} from './components/Checkoutpage'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/checkout" element={<Checkoutpage/>}/>
        <Route path="/tracking" element={<Tracking/>}/>
      </Routes>
    </>
  )
}

export default App
