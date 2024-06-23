import './NavBar.css'
import { Link } from 'react-router-dom'
import Home from '../pages/Home'
export default function NavBar() {
    return (
        <div className='navbarContainer'>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </div>
    )
}