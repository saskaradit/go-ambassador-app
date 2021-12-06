import React from 'react'
import { Product } from '../models/product'

const Product = (props: {products: Product[]}) => {
  return (
    <div className="row">
      {props.products.map(prod => {
        return (
          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap" height={200}/>
              <div className="card-body">
                <p className="card-text">{prod.title}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">${prod.price}</small>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      </div>
  ) 
}

export default Product