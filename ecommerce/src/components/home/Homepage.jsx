import axios from 'axios';
import { useState, useEffect } from 'react'
import './Homepage.css'
import { Header } from '../header/Header'
import {Product } from './Products'
export function Homepage({ Cart , loadcart }) {

    const [Products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then((res) => {
                setProducts(res.data);
            })
    }, [])

    return (
        <>
            <title>HOME PAGE</title>

            <Header Cart={Cart} />

            <div className="home-page">
                <div className="products-grid">

                   <Product Products= {Products} loadcart={loadcart}/>


                </div>
            </div>
        </>
    );
}