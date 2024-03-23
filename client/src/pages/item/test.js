import React, { useContext, useEffect, useState } from 'react'
import "./item.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
//add item

const Item = () => {
    const [categories, setCategories] = useState([])
    const [file, setFile] = useState(null)
    const [name, setName] = useState("")
    const [price, setprice ] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")

    const upload = async () => {
        try{
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data
        }catch(err){
            console.log(err)
        }
    }

    const { currentUser } = useContext(AuthContext)
    
    const Navigate = useNavigate();

    console.log(currentUser)

    const onSubmit = async(e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();

        try{
            await axios.post("http://localhost:8800/api/product/addProduct", {
                name,
                price,
                category,
                image: imgUrl,
                description,
                users_id: currentUser.id
            })
            Navigate("/admin")
        }catch(err){
            console.log(err)
        }
    }

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
    console.log("category")
    console.log(categories)

    return (
        <div className="container">
            <h1>Add product</h1>
            <form >

                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label>Price:</label>
                    <input type="number" name="price" onChange={(e) => setprice(e.target.value)} />
                </div>

                <div>
                <label>Category:</label>
                    <select name="categories">
                    {categories && categories.map((category, index) => {
                        return(
                        <option value={category.id}>{category.categories}</option>
                        )
                    })}
                    </select>
                </div>

                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={(e) => setFile(e.target.files[0])}/>
                </div>

                <div>
                    <label>Description:</label>
                    <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                
                <button>Add product</button>

            </form>
        </div>
    )
}

export default Item
