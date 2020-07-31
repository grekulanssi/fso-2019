import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendations from './components/Recommendations'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const client = useApolloClient()

  useEffect(() => {
    const token = window.localStorage.getItem('libraryapp-user-token')
    if(!token) return
    setToken(token)
  }, [])
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      window.alert('New book added!')
    }
  })

  // Version 2: polling every 2 seconds:
  /*const authorsResult = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })*/
  // If you want to use version 2, please see Authors.js

  const notify = (message, durationSeconds = 5) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1000 * durationSeconds);
  }

  const handleLogout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
      <h1>Library</h1>
      </div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? '' : <button onClick={() => setPage('login')}>login</button>}
        {token ? <button onClick={() => setPage('recommendations')}>recommendations</button> : ''}
        {token ? <button onClick={() => setPage('add')}>add book</button> : ''}
        {token ? <button onClick={() => handleLogout()}>logout</button> : ''}
      </div>

      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

      <LoginForm
          setToken={setToken}
          setError={notify}
          show={page === 'login'}
          setPage={setPage}
        />

      <NewBook
        show={page === 'add'}
        setError={notify}
        setPage={setPage}
      />
      <div>
      <Notification errorMessage={errorMessage} />
      </div>
    </div>
  )
}

const Notification = ({ errorMessage }) => (
  {errorMessage} ? <div className='notification'>{errorMessage}</div> : null
)

export default App