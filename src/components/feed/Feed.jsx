import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Share from '../share/Share'
import Post from '../post/Post'
import { AuthContext } from '../../context/AuthContext'

import './feed.css'

export default function Feed({ username }) {
  const [posts, setPosts] = useState([])

  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`)
        
      setPosts(res.data)
    }
    fetchPosts()
  }, [username])
  // https://youtu.be/pFHyZvVxce0?t=2513
  return (
    <div className="feed">
      <div className="feed-wrapper">
        {
          user ? 
            <Share />
            : null
        }
        {posts.map(post => (
          <Post key={post._id} post={post}/>
        ))}
      </div>
    </div>
  )
}
