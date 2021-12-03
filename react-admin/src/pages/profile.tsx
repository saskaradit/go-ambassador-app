import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Layout from "../components/layout";


const Profile = () => {
  const [first,setFirst] = useState('')
  const [last,setLast] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confPassword,setConfPassword] = useState('')

  useEffect(() => {
    (
      async() => {
        const {data} = await axios.get('/admin/user')
        setFirst(data.first_name)
        setLast(data.last_name)
        setEmail(data.email)
      }
    )()
  }, [])

  const infoSubmit =  async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.put('/admin/users/info', {
      first_name: first, last_name: last, email
    })
  }
  const passwordSubmit =  async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.put('/admin/users/password',{
      password, password_confirm: confPassword
    })
  }

  return(
    <Layout>
      <h3>Account Information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <TextField value={first} label="First Name" onChange={e => setFirst(e.target.value)}/>
        </div>
        <div className="mb-3">
          <TextField value={last} label="Last Name" onChange={e => setLast(e.target.value)}/>
        </div>
        <div className="mb-3">
          <TextField value={email} label="Email" onChange={e => setEmail(e.target.value)}/>
        </div>
        <Button variant="contained" color="primary" type="submit"></Button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <TextField label="Password" type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="mb-3">
          <TextField label="Confirm Password" type="password" onChange={e => setConfPassword(e.target.value)}/>
        </div>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </Layout>
  )
}

export default Profile