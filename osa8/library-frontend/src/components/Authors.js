import React from 'react'

const Authors = ({ show, authors }) => {

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
    authors.data.allAuthors.map(a =>
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
          {(authors.loading) ? loading() : listing()}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
