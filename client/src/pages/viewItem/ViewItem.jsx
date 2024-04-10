import React from 'react'
import "./view.css"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import ProductsBuy from './ProductsBuy';
import UpdateItem from '../item/UpdateItem';

const ViewItem = ({userInfo}) => {
    const id = parseInt(useLocation().pathname.split("/")[2]);
    const queryClient = useQueryClient();

    const {isLoading, error, data} = useQuery({
        queryKey:["products"],
        queryFn: () => 
        makeRequest.get("/product/getProduct/" + id).then((response) => {
            return response.data
        })
    })
    if (isLoading){
        return <div> Loading...</div>
    }
    if(error){
        console.log(error)
        return <div> Error: {error.message}</div>
    }
    console.log("data")
    console.log(data)

    return (
        <div className='view-main'>
            {
                data && data.map((product) => {
                    return(
                        <div>
            <div className="view-main-container">
                <div className="view-left">
                    <div className="view-image">
                        <img src={"/uploads/" + product.image} alt="" />
                    </div>
                    <div className="view-details">
                        <h3>Name: {product.name} </h3>
                        <p>Price: ${product.price} </p>
                        <p>Seller:{product.brand_name}</p>
                        <p>category:{product.category_name} </p>
                    </div>
                </div>
                <div className="view-right">
                    <h4>Total: ${product.price} </h4>
                    <ProductsBuy key={product.id} product={product} /> 
                </div>
            </div>
            <div className="view-details">
                <h2>About a product</h2> <br />
                <p> {product.description} </p>
            </div>
            </div>

                    )
                })
            }
        </div>
    )
}

export default ViewItem
