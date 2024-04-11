import React, { useContext, useEffect, useState } from 'react'
import "./home.scss"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import axios from 'axios'



const Home = () => {
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient();
    const [categories, setCategories] = useState([])



    useEffect(() => {
        axios.get("http://localhost:8800/api/category/getCategory")
            .then((response) => {
                setCategories(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const { isLoading, error, data } = useQuery({
        queryKey: ["products"],
        queryFn: () =>
            makeRequest.get("/product/getProducts").then((response) => {
                return response.data
            })

    })

    const arrayChunk = (data, n) => {
        const array = data.slice()
        const chunks = [];
        while (array.length) chunks.push(array.splice(0, n));
        return chunks;
    }
    if (isLoading) {
        return <div> Loading ...</div>;
    }

    if (error) {
        console.log(error)
        return <div> Error; {error.message} </div>;
    }
    if( !data || data.length ===0){
        return <div> Category Empty, There isn't any products yet!</div>
    }
    console.log("data")
    console.log(data)
    return (
        <div className='app' >
            <div className="home-page">
                <div className="categories-con">
                    <div className="all">
                        <h3>Categories</h3>
                        <p>All</p>
                        {
                            categories && categories.map((categories) => {
                                return (
                                    <div>
                                        <Link to={`/getItem/${categories.id}`} style={{ textDecoration: "none" }}>
                                            <p>{categories.name}</p>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        <div className='sellerzone'>
                            <hr />
                            <Link to="/admin" style={{ textDecoration: "none" }}>
                                Seller Zone
                            </Link>
                        </div>
                    </div>

                </div>
                <div>
                    {arrayChunk(data, 3).map((row, i) => (
                        <div className="home-items" key={i}>
                            {
                                row.map((product, i) => {
                                    return (
                                        <div className='product-container' key={i}>
                                            <div className="product">
                                                <div className="home-image">
                                                    <Link to={/viewItem/ + product.id} style={{ textDecoration: "none" }}>
                                                        <h6>{product.name}</h6>
                                                        <img src={"/uploads/" + product.image} alt="" />
                                                    </Link>
                                                    <p>${product.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default Home
