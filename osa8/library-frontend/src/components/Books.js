import React from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
  }
}`

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
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
    result.data.allBooks.map(b =>
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
          {(result.loading) ? loading() : listing()}
        </tbody>
      </table>
    </div>
  )
}

export default Books