import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  
  // Version 2: polling every 2 seconds:
  /*const authorsResult = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })*/
  // If you want to use version 2, please see Authors.js

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
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