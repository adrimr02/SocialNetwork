import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'

import './login.css'

export default function Login() {
  const { isFetching, dispatch } = useContext(AuthContext)

  const email = useRef()
  const password = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFetching)
      return;

    loginCall({ email: email.current.value, password: password.current.value }, dispatch)
  }

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">NodeBook</h3>
          <span className="login-desc">Connect with your friends and other people all around the world.</span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleSubmit}>
            <input placeholder='Email' type='email' className='loginInput' ref={email} required />
            <input placeholder='Password' type='password' minLength={6} className='loginInput' ref={password} required />
            <button className='loginButton' type='submit' disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="30px"/> : "Log In"}</button>
            <span className='loginForgot'>Forgot Password?</span>
            <Link className='loginRegisterButton' to="/register">Create a New Account</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
