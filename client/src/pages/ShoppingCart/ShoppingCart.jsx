import React, { useEffect, useState } from 'react'
import "./shoppingCart.css"
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ShoppingCart = () => {

    const [grandTotal, setGrandTotal] = useState(0);
    const Navigate = useNavigate();
    const queryClient = useQueryClient();
    

    const {isLoading, error, data} = useQuery({
        queryKey:["products"],
        queryFn: () => 
        makeRequest.get("/product/shoppingCart").then((response) => {
            return response.data
        })
    })

    useEffect(() => {
        if(data && data.length > 0){
        let total = 0;
        data.forEach(product => {
            total += product.quantity * product.price;
        });
        setGrandTotal(total)
    }else{
        setGrandTotal(0)
    }
    }, [data])

    const deleteMutation = useMutation({
        mutationFn: (productId) => {
            return makeRequest.delete(`/product/${productId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["product"]);
        },
        onError: (error) => {
            {error.message}
            console.log(error.message)
        }
    })

    const deleteProduct = (productId) => {
        deleteMutation.mutate(productId)
};

    if (isLoading){
        return <div> Loading...</div>
    }
    if(error){
        console.log(error)
        return <div> Error: {error.message}</div>
    }
    if (!data || data.length === 0) {
        return <div> shopping Cart empty</div>;
    }
    console.log("data shoppingcart")
    console.log(data)
    return (
        <div>
            <div className="shoppingCart">
                {
                    data && data.map((product) => {
                        return(
                            <div  key={product.id} className='div'>
                                <div className="left">
                                <div className="image">
                                    <img src={"/uploads/" + product.image} alt=""  />
                                </div>
                                <div className="details">
                                <p>{product.name}</p>
                                <p>${product.price}</p>
                                </div>
                                </div>
                                <div className="right">
                                <p>Quantity:</p>
                                <p>{product.quantity}</p>
                                <button onClick={() => deleteProduct(product.id)}>remove</button>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="buttons">
                <h4>Grand Total:$ {grandTotal}</h4>
                <button>buy</button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
