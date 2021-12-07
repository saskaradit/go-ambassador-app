import axios from 'axios';
import React, { Dispatch } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {User} from "../models/user"
import { setUser } from '../redux/actions/setUserAction';

const Nav = (props: any) => {
  let menu;

  const logout = async () => {
    await axios.post('logout')
    props.setUser(null)
  }

  if(props.user?.id){
    <div>
      <Link to={'/stats'} className="btn btn-me-2">Stats</Link>
      <Link to={'/rankings'} className="btn btn-me-2">Rankings</Link>
      <a href="/login" className="btn btn-sm btn-outline-secondary" onClick={() => async () => logout}>Logout</a>
      <Link to={'/profile'} className="btn btn-sm btn-outline-secondary">{props.user.last_name}</Link>
    </div>

  }else{
    menu = (
      <div>
        <Link  to={'/login'} className="btn btn-sm btn-outline-secondary mx-2">Sign in</Link>
        <Link  to={'/register'} className="btn btn-sm btn-outline-secondary mx-2">Sign up</Link>
      </div>
    )
  }
  return (
    <header className="blog-header py-3">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-4 pt-1 d-flex justify-content-center align-items-center">
          <NavLink className={({ isActive }) => (isActive ? 'nav-link px-2 link-secondary link-dark' : 'nav-link px-2 link-secondary')} to={'/'}>Frontend</NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link px-2 link-secondary link-dark' : 'nav-link px-2 link-secondary')}  to={'/backend'}>Backend</NavLink>
        </div>
        <div className="col-4 text-center">
          <a className="blog-header-logo text-dark" href="/">Ambassador</a>
        </div>
        <div className="col-4 d-flex justify-content-center align-items-center">
          {menu}
        </div>
      </div>
    </header>
  )
}

export default connect((state: {user:User}) => ({
  user: state.user
}),(dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
}))(Nav);