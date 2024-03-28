import React, { useContext } from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


const Home = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div>
home
<Link to={`/profile/${currentUser.id}`}>profile</Link>

        </div>
    )
}

export default Home
