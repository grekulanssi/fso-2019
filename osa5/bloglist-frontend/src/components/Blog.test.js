import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('blog entry is rendering content correctly', () => {
  const testBlog = {
    _id: { $oid: '5f05a6e4109c6f64a5597b89' },
    title: 'Testiblogin otsikko',
    author: 'Testiblogin kirjoittaja',
    url: 'http://www.testiblogi.url',
    likes: 10,
    user: { $oid: '5f0594ed84057a52bbfffec0' },
    __v: 0
  }

  const component = render(
    <Blog blog={testBlog} />
  )

  //component.debug()
  const c = component.container
  console.log(prettyDOM(c.querySelector('li')))

  expect(c).toBeVisible()
  expect(c).toHaveTextContent(
    'Testiblogin otsikko'
  )
  expect(c).toHaveTextContent(
    'Testiblogin kirjoittaja'
  )
  expect(c).toContainHTML('href="http://www.testiblogi.url"')
})

test('blog entry is not rendering wrong content', () => {
  const testBlog = {
    _id: { $oid: '5f05a6e4109c6f64a5597b89' },
    title: 'Testiblogin otsikko',
    author: 'Testiblogin kirjoittaja',
    url: 'http://www.testiblogi.url',
    likes: 10,
    user: { $oid: '5f0594ed84057a52bbfffec0' },
    __v: 0
  }

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