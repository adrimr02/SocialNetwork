import { LocationCity, Cake, CakeOutlined } from '@material-ui/icons'
import { Users } from '../../dummyData'
import './rightbar.css'

export default function Rightbar({ profile }) {

  const ProfileRightbar = () => {
    return(
      <>
        <h4 className="rightbar-title" >User information</h4>
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <LocationCity className="rightbar-info-icon"/>
            <span className="rightbar-info-key">Location:</span>
            <span className="rightbar-info-value">Gijon</span>
          </div>
          <div className="rightbar-info-item">
            <CakeOutlined className="rightbar-info-icon"/>
            <span className="rightbar-info-key">Birthday:</span>
            <span className="rightbar-info-value">27/10</span>
          </div>
        </div>
        <h4 className="rightbar-title">User friends</h4>
        <div className="rightbar-following-list">
          <div className="rightbar-following">
            <img src="/assets/person/3.jpeg" alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">Claudia</span>
          </div>
          <div className="rightbar-following">
            <img src="/assets/person/3.jpeg" alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">Claudia</span>
          </div>
          <div className="rightbar-following">
            <img src="/assets/person/3.jpeg" alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">Claudia</span>
          </div>
          <div className="rightbar-following">
            <img src="/assets/person/3.jpeg" alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">Claudia</span>
          </div>
          <div className="rightbar-following">
            <img src="/assets/person/3.jpeg" alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">Claudia</span>
          </div>
          <div className="rightbar-following">
            <img src="/assets/person/3.jpeg" alt="" className="rightbar-following-img" />
            <span className="rightbar-following-name">Claudia</span>
          </div>
        </div>
      </>
    )
  }

  const HomeRightbar = () => {
    return(
      <>
        <div className="birthday-container">
          <img src="/assets/gift.png" alt="" className="birthday-img" />
          <span className="birthday-text">
            {" "}
            <b>Robert</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbar-ad" src="/assets/ad.png" alt="" />
        <h4 className="rightbar-title">Online Friends</h4>
        <ul className="rightbar-friend-list">
          {Users.map(user => (
          <li key={user.id} className="rightbar-friend">
            <div className="rightbar-profile-img-container">
              <img className="rightbar-profile-img" src={user.profilePicture} alt="" />
              <span className="rightbar-online"></span>
            </div>
            <span className="rightbar-username">{user.username}</span>
          </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        <ProfileRightbar/>
      </div>
    </div>
  )
}
