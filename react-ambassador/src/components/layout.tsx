import React, { Dispatch, useEffect, useState } from 'react'
import Nav from './nav'
import Header from './header'
import axios from 'axios'
import { Navigate } from 'react-router'
import { User } from '../models/user'
import { connect } from 'react-redux'
import {setUser} from '../redux/actions/setUserAction'

const Layout = (props: any) => {
  useEffect(() => {
  (
    async() => {
      try {
        const {data} = await axios.get('/admin/user')
        props.setUser(data)
      } catch (error) {
        console.log(error)
      }
    }
  )()
}, [props])

  return (
  <div>
    <Nav/>
      <main role="main">
        <Header/>
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