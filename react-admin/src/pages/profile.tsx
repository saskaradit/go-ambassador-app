import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout";
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";


const Profile = (props: any) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');

  useEffect(() => {
      setFirstName(props.user.first_name)
      setLastName(props.user.last_name)
      setEmail(props.user.email)
  }, [props.user])

  const infoSubmit =  async (e: SyntheticEvent) => {
    e.preventDefault()

    const{data} = await axios.put('/admin/users/info', {
      first_name,
      last_name,
      email
    })

    props.setUser(data)
  }
  const passwordSubmit =  async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.put('/admin/users/password',{
      password, password_confirm
    })
  }

  return(
    <Layout>
      <h3>Account Information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <TextField value={first_name} label="First Name" onChange={e => setFirstName(e.target.value)}/>
        </div>
        <div className="mb-3">
          <TextField value={last_name} label="Last Name" onChange={e => setLastName(e.target.value)}/>
        </div>
        <div className="mb-3">
          <TextField value={email} label="Email" onChange={e => setEmail(e.target.value)}/>
        </div>
        <Button variant="contained" color="primary" type="submit">Edit</Button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <TextField label="Password" type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="mb-3">
          <TextField label="Confirm Password" type="password" onChange={e => setPasswordConfirm(e.target.value)}/>
        </div>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </Layout>
  )
}

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Profile);
