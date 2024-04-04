import React from 'react'
import "./shoppingCart.css"
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'

const ShoppingCart = ({product}) => {

    const {isLoading, error, data} = useQuery({
        queryKey:["products"],
        queryFn: () => 
        makeRequest.get("/product/shoppingCart").then((response) => {
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
    console.log("data shoppingcart")
    console.log(data)
    return (
        <div>
            <div className="shoppingCart">
                {
                    data && data.map((items) => {
                        return(
                            <div className='div'>
                                <div className="left">
                                <div className="image">
                                    <img src={"/uploads/" + items.image} alt=""  />
                                </div>
                                <div className="details">
                                <p>{items.name}</p>
                                <p>${items.price}</p>
                                </div>
                                </div>
                                <div className="right">
                                <p>Quantity:</p>
                                <p>{items.quantity}</p>
                                <button>remove</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShoppingCart
