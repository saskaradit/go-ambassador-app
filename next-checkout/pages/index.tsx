import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
    </Head>
      <div>
        <div className="container">
          <div className="py-5 text-center">
            <h2>Welcome</h2>
            <p className="lead">has invited you to buy these products</p>
          </div>
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Products</span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Product name</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$12</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$20</strong>
                </li>
              </ul>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Personal Info</h4>
              <form className="needs-validation">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label >First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="first name"  required/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label >Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="last name"  required/>
                  </div>
                </div>

                <div className="mb-3">
                  <label >Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <input type="text" className="form-control" id="username" placeholder="Username" required/>
                  </div>
                </div>

                <div className="mb-3">
                  <label >Email</label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" required/>
                </div>

                <div className="mb-3">
                  <label >Address</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required/>
                </div>
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label >Country</label>
                    <input className="form-control" id="country" placeholder="New Zealand" />
                  </div>
                  <div className="col-md-5 mb-3">
                    <label >City</label>
                    <input className="form-control" id="city" placeholder="Melbourne" />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label >Zip</label>
                    <input className="form-control" id="zip" placeholder="Zip" />
                  </div>
                </div>
                <hr className="mb-4"/>
                <button className="btn btn-primary btn-lg btn-block" type="submit">Checkout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
