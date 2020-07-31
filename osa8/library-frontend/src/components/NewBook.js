import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, BOOKS_BY_GENRE, CREATE_BOOK } from '../queries'

const NewBook = ({ show, setError, setPage }) => {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message, 10)
    },
    refetchQueries: [ { query: ALL_AUTHORS } ],
    update: (store, response) => {
      let firstGenre = response.data.addBook.genres[0]
      console.log('firstGenre:', firstGenre)
      if(!firstGenre) {
        firstGenre = 'EXTRA'
      }

      const bookDataInStore = store.readQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: firstGenre }
      })
      console.log('bookDataInStore:', bookDataInStore)
      
      store.writeQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: firstGenre },
        data: {
          allBooks: [ ...bookDataInStore.allBooks, response.data.addBook ]
        }
      })

      // let's see if the write has added anything
      const newDataInStore = store.readQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: firstGenre }
      })
      console.log('newDataInStore', newDataInStore) 


      // read the book list with empty genre
      const allBookDataInStore = store.readQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: '' }
      })
      console.log('allBookDataInStore', allBookDataInStore)
      
      // add this book to the list with empty genre
      store.writeQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: '' },
        data: {
          allBooks: [ ...allBookDataInStore.allBooks, response.data.addBook ]
        }
      })
      
      // let's see if the write has added anything
      const newAllBookDataInStore = store.readQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: '' }
      })
      console.log('newAllBookDataInStore', newAllBookDataInStore)
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    if(!title || !name || !published || genres.length === 0) {
      setError('All fields are required!')
      return
    }

    try {
      const createdBook = await createBook({
        variables: {
          title, published, genres, name
        }
      })
    
      console.log('createdbook:', createdBook)

      setTitle('')
      setPublished('')
      setName('')
      setGenres([])
      setGenre('')

      setPage('books')

    } catch (e) {
      setError(`Adding book failed.`, 10)      
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title*
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author name*
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          published*
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres*: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
        <div>*) required (at least one genre)</div>
      </form>
    </div>
  )
}

export default NewBook


/*
TODO
- lisää kirja olemassaolevalle kirjailijalle olemassaolevaan genreen
OK  - päivittyykö authors sivun books laskuri tälle kirjialijalle
OK  - päivittyykö books sivun oikea genre
OK  - päivittyykö books sivun show all books
- lisää kirja uudelle kirjailijalle olemassaolevaan genreen
OK  - päivittyykö authors sivun books laskuri tälle kirjialijalle
OK  - päivittyykö books sivun oikea genre
OK  - päivittyykö books sivun show all books
- lisää kirja olemassaolevalle kirjailijalle uuteen genreen
  - päivittyykö authors sivun books laskuri tälle kirjialijalle
  - päivittyykö books sivun oikea genre
  - päivittyykö books sivun show all books
- lisää kirja uudelle kirjailijalle uuteen genreen
  - päivittyykö authors sivun books laskuri tälle kirjialijalle
  - päivittyykö books sivun oikea genre
  - päivittyykö books sivun show all books
- lisää kirja yhteen olemassaolevaan ja yhteen uuteen genreen
  - päivittyykö authors sivun books laskuri tälle kirjialijalle
  - päivittyykö books sivun oikea genre
  - päivittyykö books sivun show all books
- lisää kirja kahteen uuteen genreen
  - päivittyykö authors sivun books laskuri tälle kirjialijalle
  - päivittyykö books sivun oikea genre
  - päivittyykö books sivun show all books
  
   */