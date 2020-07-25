import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const testBlog = {
  title: 'Testiblogin otsikko',
  author: 'Testiblogin kirjoittaja',
  url: 'http://www.testiblogi.url',
  likes: 10,
}

test('blog entry is rendering content correctly', () => {

  const component = render(
    <Blog blog={testBlog} />
  )

  const c = component.container

  expect(c).toBeVisible()
  expect(c).toHaveTextContent(
    'Testiblogin otsikko'
  )
  expect(c).toHaveTextContent(
    'Testiblogin kirjoittaja'
  )
  expect(c).toContainHTML('href="http://www.testiblogi.url"')
  expect(c).toHaveTextContent('show details')
})

test('blog entry is not rendering wrong content', () => {

  const component = render(
    <Blog blog={testBlog} />
  )

  const c = component.container

  expect(c).not.toHaveTextContent(
    'http://www.testiblogi.url'
  )
  expect(c).not.toHaveTextContent(
    'likes'
  )
})

test('clicking the "show details" button renders url and likes visible', async () => {

  const component = render(
    <Blog blog={testBlog} />
  )

  const button = component.getByText('show details')
  fireEvent.click(button)

  const c = component.container

  expect(c).toHaveTextContent('http://www.testiblogi.url')
  expect(c).toHaveTextContent('10 likes')
})

test('clicking the "like" button twice sends two event handler calls', async () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={testBlog} addLike={mockHandler} />
  )
  const c = component.container

  const detailsButton = component.getByText('show details')
  fireEvent.click(detailsButton)

  //component.debug()
  console.log(prettyDOM(c.querySelector('li')))

  const likeButton = c.querySelector('.likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})