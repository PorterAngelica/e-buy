import React from 'react'
import "./register.css"

const Register = () => {
    return (
        <div>
<form >
            <div className="container">
            <div>
                <label> First name:</label>
                <input type="text"/>
            </div>

            <div>
                <label> last name:</label>
                <input type="text"/>
            </div>
            <div>
                <label>Email:</label>
                <input type="email"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password"/>
            </div>
            <div>
                <label>confirm:</label>
                <input type="password"/>
            </div>
            </div>
        </form>

        </div>
    )
}

export default Register
