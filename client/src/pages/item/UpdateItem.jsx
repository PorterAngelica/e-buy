import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { makeRequest } from "../../axios.js"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/AuthContext.jsx'

const UpdateItem = () => {
    const [categories, setCategories] = useState([])
    const [file, setFile] = useState(null)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category_id, setCategory_id] = useState("")
    const [description, setDescription] = useState("")
    const Navigate = useNavigate();
    const {currentUser} = useContext(AuthContext)

    
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
        
    const productId = parseInt(useLocation().pathname.split("/")[2])
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (updateProduct) =>
            makeRequest.put(`/product/editProduct/${productId}`, updateProduct),
        onSuccess: () => {
            queryClient.invalidateQueries(["product"])
            Navigate("/admin")
        },
        onError: (error) => {
            { error.message }
            console.log(error)
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();

        // Extract the selected category ID from the event object
        const selectedCategoryId = e.target.category_id.value;

        const updateProduct = {
            name,
            price,
            image: imgUrl,
            description,
            category_id: selectedCategoryId,
            users_id: currentUser.id
        }

        mutation.mutate(updateProduct);
    }

    
    return (
        <div className="container">
        <h1> Update product</h1>
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

            <button>Update product</button>

        </form>
    </div>
)
}

export default UpdateItem
