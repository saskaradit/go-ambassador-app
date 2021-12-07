import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SyntheticEvent, useEffect, useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import constant from "../constants"

declare var Stripe

export default function Home() {
  const router = useRouter()
  const {code} = router.query
  const [user,setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [quantities, setQuantities] = useState([])
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')

  useEffect(()=> {
    if(code != undefined){
      (
        async () => {
          const {data} = await axios.get(`${constant.endpoint}/links/${code}`)
          setUser(data.user)
          setProducts(data.products )
          setQuantities(data.products.map(p => ({product_id: p.id, quantity: 0})))
        }
      )()
    }
  },[code])

  const changePrice = (id: number, quantity: number) => {
    setQuantities(quantities.map(q => {
      if(q.product_id === id ){
        return {
          ...q,
          quantity
        }
      }
      return q
    }))
  }

  const totalPrice = () => {
    return quantities.reduce((s,q) => {
      const product = products.find(p => p.id === q.product_id)
      return s + product.price * q.quantity
    }, 0 )
  }

  const submitForm = async (e:SyntheticEvent) => {
    e.preventDefault()

    const {data} = await axios.post(`${constant.endpoint}/orders`,{
      first_name,
      last_name,
      email,
      address,
      country,
      city,
      zip,
      code,
      products: quantities
    })

    const stripe = new Stripe(constant.stripe_key)

    stripe.redirectToCheckout({
      sessionId: data.id
    })
  }

  return (
    <Layout>
      <div className="py-5 text-center">
        <h2>Welcome</h2>
        <p className="lead">{user?.first_name} {user?.last_name} has invited you to buy these products</p>
      </div>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Products</span>
          </h4>
          <ul className="list-group mb-3">
            {products.map(prod => {
              return (
                <div key={prod.id}>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">{prod.title}</h6>
                      <small className="text-muted">{prod.description}</small>
                    </div>
                    <span className="text-muted">${prod.price}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">Quantity</h6>
                    </div>
                    <input className="text-muted form-control" type="number" min="0" defaultValue={0} style={{width: '65px'}} onChange={e => changePrice(prod.id,parseInt(e.target.value))}/>
                  </li>
                </div>
              )
            })}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${totalPrice()}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Personal Info</h4>
          <form className="needs-validation" onSubmit={submitForm}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label >First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="first name" onChange={e => setFirstName(e.target.value)} required/>
              </div>
              <div className="col-md-6 mb-3">
                <label >Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="last name"  required  onChange={e => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="mb-3">
              <label >Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com"  onChange={e => setEmail(e.target.value)}  required/>
            </div>

            <div className="mb-3">
              <label >Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" required  onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label >Country</label>
                <input className="form-control" id="country" placeholder="New Zealand"  onChange={e => setCountry(e.target.value)}  />
              </div>
              <div className="col-md-5 mb-3">
                <label >City</label>
                <input className="form-control" id="city" placeholder="Melbourne"  onChange={e => setCity(e.target.value)} />
              </div>
              <div className="col-md-3 mb-3">
                <label >Zip</label>
                <input className="form-control" id="zip" placeholder="Zip"  onChange={e => setZip(e.target.value)}  />
              </div>
            </div>
            <hr className="mb-4"/>
            <button className="btn btn-primary btn-lg btn-block" type="submit">Checkout</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
