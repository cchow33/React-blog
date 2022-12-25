import React from 'react'
import { useParams, Link } from 'react-router-dom'

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  // const post = posts.find(post => (post.id).toString() === id);
  const post = posts.find(post => post.id == id);

  return (
    <main className='PostPage'>
      <article className='post'>
      
      {/* If there is a post to delete:  */}
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>

            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>

            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          
          </>
        }
      {/* If there isn't a post to delete:  */}
        {!post &&
          <>
            <h2>Post not found</h2>
            <p>
              <Link to='/'>Return to Home Page</Link>
            </p>
          </>
        }

      </article>
    </main>
  )
}

export default PostPage