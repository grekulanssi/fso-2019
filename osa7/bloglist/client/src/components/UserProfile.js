import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const UserProfile = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const id = useParams().id
  const userArray = useSelector(store =>
    store.users.filter(u =>
      u.id === id))
  const user = userArray[0]

  if(!user) return null

  const mapBlogs = () => {
    if(!user) return null
    console.log('user blogs:', user.blogs)
    if(!user.blogs) return null
    return user.blogs.map(b =>
      <li key={b.id}>{b.title}</li>)
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>{mapBlogs()}</ul>
    </div>
  )
}

export default UserProfile