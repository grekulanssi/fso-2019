import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, CURRENT_USER } from '../queries'

const Recommendations = ({ show }) => {
  const [favGenre, setFavGenre] = useState('')
  const [getGenreBooks, result] = useLazyQuery(BOOKS_BY_GENRE)

  useEffect(() => {
    if(user.data)
      getGenreBooks({ variables: { genre: favGenre } })
  }, [favGenre]) // eslint-disable-line

  const user = useQuery(CURRENT_USER)

  useEffect(() => { 
    if(user.data) {
      setFavGenre(user.data.me.favoriteGenre)
    }
  }, [user])// eslint-disable-line

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
      <h2>the librarian's recommendations</h2>
      <div>books in your favorite genre <strong>{user.loading ? 'loading...' : favGenre}</strong>:</div>
      <br />
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

export default Recommendations