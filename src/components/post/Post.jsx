import { useState, useEffect, useContext } from 'react'
import { MoreVert } from '@material-ui/icons'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import Image from '../Image'

import './post.css'

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [user, setUser] = useState({})
  const [isLiked, setIsLiked] = useState(false)
  const { user: currentUser } = useContext(AuthContext)

  const likeHandle = () => {

    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id })
    } catch (err) {
      console.error(err)
    }

    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users?userid=${ post.userId }`)
      setUser(res.data.user)
    }
    fetchUsers()
  }, [post.userId])

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`/profile/${user.username}`} style={{display: 'flex', alignItems: 'center', textDecoration:'none', color: 'InfoText'}}>
              <Image className="post-profile-img" src={user.profilePic || "person/noAvatar.png"} alt="" />
              <span className="post-username">{user.username}</span>
            </Link>
            <span className="post-date">{format(post.createdAt)}</span>
          </div>
          <div className="post-top-right">
            <MoreVert className="post-options-icon"/>
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post?.desc}</span>
          {
            post.img ? <Image className="post-img" src={post?.img} alt="" /> : null
          }
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <Image className="post-heart-icon" src="heart.png" alt="" onClick={likeHandle} />
            <span className="post-heart-counter">{like} people like it</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
