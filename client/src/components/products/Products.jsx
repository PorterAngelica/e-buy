import React from 'react'
import "./products.css"
import { Link } from 'react-router-dom'
import Category from '../category/Category'

//this page is to show all the products, redirects to add item
const Products = () => {
        return (
                <div className='main-container'>
                        <div className="container-1">

                                <h1>Products</h1>
                                <div className="main-container">
                                        <div className="name"></div>
                                        <div className="date"></div>
                                        <div className="action"></div>
                                </div>
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
