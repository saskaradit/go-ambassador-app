import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { User } from '../models/user'

const Header = (props: {user: User}) => {
  const [title, setTitle] = useState('welcome')
  const [description, setDescription] = useState('Share link')

  useEffect(() => {
    if(props.user?.id){
      setTitle(`$${props.user.revenue}`)
      setDescription('You have earned this far')
    }else{
      setTitle('Welcome')
      setDescription('Share links to earn money')
    }
  }, [props.user])

  let btns;
  if(!props.user?.id){
    btns = (
      <p>
          <Link to={'/login'} className="btn btn-primary my-2">Loginn</Link>
          <Link to={'/register'} className="btn btn-secondary my-2">Register</Link>
        </p>
    )
  }
  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">{title}</h1>
        <p className="lead text-muted">{description}</p>
        {btns}
      </div>
    </section>
  )
}

export default connect((state: {user:User}) => ({
  user: state.user
}))(Header)