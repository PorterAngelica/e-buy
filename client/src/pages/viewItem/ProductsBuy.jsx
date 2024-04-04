import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductsBuy = ({product}) => {
    const [quantity, setQuantity] = useState("")
    const Navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8800/api/product/products/buyed", {
                quantity,
                products_id: product.id
            })
                Navigate("/shoppingCart")
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
            <label>Quantity:</label> <br/>
            <input type="number" name="quantity" onChange={(e) => setQuantity(e.target.value)} /> <br />
            <input type="hidden" name="products_id" value={product.id} />
            <button> buy product </button>
            </form>
        </div>
    )
}

export default ProductsBuy
