import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Typography from '@material-ui/core/Typography'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Typography variant='h2'>Blogs</Typography>
      <ul>
        <Typography variant='body1'>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </Typography>
      </ul>
    </div>
  )
}

export default BlogList