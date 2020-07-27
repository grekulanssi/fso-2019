import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
      <Typography variant='h2'>Add new blog</Typography>
      <form onSubmit={addBlog}>
        <TextField label='Title' id='title' type='text' name='Title'/>
        <br />
        <TextField label='Author' id='author' type='text' name='Author'/>
        <br />
        <TextField label='url' id='url' type='text' name='Url'/>
        <br /><br />
        <Button variant='contained' id='submitNewBlogButton' type='submit'>add</Button>
      </form>
    </div>
  )
}

export default NewBlogForm
