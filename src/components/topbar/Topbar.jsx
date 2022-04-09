import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Search, Person, Chat, Notifications } from '@material-ui/icons'

import { AuthContext } from '../../context/AuthContext'
import Image from '../Image'

import './topbar.css'

export default function Topbar() {

  const { user } = useContext(AuthContext)

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">NodeBook</span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="searchbar">
          <Search className="searchbar-icon"/>
          <input type="text" className="searchbar-input" placeholder="Search for friends, posts or videos"/>
        </div>
      </div>
      {
        user ?
          <div className="topbar-right">
            <div className="topbar-links">
              <span className="topbar-link">Homepage</span>
              <span className="topbar-link">Timeline</span>
            </div>
            <div className="topbar-icons">
              <div className="topbar-icon">
                <Person />
                <span className="topbar-icon-badge">1</span>
              </div>
              <div className="topbar-icon">
                <Chat />
                <span className="topbar-icon-badge">3</span>
              </div>
              <div className="topbar-icon">
                <Notifications />
                <span className="topbar-icon-badge">0</span>
              </div>
            </div>
            <Link to={`/profile/${user.username}`}>
              <Image src={user.profilePic || 'person/noAvatar.png'} alt="" className="topbar-img" />
            </Link>
          </div>
          :
          <div className="topbar-right">
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>Log In</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>Register</Link>
          </div>
      }
    </div>
  )
}
