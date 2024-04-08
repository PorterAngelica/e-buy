import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../axios'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'




const GetProductById = () => {

    const [categories, setCategories] = useState([])

    const location = useLocation();
    const itemId = parseInt(location.pathname.split("/")[2] );

    useEffect(() =>{
        axios.get("http://localhost:8800/api/category/getCategory")
        .then((response) => {
            setCategories(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const { isLoading, data, error } = useQuery({
        queryKey: ["product", itemId],
        queryFn: () => makeRequest.get(`/category/getCategory/${itemId}`).then((response) => {
            return response.data
        })
    })

    if (isLoading) {
        return <div> Loading...</div>
    }
    if (error) {
        return <div> Error: {error.message}</div>
    }

    return (
        <div className="app">
            <div className="categories-con">
                <ul>
                    <h2>Categories</h2>
                    <Link to="/home" >
                    <p>All</p>
                    </Link>
                    {
                        categories && categories.map((categories) =>{
                            return(
                                <div>
                                    <Link to={`/getItem/${categories.id}`}>
                                    <p>{categories.name}</p>
                                    </Link>
                                </div>
                            )
                        })
                    }
                    <Link to="/admin">
                        Seller Zone
                    </Link>
                </ul>
            </div>
        <div>
            {
                data && data.map((item) => {
                    return(
                        <div className='product-container'>
                            <div className="product">
                                <Link to={/viewItem/ + item.id}>
                            <h3>{item.name}</h3>
                            <img src={"/uploads/" + item.image} alt="" />
                            </Link>
                            <p>${item.price}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}

export default GetProductById
