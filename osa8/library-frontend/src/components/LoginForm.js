import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {      
      const token = result.data.login.value
      setToken(token)
      window.localStorage.setItem('libraryapp-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password } })
      ? setPage('authors')
      : setPage('login')
  }

  return (
    <div>
      <h2>Please log in</h2>
      <form onSubmit={submit}>
        <div>
          username: <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm