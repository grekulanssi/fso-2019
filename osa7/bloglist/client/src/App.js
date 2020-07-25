import React, { useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import BlogList from './components/BlogList'
import BlogInfo from './components/BlogInfo'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import Notification from './components/Notification'
import './index.css'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { logoutUser, setUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

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

  const blogs = () => (
    <div>
      <BlogList />
      <Togglable buttonLabel='Add new blog' ref={blogFromRef}>
        <NewBlogForm />
      </Togglable>
    </div>
  )

  const navi = () => {
    const padding = {
      paddingLeft: '1em'
    }
    return (
      <div className='navi'>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <button type='submit' id='logoutButton' onClick={handleLogout}>log out</button>
        <span><em>Welcome, {user.name}!</em></span>
      </div>
    )
  }

  const header = () => {
    return(
      <div className='header'>
        {!user.token ? '' : navi()}
        <h1>Blog app</h1>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Notification />
        {header()}
        <Switch>
          <Route path="/blogs/:id">
            <BlogInfo />
          </Route>
          <Route path="/users/:id">
            <UserProfile />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/">
            <div>
              {user.token ? blogs() : <LoginForm />}
            </div>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App