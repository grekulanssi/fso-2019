import React from 'react'
const Blog = ({ blog }) => (
  <li>
    <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.title}</a> by {blog.author}
  </li>
)

export default Blog
