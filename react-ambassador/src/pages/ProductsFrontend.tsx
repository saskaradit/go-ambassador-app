import React from 'react'
import Nav from '../components/nav'
import Header from '../components/header'
import Layout from '../components/layout'

const ProductsFrontend = (props: any) => {
  return (
    <Layout>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap"/>
            <div className="card-body">
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductsFrontend