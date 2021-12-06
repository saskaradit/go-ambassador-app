import React,{Component, SyntheticEvent} from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

class Register extends Component {
  firstName = ''
  lastName =''
  email =''
  password =''
  confPassword =''

  state = {
    redirect: false
  }

  submit = async (e : SyntheticEvent) => {
    e.preventDefault()

    await axios.post('/admin/register', {
      first_name: this.firstName,
      last_name: this.lastName,
      email : this.email,
      password: this.password,
      password_confirm: this.confPassword
    })

    this.setState({
      redirect: true
    })
  }

  render(){
    if (this.state.redirect){
      return <Navigate to={'/login'}/>
    }
    return (
      <main className="form-signin">
        <form onSubmit={this.submit}>
          <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
          <div className="form-floating">
            <input className="form-control" placeholder="Rad" onChange={e => this.firstName = e.target.value}/>
            <label>First Name</label>
          </div>
          <div className="form-floating">
            <input className="form-control" placeholder="Saskara" onChange={e => this.lastName = e.target.value}/>
            <label>Last Name</label>
          </div>
          <div className="form-floating">
            <input type="email" className="form-control" placeholder="name@example.com" onChange={e => this.email= e.target.value}/>
            <label >Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control"  placeholder="Password" onChange={e => this.password = e.target.value}/>
            <label >Password</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control"  placeholder="Confirm Password" onChange={e => this.confPassword = e.target.value}/>
            <label >Confirm Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
        </form>
      </main>
    )
  }
}

export default Register;