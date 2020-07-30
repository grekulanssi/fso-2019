import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_BOOK = gql`mutation createBook(
  $title: String!,
  $author: String!,
  $published: Int!,
  $genres: [String]!
) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author,
    published,
    genres
  }
}`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    if(!title || !author || !published || !genre) {
      alert('All fields are required!')
      return
    }
    const createdBook = await createBook({
      variables: {
        title, author, published, genres
      }
    })

    console.log('createdbook:', createdBook)

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')

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
          author*
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
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