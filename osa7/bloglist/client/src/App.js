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

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  //console.log('state:', useSelector(state => state))

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

  const navi = () => (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
        </IconButton>
        <Button color='inherit' component={Link} to="/">blogs</Button>
        <Button color='inherit' component={Link} to="/users">users</Button>
        <Typography variant='body2' className='greeting'><em>Welcome, {user.name}!</em></Typography>
        <Button variant='contained' type='submit' id='logoutButton' onClick={handleLogout}>log out</Button>
      </Toolbar>
    </AppBar>
  )


  const header = () => {
    return(
      <div className='header'>
        {!user.token ? '' : navi()}
        <Typography variant='h1'>Blog app</Typography>
      </div>
    )
  }

  return (
    <Container>
      <Router>
        <div>
          <Notification />
          {header()}
          <Switch>
            <Route path="/blogs/:id">
              {user.token ? <BlogInfo /> : <LoginForm />}
            </Route>
            <Route path="/users/:id">
              {user.token ? <UserProfile /> : <LoginForm />}
            </Route>
            <Route path="/users">
              {user.token ? <UserList /> : <LoginForm />}
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
    </Container>
  )
}

export default App