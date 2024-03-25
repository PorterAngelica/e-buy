import React, { useEffect, useState } from 'react'
import "./products.css"
import { Link } from 'react-router-dom'
import Category from '../category/Category'
import axios from 'axios'

//this page is to show all the products, redirects to add item
const Products = () => {
        const [item, setItem] = useState([])

        useEffect(() => {
                axios.get("http://localhost:8800/api/product/getProducts")
                .then((response) => {
                        console.log(response.data)
                        setItem(response.data)
                })
                .catch((err) => {
                        console.log(err)
                })
        },[])
        console.log("products")
        console.log(item)
        return (
                <div className='main-container'>
                        <div className="container-1">

                                <h1>Products</h1>
                                {
                                item && item.map((product, index) =>{
                                        return(
                                <div className="main-container">
                                        <div className="name">{product.name}</div>
                                        <div className="date">{product.created_at}</div>
                                        <div className="action"></div>
                                </div>
                                        
                                        )
                                })
                                }
                                <Link to="/addProduct">
                                        <button>Add item</button>
                                </Link>

                        </div>

                        <div className="container-2">
                                <Category />

                        </div>
                </div>
        )
}

export default Products
