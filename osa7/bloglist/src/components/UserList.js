import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

const UserList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  const mapUsers = () => {
    return users.map(u =>
      <tr key={u.id}>
        <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
        <td>{u.blogs.length}</td>
      </tr>)
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {mapUsers()}
        </tbody>
      </table>
    </div>
  )
}

export default UserList