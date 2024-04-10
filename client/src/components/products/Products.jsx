import React, { useContext, useEffect, useState } from 'react'
import "./products.css"
import { Link } from 'react-router-dom'
import Category from '../category/Category'
import axios from 'axios'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { AuthContext } from '../../context/AuthContext'

//this page is to show all the products, redirects to add item
const Products = () => {
        const [item, setItem] = useState([])
        const {currentUser} = useContext(AuthContext)

        const {isLoading, data, error} = useQuery({
                queryKey:["product"],
                queryFn:() => makeRequest.get(`/product/getSellerProduct/${currentUser.id}`).then((response) =>{
                        return response.data
                })
        })

        const queryClient = useQueryClient();


        const deleteMutation = useMutation({
                mutationFn:(productId) =>{
                        return makeRequest.delete(`/product/deleteProduct/${productId}`)
                },
                onSuccess: () =>{
                        queryClient.invalidateQueries(["item"]);
                },
                onError:(error) =>{
                        {error.message}
                        console.log(error.message)
                }
        })

        const deleteProduct = (productId) => {
                deleteMutation.mutate(productId)
        }

        if(isLoading){
                return <div>Loading...</div>
        }
        if(error){
                return <div> Error: {error.message}</div>
        }

        return (
                <div className='main-container'>
                        <div className="container-1">
                                <h1>Products</h1>
                                <table class="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                                <th>Name</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                        </tr>
                                        </thead>

                                        {
                                                data && data.map((product) => {
                                                        return (
                                                                <tbody>
                                                                <tr>
                                                                        <Link to={`/viewItem/${product.id}`}>
                                                                        <td>{product.name}</td>
                                                                        </Link>
                                                                        <td>{product.created_at}</td>
                                                                        <td> <button onClick={() => deleteProduct(product.id)}>Delete</button></td>
                                                                        <td> <Link to={`/updateProduct/${product.id}`}>Edit</Link></td>
                                                                </tr>
                                                                </tbody>
                                )
                        })
                }
                </table>
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
