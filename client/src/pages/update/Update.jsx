import React, { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/AuthContext';
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const [err, setErr] = useState("")
    const { currentUser } = useContext(AuthContext)

    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        email: "",
        brand_name: "",
        brand_description: ""
    })

    const onChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: [e.target.value]}));
    }

    const Navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (user) => makeRequest.put(`/user/updateUser?id=${currentUser.id}`, user),
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
            Navigate(`/profile/${currentUser.id}`)
        },
        onError: (error) => {
            { error.message }
            console.log(error)
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault();

        mutation.mutate({...inputs})
        setInputs("");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>

                <h1>Update Profile</h1>

                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" onChange={onChange} />
                </div>

                <div>
                    <label>Last Name</label>
                    <input type="text" name="last_name" onChange={onChange}  />
                </div>

                <div>
                    <label>Email</label>
                    <input type="text" name="email" onChange={onChange}  />
                </div>

                <div>
                    <label>Brand Name</label>
                    <input type="text" name="brand_name" onChange={onChange} />
                </div>

                <div>
                    <label>Brand Description</label>
                    <input type="text" name="brand_description"  onChange={onChange} />
                </div>
                    {err && err}
                <button>Update</button>

            </form>
        </div>
    )
}

export default Update
