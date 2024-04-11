import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../axios'
import { Link, useLocation } from 'react-router-dom'
import "./home.scss"
import axios from 'axios'




const GetProductById = () => {

    const [categories, setCategories] = useState([])

    const location = useLocation();
    const itemId = parseInt(location.pathname.split("/")[2]);

    useEffect(() => {
        axios.get("http://localhost:8800/api/category/getCategory")
            .then((response) => {
                setCategories(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const { isLoading, data, error } = useQuery({
        queryKey: ["product", itemId],
        queryFn: () => makeRequest.get(`/category/getCategory/${itemId}`).then((response) => {
            return response.data
        })
    })

    const arrayChunk = (arr, n) => {
        const array = arr.slice();
        const chunks = [];
        while (array.length) chunks.push(array.splice(0, n));
        return chunks;
    }

    if (isLoading) {
        return <div> Loading...</div>
    }
    if (error) {
        return <div> Error: {error.message}</div>
    }
    if(!data || data.length === 0){
        return <div> Category Empty, there isn't any products yet</div>
    }

    return (
        <div className='app' >
            <div className="home-page">
                <div className="categories-con">
                    <div className="all">
                        <h3>Categories</h3>
                        <Link to="/home">
                        <p>All</p>
                        </Link>
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

//         <div className="app">
//             <div className="home-page">
//                 <div className="categories-con">

//                     <h2>Categories</h2>
//                     <Link to="/home" >
//                         <p>All</p>
//                     </Link>
//                     {
//                         categories && categories.map((categories) => {
//                             return (
//                                 <div>
//                                     <Link to={`/getItem/${categories.id}`}>
//                                         <p>{categories.name}</p>
//                                     </Link>
//                                 </div>
//                             )
//                         })
//                     }
//                     <div className='sellerzone'>
//                         <hr />
//                         <Link to="/admin">
//                             Seller Zone
//                         </Link>
//                     </div>

//                 </div>
//                 <div>
//                     {arrayChunk(data, 3).map((row, i) => (
//                         <div className="items">
//                             {
//                                 row.map((item, i) => {
//                                     return (
//                                         <div className='product-container' key={i}>
//                                             <div className="product">
//                                                 <div className="home-image">
//                                                     <Link to={/viewItem/ + item.id} style={{ textDecoration: "none" }}>
//                                                         <h6>{item.name}</h6>
//                                                         <img src={"/uploads/" + item.image} alt="" />
//                                                     </Link>
//                                                     <p>${item.price}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )
//                                 })
//                             }
//                         </div>
//                     ))}
//                 </div>


//             </div>
//         </div>
//     )
// }

export default GetProductById
