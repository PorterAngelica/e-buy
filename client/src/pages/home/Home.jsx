import React, { useContext } from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'



const Home = () => {
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient();

    const {isLoading, error, data} = useQuery({
        queryKey:["products"],
        queryFn: () => 
            makeRequest.get("/product/getProducts").then((response) => {
                return response.data
            })
        
    })
    if (isLoading) {
        return <div> Loading ...</div>;
    }

    if (error) {
        console.log(error)
        return <div> Error; {error.message} </div>;
    }
    console.log("data")
    console.log(data)
    return (
        <div className='app' >
            {
                data && data.map((product) => {
                    return(
                        <div className='product-container'>
                            <div className="product">
                                <Link to={/viewItem/ + product.id}>
                            <h3>{product.name}</h3>
                            <img src={"/uploads/" + product.image} alt="" />
                            </Link>
                            <p>${product.price}</p>
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default Home
