import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ addNewBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const fixUrl = (url) => {
    if (url && !/^[a-zA-Z]+:\/\//i.test(url)) return 'http://' + url
    return url
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    console.log('adding new blog;', newBlogTitle, newBlogAuthor, newBlogUrl)

    addNewBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: fixUrl(newBlogUrl)
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleNewBlog}>
        <ul>
          <li><span>title:</span>
            <input
              id='title' type='text' value={newBlogTitle} name='Title' onChange={
                ({ target }) => setNewBlogTitle(target.value)
              }
            />
          </li>
          <li><span>author:</span>
            <input
              id='author' type='text' value={newBlogAuthor} name='Author' onChange={
                ({ target }) => setNewBlogAuthor(target.value)
              }
            />
          </li>
          <li><span>url:</span>
            <input
              id='url' type='text' value={newBlogUrl} name='Url' onChange={
                ({ target }) => setNewBlogUrl(target.value)
              }
            />
          </li>
        </ul>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm
