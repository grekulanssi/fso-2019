import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const u = event.target.Username.value
    const p = event.target.Password.value
    event.target.Username.value = ''
    event.target.Password.value = ''
    await dispatch(loginUser(u, p))
  }

  return(
    <div>
      <h2>Please log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input id='username' type='text' name='Username' />
        </div>
        <div>
          <span>password</span>
          <input id='password' type='password' name='Password' />
        </div>
        <button type='submit' id='login-button'>log in</button>
      </form>
    </div>
  )
}

export default LoginForm