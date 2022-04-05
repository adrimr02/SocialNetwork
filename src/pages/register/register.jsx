import './register.css'

export default function Login() {
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">NodeBook</h3>
          <span className="login-desc">Connect with your friends and other people all around the world.</span>
        </div>
        <div className="login-right">
          <div className="login-box">
            <input placeholder='Name' className='loginInput' />
            <input placeholder='Email' className='loginInput' />
            <input placeholder='Password' type='password' className='loginInput' />
            <button className='loginButton'>Create Account</button>
            <button className='loginRegisterButton'>Log In with existing Account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
