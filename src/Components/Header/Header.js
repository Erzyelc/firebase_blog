import React from 'react'
import './Header.css'
import {Link, useNavigate} from 'react-router-dom'
import { FaHome} from "react-icons/fa";
import {auth} from '../../Config/FirebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'

function Header() {

    //get user info
    const [user] = useAuthState(auth)

    const categories = ["Health", "Food", "Travel", "Technology"]

    let navigate = useNavigate();
  return (
    <div className="header-container">
    <FaHome onClick={() => navigate("/")} className="fa-home"/>
        <div className='categories-container'>
            {
                categories.map(item => <Link to={`/category/${item}` }
                className="nav-link" key={item}>{item}</Link>)
            }
        </div>
        {
          user?
          <div>
            <span className="username">{user.displayName}</span>
            <button className="auth-link"
              onClick={() => signOut(auth)}>Logout</button>
          </div>
          :
          <Link className="auth-link" to="/auth">Signup</Link>
        }
    </div>
  )
}

export default Header