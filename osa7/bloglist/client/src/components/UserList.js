import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const UserList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  const mapUsers = () => {
    return users.map(u =>
      <TableRow key={u.id}>
        <TableCell><Link to={`/users/${u.id}`}>{u.name}</Link></TableCell>
        <TableCell>{u.blogs.length}</TableCell>
      </TableRow>)
  }

  return (
    <div>
      <Typography variant='h2'>Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mapUsers()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList