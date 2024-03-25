import React, { useContext, useState } from 'react'
import "./brand.css"
import { AuthContext } from '../../context/AuthContext'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const Brand = () => {
    const [err, setErr] = useState("")
    const { currentUser } = useContext(AuthContext)
    const [inputs, setInputs] = useState({
        brand_name:"",
        brand_description:""
    })
    const Navigate = useNavigate();

    const onChange =(e) =>{
        setInputs((prev) => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (user) => makeRequest.put(`/user/updateUser?id=${currentUser.id}`, user),
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
            Navigate("/home")
        },
        onError: (error) => {
            { error.message }
            console.log(error)
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault();

        mutation.mutate({...inputs})
    }

    return (
        <div>

            <form onSubmit={onSubmit} >
                <h3>Brand settings - you can input your information as a brand</h3>
                <div>
                    <label>Brand name:</label>
                    <input type="text" name="brand_name" onChange={onChange} />
                </div>

                <div>
                    <label>Description:</label>
                    <input type="text" name="brand_description" onChange={onChange} />
                </div>
                {err && err}

                <button>Create Brand</button>
            </form>

        </div>
    )
}

export default Brand
