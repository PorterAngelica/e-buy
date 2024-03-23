import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios"

import "./register.css"

const Register = () => {

    const [inputs, setInputs] = useState({
        first_name:"",
        last_name: "",
        email:"",
        password: ""
    });

    const [err, setErr] = useState(null);
    const Navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value }))
    };

    const onSubmit = async (e) => {
        e.preventDefault()

        try{
            await axios.post("http://localhost:8800/api/auth/register", inputs)
            Navigate('/home')
        }catch(err){
            setErr(err.response.data)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
            <div className="container">
            <div>
                <label> First name:</label>
                <input type="text" name='first_name' onChange={handleChange} />
            </div>

            <div>
                <label> last name:</label>
                <input type="text" name='last_name' onChange={handleChange}  />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name='email' onChange={handleChange}  />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name='password' onChange={handleChange}  />
            </div>
            <div>
                <label>confirm:</label>
                <input type="password"/>
            </div>
            {err && err}
            <button>Register</button>
            </div>
        </form>

        </div>
    )
}

export default Register
