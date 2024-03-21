import React from 'react'
import "./login.css"

const Login = () => {
    return (
        <div>
        <form >
            <div className="container">
            <div>
                <label>Email:</label>
                <input type="email"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password"/>
            </div>
            </div>
        </form>

        </div>
    )
}

export default Login
