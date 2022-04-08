import { useState, useEffect } from 'react'

import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'

import Image from '../../components/Image'

import  './profile.css'

export default function Profile() {
  return (
    <>
    <Topbar />
    <div className="profile">
      <Sidebar />
      <div className="profile-right">
        <div className="profile-right-top">
          <div className="profile-cover">
            <Image src="post/3.jpeg" alt="" className="profile-cover-img" />
            <Image src="person/7.jpeg" alt="" className="profile-user-img" />
          </div>
          <div className="profile-info">
            <h4 className="profile-info-name">Nombre</h4>
            <span className="profile-info-desc">Descripcion</span>
          </div>
        </div>
        <div className="profile-right-bottom">
          <Feed profile />
          <Rightbar profile />
        </div>
      </div>
    </div>
  </>
  )
}
