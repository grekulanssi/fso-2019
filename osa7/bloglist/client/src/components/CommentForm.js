import React from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
          <TextField label='comment' id='comment' type='text' name='Comment' />
        </div>
        <br />
        <Button variant='contained' type='submit' id='comment-button'>add comment</Button>
      </form>
    </div>
  )
}

export default CommentForm

