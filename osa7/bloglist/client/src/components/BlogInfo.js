import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'

import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const blogArray = useSelector(store =>
    store.blogs.filter(b =>
      b.id === id))
  const blog = blogArray[0]

  if(!blog) return null

  const removeBlog = async id => {
    if(!window.confirm('are you sure you want to delete this blog?')) return
    try {
      await dispatch(deleteBlog(id))
      dispatch(setNotification('The blog was successfully deleted.', false, 5))
      history.push('/')
    } catch (e) {
      dispatch(setNotification('Deleting blog failed. Maybe it was alerady deleted.', true, 5))
    }
  }

  const addedBy = () => {
    let blogUser = blog.user
    if(!blogUser) blogUser = { name: 'unknown user' }
    let currentUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    if(!currentUser) currentUser = { username: 'unknown' }
    if(blogUser.username === currentUser.username) {
      return(<div><Typography variant='body1'><span>Added by you</span></Typography><button className='removeButton' onClick={() => removeBlog(blog.id)}>remove</button></div>)
    }
    return(<div><Typography variant='body1'><span>Added by {blogUser.name}</span></Typography></div>)
  }

  const comments = () => {
    if(!blog.comments) return null
    return (
      <div className='blogComments'>
        <Typography variant='h3'>Comments</Typography>
        <ul>
          <Typography variant='body1'>{blog.comments.map(c => <li key={c.id} >{c.content}</li>)}</Typography>
        </ul>
      </div>
    )
  }

  return (
    <div>
      <div className='blogInfo'>
        <Typography variant='h2'>{blog.title} by {blog.author}</Typography>
        <Typography variant='body1'><a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a></Typography>
        <br />
        <Tooltip title='like'>
          <button className='likeButton' onClick={() => dispatch(likeBlog(blog))}>{blog.likes} {blog.likes === 1 ? 'like' : 'likes'}</button>
        </Tooltip>
        {addedBy()}
        {comments()}
        <CommentForm blog={blog} />
      </div>
    </div>
  )
}

export default BlogInfo