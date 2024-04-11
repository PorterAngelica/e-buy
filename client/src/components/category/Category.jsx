import React, { useEffect, useState } from 'react'
import "./category.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'

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
        <div className='container-1' style={{border:"none"}}>
        <h1>Categories</h1>
        <table className="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                                <th>Name</th>
                                                <th>Date</th>
                                                
                                        </tr>
                                        </thead>
        {
                category && category.map((category, i) => {
                        return (
                                <tbody key={i}>
                                <tr>
                                        <td>{category.name}</td>
                                        <td>{category.created_at}</td>
                                        
                                </tr>
                                </tbody>
                        )
                })
        }
        </table>
        <Link to="/addCategory">
                <button>Add category</button>
        </Link>
</div>
)
}

export default Category
