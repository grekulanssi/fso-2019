import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorNotificationMessage('Invalid credentials. Please try again.')
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
    setInfoNotificationMessage(`You have now successfully logged out. See you soon!`)
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
          <input type="text" value={username} name="Username" onChange={
            ({ target }) => setUsername(target.value)
          }/>
        </div>
        <div>
          <span>password</span>
          <input type="password" value={password} name="Password" onChange={
            ({ target }) => setPassword(target.value)
          }/>
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )

  const logoutButton = () => (
    <div>
      <form onSubmit={handleLogout}>
        <button type ="submit">log out</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
        <h2>blogs</h2>
        <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </ul>
      </div>
  )

  return (
    <div>
      <div>
        <ErrorNotification message={errorNotificationMessage}/>
        <InfoNotification message={InfoNotificationMessage}/>
        <h1>Blog app</h1>
      </div>
      <div>
        {user === null ?
          loginForm() :
          <div>
            <p>Welcome, {user.name}!</p>
            {logoutButton()}
            {blogList()}
          </div>
          }
      </div>
    </div>
  )
}

export default App
