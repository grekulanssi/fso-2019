import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  let newState = state
  switch(action.type) {
    case 'LIKE': {
      const likedBlog = action.data
      newState = state.map(blog =>
        blog.id === likedBlog.id ? likedBlog : blog)
      break
    }
    case 'NEW_BLOG':
      newState = [...state, action.data]
      break
    case 'DELETE_BLOG':
      newState = state.filter(blog =>
        blog.id !== action.data)
      break
    case 'INIT_BLOGS':
      newState = action.data.sort((a, b) => b.likes - a.likes)
      break
    default: break
  }
  return newState.sort((a, b) => b.likes - a.likes)
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.addLike(blog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.createNew(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer