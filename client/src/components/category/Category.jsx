import React, { useEffect, useState } from 'react'
import "./category.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Category = () => {

        const [category, setCategory] = useState([])

        useEffect(() => {
                axios.get("http://localhost:8800/api/category/getCategory")
                .then((res) => {
                        console.log(res.data)
                        setCategory(res.data)
                })
                .catch((err) => {
                        console.log(err);
                })
        }, [])
        console.log("category")
        console.log(category)
return (
        <div className='container-1'>
        <h1>Categories</h1>
        {
                category && category.map((category, index) => {
                        return (
                <div className="main-container">
                <div className="name">{category.name}</div>
                <div className="date">{category.created_at}</div>
                <div className="action"></div>
        </div>
                        )
                })
        }
        <Link to="/addCategory">
                <button>Add category</button>
        </Link>
</div>
)
}

export default Category
