import { Search, Person, Chat, Notifications } from '@material-ui/icons'

import './topbar.css'

export default function Topbar() {
  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <span className="logo">NodeBook</span>
      </div>
      <div className="topbar-center">
        <div className="searchbar">
          <Search className="searchbar-icon"/>
          <input type="text" className="searchbar-input" placeholder="Search for friends, posts or videos"/>
        </div>
      </div>
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
        <img src="/assets/person/1.jpeg" alt="" className="topbar-img" />
      </div>
    </div>
  )
}
