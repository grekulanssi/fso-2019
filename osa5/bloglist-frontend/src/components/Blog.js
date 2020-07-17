import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  let user = blog.user
  if(!user) user = { name: 'unknown user' }

  const expandedContent = () => (
    <li className='blogEntry'>
      <div className='blogOpened'>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.title}</a> by {blog.author}
        <button onClick={toggleExpanded}>hide details</button>
        <br />
        <span>({blog.url}) {blog.likes} likes</span>
        <button className='likeButton' onClick={addLike}>like</button>
        <br />
        <span>Added by {user.name}</span>
      </div>
    </li>
  )

  const simpleContent = () => (
    <li className='blogEntry'>
      <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.title}</a> by {blog.author}
      <button className='detailsButton' onClick={toggleExpanded}>show details</button>
    </li>
  )

  return (expanded ? expandedContent() : simpleContent())
}

export default Blog