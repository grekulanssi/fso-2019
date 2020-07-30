import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {

  const books = useQuery(ALL_BOOKS)

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

  const listing = () => (
    books.data.allBooks.map(b =>
      <tr key={b.title}>
        <td>{b.title}</td>
        <td>{b.author}</td>
        <td>{b.published}</td>
      </tr>
    )
  )

  return (
    <div>
      <h2>books</h2>
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