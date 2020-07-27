import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

import Typography from '@material-ui/core/Typography'

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
    if(!user || !user.blogs) return null
    if(user.blogs.length === 0) {
      return <Typography variant='body1'>The user seems not to have added any blogs yet.</Typography>
    }
    return (
      <ul>
        <Typography variant='body1'>
          {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
        </Typography>
      </ul>
    )
  }

  return (
    <div>
      <Typography variant='h2'>{user.name}</Typography>
      <Typography variant='h3'>added blogs</Typography>
      <div>{mapBlogs()}</div>
    </div>
  )
}

export default UserProfile