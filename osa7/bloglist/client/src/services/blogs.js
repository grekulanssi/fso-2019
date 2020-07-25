import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async newBlogObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlogObject, config)
  return response.data
}

// only used internally until there is a need to update other than likes
const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const addLike = async blog => {
  return update(blog.id, { ...blog, likes: blog.likes + 1 })
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, createNew, setToken, addLike, remove }
