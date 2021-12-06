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
          <label>First Name</label>
          <input type="text" defaultValue={first_name} className="form-control" onChange={e => setFirstName(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" defaultValue={last_name} className="form-control" onChange={e => setLastName(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="text" defaultValue={email} className="form-control" onChange={e => setEmail(e.target.value)}/>
        </div>
        <button className="btn btn-outline-secondary" color="primary" type="submit">Edit</button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input type="password" className="form-control" onChange={e => setPasswordConfirm(e.target.value)}/>
        </div>
        <button className="btn btn-outline-secondary" color="primary" type="submit">Submit</button>
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
