import './NavBar.css'
import React, { useEffect } from 'react'; // Step 1

import { Link } from 'react-router-dom'
import Login from '../Auth/Login'
import Logout from '../Auth/Logout'
export default function NavBar() {
    const userToken = localStorage.getItem("userToken");

    return (
        <div className='navbarContainer'>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
                {userToken ? <li><Logout></Logout></li> : <li style={{ padding: '5px 16px' }}><Login></Login></li>}
            </ul>
        </div>
    )
}