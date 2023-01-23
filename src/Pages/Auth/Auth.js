import React from 'react'
import './Auth.css'
import {auth} from '../../Config/FirebaseConfig'
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Auth() {
    let navigate = useNavigate();

    //create state to know if existing user
    const [existingUser, setExistingUser] = React.useState(false)
    //create state for user inputs
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')

    const handleSignup = (e) => {
        e.preventDefault()
        console.log(email,password,name)
        //create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log(res.user)
            //add name
            updateProfile(auth.currentUser, {displayName: name})
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            navigate('/')
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="auth-container">
        {
            existingUser?
            <form className="auth-form" onSubmit={handleLogin}>
                <h1>Login with your email</h1>
                <div className="form-group">
                    <input type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required />
                    <input type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required />
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <span className="form-link" onClick={() => setExistingUser(false)}>Sign up</span></p>
            </form>
            :
            <form className="auth-form" onSubmit={handleSignup}>
                <h1>Sign up with your email</h1>
                <div className="form-group">
                    <input type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required />
                    <input type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required />
                    <input type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required />
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <span className="form-link" onClick={() => setExistingUser(true)}>login</span></p>                
            </form>
        }
    </div>
  )
}

export default Auth