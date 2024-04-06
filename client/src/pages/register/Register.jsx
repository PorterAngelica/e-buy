import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios"

import "./register.css"

const Register = () => {

    const [inputs, setInputs] = useState({
        first_name:"",
        last_name: "",
        email:"",
        password: "",
        confirm:""
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [err, setErr] = useState({});
    const Navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value }))
        setErr({})
        if(e.target.name === 'password' || e.target.name ==='confirm'){
            setPasswordsMatch(true);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        if(inputs.password !== inputs.confirm){
            setPasswordsMatch(false);
            return;
        }
        const {confirm, ...data} = inputs;
        console.log(inputs)
        try{
            await axios.post("http://localhost:8800/api/auth/register", data)
            Navigate('/login')
        }catch(err){
            setErr(err.response.data)
        }
    }
    console.log("Render with state:", inputs, passwordsMatch, err);
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
                <input type="password" name='password' onChange={handleChange}  /> <br />
                {err.password && err.password}
            </div>
            <div>
                <label>confirm:</label>
                <input name="confirm" type="password" onChange={handleChange} /> <br />
                {!passwordsMatch && <p className='err'> Passwords do not match</p> }
                
            </div>
            {err.general && err.general}
            
            <button>Register</button>
            </div>
        </form>

        </div>
    )
}

export default Register
