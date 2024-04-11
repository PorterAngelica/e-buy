import React from 'react'
import "./seller.css"
import Brand from '../../components/brand/Brand'
import Products from '../../components/products/Products'
import Category from '../../components/category/Category'

const Seller = () => {
    return (
        <div>
        <div className="main">
            <h1>Seller's Zone</h1>
            <p>A control panel to manage your brand</p>
            <Brand />
        </div>

            <div className="container">
                <Products />
                <Category />
            </div>
        </div>
    )
}

export default Seller
