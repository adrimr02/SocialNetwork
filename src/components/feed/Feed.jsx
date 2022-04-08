import { useEffect, useState } from 'react'
import axios from 'axios'

import Share from '../share/Share'
import Post from '../post/Post'

import './feed.css'

export default function Feed({ username }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
        ? await axios.get(`posts/profile/${username}`)
        : await axios.get("posts/timeline/61a7dc92ee69063669730fff")
        
      setPosts(res.data)
    }
    fetchPosts()
  }, [username])
  // https://youtu.be/pFHyZvVxce0?t=2513
  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        {posts.map(post => (
          <Post key={post._id} post={post}/>
        ))}
      </div>
    </div>
  )
}
