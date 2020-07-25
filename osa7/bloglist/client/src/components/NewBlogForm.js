import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogForm = () => {
  const dispatch = useDispatch()

  const fixUrl = (url) => {
    if (url && !/^[a-zA-Z]+:\/\//i.test(url)) return 'http://' + url
    return url
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: event.target.Title.value,
        author: event.target.Author.value,
        url: fixUrl(event.target.Url.value)
      }
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`A new blog "${newBlog.title}" by ${newBlog.author} added.`, false, 5))
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
    } catch (e) {
      dispatch(setNotification('Adding blog failed. Please try again.', true, 5))
    }
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <ul>
          <li><span>title:</span>
            <input id='title' type='text' name='Title'/>
          </li>
          <li><span>author:</span>
            <input id='author' type='text' name='Author'/>
          </li>
          <li><span>url:</span>
            <input id='url' type='text' name='Url'/>
          </li>
        </ul>
        <button id='submitNewBlogButton' type='submit'>add</button>
      </form>
    </div>
  )
}

export default NewBlogForm
