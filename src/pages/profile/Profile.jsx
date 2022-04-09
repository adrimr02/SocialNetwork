import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'

import Image from '../../components/Image'

import  './profile.css'

export default function Profile() {

  const [user, setUser] = useState({})

  const username = useParams().username

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data.user)
    }

    fetchUser()
  }, [username])

  // https://youtu.be/pFHyZvVxce0?t=3283
  
  return (
    <>
    <Topbar />
    <div className="profile">
      <Sidebar />
      <div className="profile-right">
        <div className="profile-right-top">
          <div className="profile-cover">
            <Image src={user.coverPic || "person/noCover.png"} alt="" className="profile-cover-img" />
            <Image src={user.profilePic || "person/noAvatar.png"} alt="" className="profile-user-img" />
          </div>
          <div className="profile-info">
            <h4 className="profile-info-name">{user.username}</h4>
            <span className="profile-info-desc">{user.desc}</span>
          </div>
        </div>
        <div className="profile-right-bottom">
          <Feed username={username} />
          <Rightbar user={user} />
        </div>
      </div>
    </div>
  </>
  )
}
