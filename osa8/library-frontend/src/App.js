import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

const EDIT_AUTHOR = gql`mutation addAuthorBorn(
  $name: String!,
  $born: Int!
  ) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name,
      born,
      bookCount
    }
  }
`

const App = () => {
  const authorsResult = useQuery(ALL_AUTHORS)
  
  // Version 2: polling every 2 seconds:
  /*const authorsResult = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })*/
  // If you want to use version 2, please see Authors.js

  const booksResult = useQuery(ALL_BOOKS)

  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsResult}
        ALL_AUTHORS={ALL_AUTHORS}
        EDIT_AUTHOR={EDIT_AUTHOR}
      />

      <Books
        show={page === 'books'}
        books={booksResult}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App