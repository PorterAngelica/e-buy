import React from 'react'
import "./category.css"
import { Link } from 'react-router-dom'

const Category = () => {
return (
        <div className='container-1'>
        <h1>Categories</h1>
        <div className="main-container">
                <div className="name"></div>
                <div className="date"></div>
                <div className="action"></div>
        </div>
        <Link to="/addCategory">
                <button>Add category</button>
        </Link>
</div>
)
}

export default Category
