import React, { useContext } from 'react'
import "./navBar.css"
import { FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FaOpencart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const NavBar = () => {
    const { logout } = useContext(AuthContext);
    const {currentUser} = useContext(AuthContext)

    const handleLogout = async () => {
        logout()
    }
    return (
        <div className='Nav' >
            <div className="left">
                <div className="logo">
                    <Link to="/home" >
                <h1>EBUY</h1>
                    </Link>
                <FaOpencart size={50} />
            </div>
            </div>
            <div className="right">
            <Link to="/shoppingCart">
            <FiShoppingCart size={35} style={{marginLeft:"50px"}} />
            </Link>

            <Link to={`/profile/${currentUser.id}`}>
            <FaUser size={35} style={{marginLeft:"50px"}}/>
            </Link>

            
            <IoMdLogOut size={35} style={{marginLeft:"50px"}} onClick={handleLogout} />

            </div>
        </div>
    )
}

export default NavBar
