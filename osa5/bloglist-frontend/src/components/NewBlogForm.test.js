import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('<NewBlogForm /> calls callback function with correct values when blog is created', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogForm addNewBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'TEST TITLE' } })
  fireEvent.change(author, { target: { value: 'TEST AUTHOR' } })
  fireEvent.change(url, { target: { value: 'test.url' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(Object.keys(createBlog.mock.calls[0][0])).toHaveLength(3)
  expect(createBlog.mock.calls[0][0].title).toBe('TEST TITLE')
  expect(createBlog.mock.calls[0][0].author).toBe('TEST AUTHOR')
  expect(createBlog.mock.calls[0][0].url).toBe('http://test.url')
})