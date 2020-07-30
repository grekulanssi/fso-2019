  
import React from 'react'
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

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  let authors = {}

  if(!result.loading) authors = result.data.allAuthors

  const loading = () => (
    <tr key='loading'>
      <td>loading</td>
      <td>loading</td>
      <td>loading</td>
    </tr>
  )

  const listing = () => (
    authors.map(a =>
      <tr key={a.name}>
        <td>{a.name}</td>
        <td>{a.born ? a.born : '?'}</td>
        <td>{a.bookCount}</td>
      </tr>
    )
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {(result.loading) ? loading() : listing()}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
