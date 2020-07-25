import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()

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
      return(<div><span>Added by you</span><button className='removeButton' onClick={() => removeBlog(blog.id)}>remove</button></div>)
    }
    return(<div><span>Added by {blogUser.name}</span></div>)
  }

  return (
    <div>
      <div className='blogInfo'>
        <h2>{blog.title} by {blog.author}</h2>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a>
        <br />
        <button className='likeButton' onClick={() => dispatch(likeBlog(blog))}>{blog.likes} {blog.likes === 1 ? 'like' : 'likes'}</button>
        {addedBy()}
      </div>
    </div>
  )
}

export default BlogInfo