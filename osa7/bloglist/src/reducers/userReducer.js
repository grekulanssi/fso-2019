import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FAILED_LOGIN':
      return {}
    case 'SET_USER':
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(action.data)
      )
      return action.data
    case 'LOGOUT_USER':
      return ''
    default: return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      await blogService.setToken(loggedInUser.token)
      dispatch(setNotification('Login successful!'))

      dispatch({
        type: 'SET_USER',
        data: loggedInUser
      })
    } catch (e) {
      dispatch(setNotification('Invalid username or password. Please try again.', true))
      dispatch({
        type: 'FAILED_LOGIN',
      })
    }

  }
}

export const setUser = user => {
  return async dispatch => {
    await blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logoutUser = (user) => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT_USER',
      data: user
    })
  }
}

export default userReducer