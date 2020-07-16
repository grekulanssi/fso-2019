import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import InfoNotification from './components/InfoNotification'
import ErrorNotification from './components/ErrorNotification'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorNotificationMessage, setErrorNotificationMessage] = useState(null)
  const [InfoNotificationMessage, setInfoNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFromRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, '&', password)
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      await blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setInfoNotificationMessage('Login successful!')
      setTimeout(() => {
        setInfoNotificationMessage(null)
      }, 5000)
    } catch (e) {
      setErrorNotificationMessage('Invalid username or password. Please try again.')
      setTimeout(() => {
        setErrorNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user', username)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setInfoNotificationMessage('You have now successfully logged out. See you soon!')
    setTimeout(() => {
      setInfoNotificationMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <div>
      <h2>Please log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input
            type='text' value={username} name='Username' onChange={
              ({ target }) => setUsername(target.value)
            }
          />
        </div>
        <div>
          <span>password</span>
          <input
            type='password' value={password} name='Password' onChange={
              ({ target }) => setPassword(target.value)
            }
          />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  )

  const logoutButton = () => (
    <div>
      <form onSubmit={handleLogout}>
        <button type='submit'>log out</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setInfoNotificationMessage(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added.`)
      setTimeout(() => {
        setInfoNotificationMessage(null)
      }, 5000)
      blogFromRef.current.toggleVisibility()
    } catch (e) {
      setErrorNotificationMessage('Adding blog failed. Please try again.')
      setTimeout(() => {
        setErrorNotificationMessage(null)
      }, 5000)
    }
  }

  const loggedInContent = () => (
    <div>
      <p>Welcome, {user.name}!</p>
      {logoutButton()}
      {blogList()}
      <Togglable buttonLabel='Add new blog' ref={blogFromRef}>
        <NewBlogForm addNewBlog={addBlog} />
      </Togglable>
    </div>
  )

  return (
    <div>
      <div>
        <ErrorNotification message={errorNotificationMessage} />
        <InfoNotification message={InfoNotificationMessage} />
        <h1>Blog app</h1>
      </div>
      <div>
        {user === null
          ? loginForm()
          : loggedInContent()}
      </div>
    </div>
  )
}

export default App
