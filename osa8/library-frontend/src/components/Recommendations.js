import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommendations = ({ show }) => {
  let favGenre = '(no favorite genre)'

  const books = useQuery(ALL_BOOKS)
  const user = useQuery(CURRENT_USER)

  if(!user.loading) {
    favGenre = user.data.me.favoriteGenre
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
      .filter(b => b.genres.includes(favGenre))
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
          {(books.loading) ? loading() : listing()}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations