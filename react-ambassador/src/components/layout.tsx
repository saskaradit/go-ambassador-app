import React, { Dispatch, useEffect } from 'react'
import Nav from './nav'
import Header from './header'
import axios from 'axios'
import {useLocation } from 'react-router'
import { User } from '../models/user'
import { connect } from 'react-redux'
import {setUser} from '../redux/actions/setUserAction'

const Layout = (props: any) => {
  const location = useLocation()
  useEffect(() => {
  (
      async() => {
        try {
          const {data} = await axios.get('/user')
          props.setUser(data)
        } catch (error) {
        }
      }
    )()
  }, [props])

  let header 

  if(location.pathname==='/' || location.pathname === '/backend'){
    header = <Header/>

  }

  return (
  <div>
    <Nav/>
      <main role="main">
        {header}
        <div className="album py-5 bg-light">
          <div className="container">
            {props.children}
          </div>
        </div>
      </main>
    </div>
  )
}


const mapStateToProps = (state: { user: User }) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);