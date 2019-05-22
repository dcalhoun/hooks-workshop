import React, { useEffect, useState } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {
  const [createdAt, setCreatedAt] = useState(Date.now())
  const [posts, setPosts] = useState([])
  const [newPosts, setNewPosts] = useState([])
  const [limit, setLimit] = useState(3)
  useEffect(() => {
    let isCurrent = true
    loadFeedPosts(createdAt, limit).then(fetchedPosts => {
      if (isCurrent) setPosts(fetchedPosts)
    })
    return () => (isCurrent = false)
  }, [createdAt, limit])

  useEffect(() => {
    return subscribeToNewFeedPosts(createdAt, incomingPosts => {
      setNewPosts(incomingPosts)
    })
  }, [createdAt])

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button
            className="Feed_new_posts_button icon_button"
            onClick={() => {
              setPosts([...newPosts, ...posts])
              setLimit(limit + newPosts.length)
              setCreatedAt(Date.now())
              setNewPosts([])
            }}
          >
            View {newPosts.length} New Posts
          </button>
        </div>
      )}

      {posts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={() => {
            setLimit(limit + 3)
          }}
        >
          View More
        </button>
      </div>
    </div>
  )
}
