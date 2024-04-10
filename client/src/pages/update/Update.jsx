import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/AuthContext';
import { makeRequest } from '../../axios';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const [err, setErr] = useState("")
    const [person, setPerson] = useState([])
    const { currentUser } = useContext(AuthContext)
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        email: "",
        brand_name: "",
        brand_description: ""
    })
    
    const userId = parseInt(useLocation().pathname.split("/")[2]);
    useEffect(() => {
        axios.get("http://localhost:8800/api/user/find/" + userId)
        .then((res) => {
            console.log(res.data)
            setPerson(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
        }, [])
    
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
            if(error.response && error.response.status === 400){
                setErr(error.response.data)
            }else{
                console.log(error)
            }
            
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
                    <input type="text" name="first_name" onChange={onChange} placeholder={person.first_name} />
                </div>

                <div>
                    <label>Last Name</label>
                    <input type="text" name="last_name" onChange={onChange} placeholder={person.last_name} />
                </div>

                <div>
                    <label>Email</label>
                    <input type="text" name="email" onChange={onChange} placeholder={person.email}  />
                </div>

                <div>
                    <label>Brand Name</label>
                    <input type="text" name="brand_name" onChange={onChange} placeholder={person.brand_name}/>
                </div>

                <div>
                    <label>Brand Description</label>
                    <input type="text" name="brand_description"  onChange={onChange} placeholder={person.brand_description}/>
                </div>
                    {err.general && err.general}
                    <br />
                <button>Update</button>

            </form>
        </div>
    )
}

export default Update
