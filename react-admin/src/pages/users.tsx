import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { User } from '../models/user'
import {Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow} from "@material-ui/core"

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(0)
  const perPage =10
  
  useEffect(()=>{
    (
      async () => {
        const {data} = await axios.get('/admin/ambassadors')
        setUsers(data)
      }
    )
  },[])
  return (
    <Layout>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * perPage, (page) *perPage).map(user => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.first_name} {user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" href={`/admin/users/${user.id}/links`}>View</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
              <TablePagination
                count={users.length}
                page={page}
                onPageChange={(e, newPage)=> setPage(newPage)}
                rowsPerPage={perPage}
                rowsPerPageOptions={[]}
              />
          </TableFooter>
        </Table>
    </Layout>
  )
}

export default Users;