import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeThisBlog }) => {

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const expandedContent = () => {
    let user = blog.user
    if(!user) user = { name: 'unknown user' }
    let blogUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    if(!blogUser) blogUser = { username: 'unknown' }
    const addedBy = () => {
      if(user.username === blogUser.username) {
        return(<div><span>Added by you</span><button className='removeButton' onClick={removeThisBlog}>remove</button></div>)
      }
      return(<div><span>Added by {user.name}</span></div>)
    }

    return (
      <li className='blogEntry'>
        <div className='blogOpened'>
          <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.title}</a> by {blog.author}
          <button className='detailsButton' onClick={toggleExpanded}>hide details</button>
          <br />
          <span>({blog.url}) {blog.likes} likes</span>
          <button className='likeButton' onClick={addLike}>like</button>
          <br />
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