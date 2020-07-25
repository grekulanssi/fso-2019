import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => (
  <li className='blogEntry'>
    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author} ({blog.likes})
  </li>
)

export default Blog