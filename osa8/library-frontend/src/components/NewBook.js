import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_GENRES, BOOKS_BY_GENRE, CREATE_BOOK } from '../queries'

const NewBook = ({ show, setError, setPage }) => {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_GENRES },
      { query: BOOKS_BY_GENRE, variables: { genre: '' } }
    ]
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
      setError(`Adding book failed. ${e.graphQLErrors[0].message}`, 10)
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