import { useState } from 'react'
import { MoreVert } from '@material-ui/icons'

import Image from '../Image'

import { Users } from '../../dummyData'

import './post.css'

export default function Post({ post }) {
  const user = Users.find(user=>user.id===post.userId)
  const [like, setLike] = useState(post.like)
  const [isLiked, setIsLiked] = useState(false)

  const likeHandle = () => {
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Image className="post-profile-img" src={user.profilePicture} alt="" />
            <span className="post-username">{user.username}</span>
            <span className="post-date">{post.date}</span>
          </div>
          <div className="post-top-right">
            <MoreVert className="post-options-icon"/>
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post?.desc}</span>
          <Image className="post-img" src={post?.photo} alt="" />
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
