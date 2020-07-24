import React, { useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import './index.css'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  console.log('state:', useSelector(state => state))

  const blogFromRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)))
    }
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser(user))
    dispatch(setNotification('You have now successfully logged out. See you soon!'))
  }

  const logoutButton = () => (
    <div>
      <form onSubmit={handleLogout}>
        <button type='submit' id='logout-button'>log out</button>
      </form>
    </div>
  )

  const loggedInContent = () => (
    <div>
      <p>Welcome, {user.name}!</p>
      {logoutButton()}
      <BlogList />
      <Togglable buttonLabel='Add new blog' ref={blogFromRef}>
        <NewBlogForm />
      </Togglable>
    </div>
  )

  return (
    <div>
      <div>
        <Notification />
        <h1>Blog app</h1>
      </div>
      <div>
        {user.token ? loggedInContent() : <LoginForm />}
      </div>
      <Footer />
    </div>
  )
}

export default App