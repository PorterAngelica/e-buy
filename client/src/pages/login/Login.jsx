import React, { useState, useContext } from 'react'
import "./login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext"

const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const [err, setErr] = useState(null)
    const Navigate = useNavigate();
    
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const { login } = useContext(AuthContext)

    const onSubmit = async (e) => {
        e.preventDefault()
        try{
        await axios.post("http://localhost:8800/api/auth/login", inputs)
        Navigate("/home")
    }catch(err){
            setErr(err.response.data)
    }
    }

    // const handleLogin = async (e) => {
    //     e.preventDefault()
    //     try{
    //         await login(inputs);
    //         Navigate('/home')
    //     }catch(err){
    //         console.log(err)
    //     }
    // };
    return (
        <div>
            <form onSubmit={onSubmit} >
                <div className="container">
                    <div>
                        <label>Email:</label>
                        <input type="email" name='email' onChange={handleChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name='password' onChange={handleChange} />
                    </div>
                    {err && err}
                    <button>Login</button>
                </div>
            </form>

        </div>
    )
}

export default Login;
