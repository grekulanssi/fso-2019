import React from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {  
  const dispatch = useDispatch()

  const handleComment = async (event) => {
    event.preventDefault()
    const comment = event.target.Comment.value
    event.target.Comment.value = ''
    await dispatch(commentBlog(blog, comment))
  }

  return(
    <div>
      <form onSubmit={handleComment}>
        <div>
          <input id='comment' type='text' name='Comment' />
        </div>
        <button type='submit' id='comment-button'>add comment</button>
      </form>
    </div>
  )
}

export default CommentForm

