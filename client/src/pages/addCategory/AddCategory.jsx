import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./AddCategory.css"
import axios from "axios"

const AddCategory = () => {
    const [name, setName] = useState();
    const [err, setErr] = useState(null)
    const Navigate = useNavigate()

    const onSubmit = async(e) => {
        e.preventDefault()

        try{
        await axios.post("http://localhost:8800/api/category/addCategory",{
        name
        })
        Navigate('/admin')
    }catch(err){
        setErr(err.response.data)
    }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
            <h1>Add Category</h1>
            <label>Category Name</label>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
            {err && err}
            <button>Add Category</button>
            </form>
        </div>
    )
}

export default AddCategory;
