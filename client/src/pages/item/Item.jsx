import React, { useContext, useEffect, useState } from 'react'
import "./item.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
//add item
import { makeRequest } from "../../axios.js"
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Item = () => {
    const [categories, setCategories] = useState([])
    const [file, setFile] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category_id, setCategory_id] = useState("")
    const [description, setDescription] = useState("")
    const [err, setErr] = useState("")
    const [cartItems, setCartItems] = useState(0);
    const Navigate = useNavigate();

    // console.log("currentUser")
    // console.log(currentUser)
    useEffect(() => {
        axios.get("http://localhost:8800/api/category/getCategory")
            .then((res) => {
                console.log(res.data)
                setCategories(res.data)
            })
            .catch((err) => {
                console.log(err);
                
            })
    }, [])


    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data
        } catch (err) {
            console.log(err)
        }
    }


    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newProduct) =>
            makeRequest.post("/product/addProduct", newProduct),
        onSuccess: () => {
            queryClient.invalidateQueries(["product"])
            Navigate("/admin")
        },
        onError: (error) => {
            if(error.response && error.response.status === 400){
                setErr(error.response.data)
            }{
                console.log(error)
            }
        }
    })


    const onSubmit = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();

        // Extract the selected category ID from the event object
        const selectedCategoryId = e.target.category_id.value;

        const newProduct = {
            name,
            price,
            image: imgUrl,
            description,
            category_id: selectedCategoryId,
            users_id: currentUser.id
        }

        mutation.mutate(newProduct);
    }

    // console.log("category")
    // console.log(categories)
    return (
        <div className="container">
            <h1>Add product</h1>
            <form onSubmit={onSubmit}>

                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label>Price:</label>
                    <input type="number" name="price" onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div>
                    <label>Category:</label>

                    <select name="category_id" value={category_id} onChange={(e) => setCategory_id(e.target.value)}>
                        {categories && categories.map((category, index) => {
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <label>Image:</label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <div>
                    <label>Description:</label>
                    <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                    {err.general && err.general}
                    <br />
                <button>Add product</button>

            </form>
        </div>
    )
}

export default Item
