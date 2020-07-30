import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

const Authors = ({ show, authors, ALL_AUTHORS, EDIT_AUTHOR }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  // Version 2. To enable version 2, please see App.js
  //const [ editAuthor ] = useMutation(EDIT_AUTHOR)
  // Then you can fix props between this and App.js

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
  
  const submit = async (event) => {
    event.preventDefault()

    if(!name || !born) {
      alert('All fields are required!')
      return
    }
    if(born > new Date().getFullYear()) {
      alert(`Born year can't be in the future!`)
      return
    }
    const allAuthors = authors.data.allAuthors.filter(a => a.name === name)    
    if(allAuthors.length === 0) {
      alert(`There's no such author as ${name}!`)
      return
    }

    await editAuthor({
      variables: {
        name, born
      }
    })

    setName('')
    setBorn('')
  }

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
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name*
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born*
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
        <div>*) required</div>
      </form>
    </div>
  )
}

export default Authors
