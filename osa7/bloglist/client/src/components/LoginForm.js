import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const LoginForm = () => {
  const dispatch = useDispatch()
  let history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    const u = event.target.Username.value
    const p = event.target.Password.value
    event.target.Username.value = ''
    event.target.Password.value = ''
    await dispatch(loginUser(u, p))
    history.push('/')
  }

  return(
    <div>
      <Typography variant='h2'>Please log in</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label='username' id='username' type='text' name='Username' />
        </div>
        <div>
          <TextField label='password' id='password' type='password' name='Password' />
        </div>
        <br />
        <Button variant='contained' color='primary' type='submit' id='login-button'>log in</Button>
      </form>
    </div>
  )
}

export default LoginForm