import Share from '../share/Share'
import Post from '../post/Post'

import './feed.css'
import { useEffect, useState } from 'react'

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log()
  })
  // https://youtu.be/pFHyZvVxce0?list=PLj-4DlPRT48lXaz5YLvbLC38m25W9Kmqy&t=1264
  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        {posts.map(post => (
          <Post key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}
