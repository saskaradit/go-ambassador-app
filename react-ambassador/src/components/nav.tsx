import axios from 'axios';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Navigate } from 'react-router'
import { Link } from 'react-router-dom';
import {User} from "../models/user"

const Nav = (props: {user: User | null}) => {
  const [redirect, setRedirect] = useState(false)
  let menu;

  const logout = async () => {
    await axios.post('logout')
    setRedirect(true)
  }

  if(redirect){
    return <Navigate to={'/login'}/>
  }

  if(props.user?.id){
    <div>
      <a className="btn btn-sm btn-outline-secondary" onClick={() => async () => logout}>Logout</a>
      <Link to={'/profile'} className="btn btn-sm btn-outline-secondary">{props.user.last_name}</Link>
    </div>

  }else{
    menu = (
      <div>
        <Link  to={'/login'} className="btn btn-sm btn-outline-secondary">Sign in</Link>
        <Link  to={'/register'} className="btn btn-sm btn-outline-secondary">Sign up</Link>
      </div>
    )
  }
  return (
    <header className="blog-header py-3">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-4 pt-1">
          <a className="text-muted" href="#">Frontend</a>
          <a className="text-muted" href="#">Backend</a>
        </div>
        <div className="col-4 text-center">
          <a className="blog-header-logo text-dark" href="#">Large</a>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <a className="text-muted" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mx-3"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>
          </a>
          {menu}
        </div>
      </div>
    </header>
  )
}

export default connect((state: {user:User}) => ({
  user: state.user
}))(Nav);