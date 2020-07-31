import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_GENRES, BOOKS_BY_GENRE } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState('')
  const [getGenreBooks, result] = useLazyQuery(BOOKS_BY_GENRE)

  const showGenreBooks = (genreToShow) => {
    getGenreBooks({ variables: { genre: genreToShow } })
  }

  useEffect(() => {
    if(result.data) {
      setGenre(result.variables.genre)
    }
  }, [result])

  useEffect(() => {
    getGenreBooks({ variables: { genre: '' } })
  }, []) // eslint-disable-line

  const genreQuery = useQuery(ALL_GENRES)
  let allGenres = []

  if(!genreQuery.loading) {
    allGenres = genreQuery.data.allBooks.map(
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
    if(!result.data) return(loading())
    return(
      result.data.allBooks
        .map(b =>
          <tr key={b.title}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        )
    )
  }

  return (
    <div>
      <h2>books</h2>
      <div>in genre <strong className='genreName'>{genre === '' ? 'all books' : genre}</strong>:</div>
      <div className='genreSelector'>
        <div>select genre:</div>
        {allGenres.map(g => <button key={g} onClick={() => showGenreBooks(g)}>{g}</button>)}
        <br /><br />
        <button key='all' onClick={() => showGenreBooks('')}>show all books</button>
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
          {listing()}
        </tbody>
      </table>
    </div>
  )
}

export default Books