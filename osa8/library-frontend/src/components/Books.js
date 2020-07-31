import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('all books')

  const books = useQuery(ALL_BOOKS)
  let allGenres = []
  if(!books.loading) {
    allGenres = books.data.allBooks.map(
      b => b.genres).flat().filter((g, i, array) => array.indexOf(g) === i)
  }

  if (!show) {
    return null
  }

  const loading = () => (
    <tr key='loading'>
      <td>loading</td>
      <td>loading</td>
      <td>loading</td>
    </tr>
  )

  const listing = () => {
    return (    
    books.data.allBooks
      .filter(b => genre === 'all books' ? true : b.genres.includes(genre))
      .map(b =>
      <tr key={b.title}>
        <td>{b.title}</td>
        <td>{b.author.name}</td>
        <td>{b.published}</td>
      </tr>
    )
  )}

  return (
    <div>
      <h2>books</h2>
      <div>in genre <strong>{genre}</strong>:</div>
      <div className='genreSelector'>
        <div>select genre:</div>
        {allGenres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
        <br /><br />
        <button key='all' onClick={() => setGenre('all books')}>show all books</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {(books.loading) ? loading() : listing()}
        </tbody>
      </table>
    </div>
  )
}

export default Books