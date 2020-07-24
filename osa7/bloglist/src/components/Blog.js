import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const removeBlog = async blogId => {
    if(!window.confirm('are you sure you want to delete this blog?')) return
    try {
      await dispatch(deleteBlog(blogId))
      dispatch(setNotification('The blog was successfully deleted.', false, 5))
    } catch (e) {
      dispatch(setNotification('Deleting blog failed. Maybe it was alerady deleted.', true, 5))
    }
  }

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const expandedContent = () => {
    let blogUser = blog.user
    if(!blogUser) blogUser = { name: 'unknown user' }
    let currentUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    if(!currentUser) currentUser = { username: 'unknown' }

    const addedBy = () => {
      if(blogUser.username === currentUser.username) {
        return(<div><span>Added by you</span><button className='removeButton' onClick={() => removeBlog(blog.id)}>remove</button></div>)
      }
      return(<div><span>Added by {blogUser.name}</span></div>)
    }

    return (
      <li className='blogEntry'>
        <div className='blogOpened'>
          <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.title}</a> by {blog.author}
          <button className='detailsButton' onClick={toggleExpanded}>hide details</button>
          <br />
          <span>({blog.url}) {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}</span>
          <button className='likeButton' onClick={() => dispatch(likeBlog(blog))}>like</button>
          {addedBy()}
        </div>
      </li>
    )}

  const simpleContent = () => (
    <li className='blogEntry'>
      <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.title}</a> by {blog.author}
      <button className='detailsButton' onClick={toggleExpanded}>show details </button>
    </li>
  )

  return (expanded ? expandedContent() : simpleContent())
}

export default Blog