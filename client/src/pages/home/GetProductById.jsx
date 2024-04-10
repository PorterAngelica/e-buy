import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../axios'
import { Link, useLocation } from 'react-router-dom'
import "./home.scss"
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

    const arrayChunk = (arr, n) => {
        const array = arr.slice();
        const chunks = [];
        while (array.length) chunks.push(array.splice(0,n));
        return chunks;
    }

    if (isLoading) {
        return <div> Loading...</div>
    }
    if (error) {
        return <div> Error: {error.message}</div>
    }

    return (
        <div className="app">
            <div className="categories-con">
                
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
                    <div className='sellerzone'>
                        <hr />
                    <Link to="/admin">
                        Seller Zone
                    </Link>
                    </div>
                
            </div>
        <div>
            {arrayChunk(data,3).map((row, i) => (
            <div className="items">
            {
                row.map((item, i) => {
                    return(
                        <div className='product-container' key={i}>
                            <div className="product">
                                <Link to={/viewItem/ + item.id}>
                            <h6>{item.name}</h6>
                            <div className="image">
                            <img src={"/uploads/" + item.image} alt="" />
                            </div>
                            </Link>
                            <p>${item.price}</p>
                            </div>
                        </div>
                        )
                        })
                    }
                    </div>
                    ))}
                    </div>
        
        
                </div>
            )
        }

export default GetProductById
