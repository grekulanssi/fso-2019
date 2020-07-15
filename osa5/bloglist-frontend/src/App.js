import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
    setUser(user)
    setUsername('')
    setPassword('')
    } catch (e) {
      setErrorMessage('invalid credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
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
        <Notification message={errorMessage}/>
        <h1>Blog app</h1>
      </div>
      <div>
        {user === null ?
          loginForm() :
          <div>
            <p>Welcome, {user.name}!</p>
            {blogList()}
          </div>
          }
      </div>
    </div>
  )
}

export default App
