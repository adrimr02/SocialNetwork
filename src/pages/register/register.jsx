import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import { registerCall } from '../../apiCalls'
import './register.css'

export default function Register() {
  const { isFetching, dispatch } = useContext(AuthContext)

  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!")
      return;
    }
    if (isFetching)
      return;

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value
    }

    registerCall(user, dispatch)
  }

  return (
    <div className="register">
      <div className="register-wrapper">
        <div className="register-left">
          <h3 className="register-logo">NodeBook</h3>
          <span className="register-desc">Connect with your friends and other people all around the world.</span>
        </div>
        <div className="register-right">
          <form className="register-box" onSubmit={handleSubmit} >
            <input placeholder='Username' className='registerInput' ref={username} required />
            <input placeholder='Email' type='email'className='registerInput' ref={email} required />
            <input placeholder='Password' type='password' minLength={6} className='registerInput' ref={password} required />
            <input placeholder='Password Again' type='password' minLength={6} className='registerInput' ref={passwordAgain} required />
            <button className='registerButton' type='submit' disabled={isFetching} >{isFetching ? <CircularProgress color='inherit'size="30px"/> : "Creat Account"}</button>
            <Link className='registerLoginButton' to="/login" >Log In with existing Account</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
