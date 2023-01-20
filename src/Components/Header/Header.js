import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import { FaHome} from "react-icons/fa";

function Header() {
    const categories = ["Health", "Food", "Travel", "Technology"]
  return (
    <div className="header-container">
    <FaHome />
        <div className='categories-container'>
            {
                categories.map(item => <Link to={`/category/${item}` }
                className="nav-link" key={item}>{item}</Link>)
            }
        </div>
        <button className="auth-link">Signup</button>
    </div>
  )
}

export default Header