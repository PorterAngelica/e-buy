import React, { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import "./profile.css"
import { AuthContext } from '../../context/AuthContext';
import { makeRequest } from '../../axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Profile = () => {
    const [err, setErr] = useState("")
    const { currentUser } = useContext(AuthContext)
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const {isLoading, error, data} = useQuery({
        queryKey: ["user", userId],
        queryFn: () => makeRequest.get("/user/find/" + userId).then(response => {
            return response.data
        })
    });

    if(isLoading){
        return <div>Loading...</div>
    }if(error){
        return <div>Error: {error.message}</div>
    }
    console.log("data")
    console.log(data)
    return(
        <div>
        
            <h1>Welcome {data.first_name}</h1>
            <h3> {data.email} </h3>
            <h3> {data.brand_name} </h3>
            <h3> {data.brand_description} </h3>

            <Link to="/update">
            <button >update</button>
            </Link>
        </div>
    )
}

export default Profile
