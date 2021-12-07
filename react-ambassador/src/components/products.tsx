import React from 'react'
import { Product } from '../models/product'
import { Filter } from '../models/filter'

const Product = (props: {
  products: Product[], 
  filters: Filter, 
  setFilters: (filters:Filter)=> void, 
  lastPage: number
}) => {

  const search = (s: string) => {
    props.setFilters({
      ...props.filters,
      page:1,
      s
    })
  }

  const sort = (sort: string) => {
    props.setFilters({
      ...props.filters,
      page:1,
      sort
    })
  }

  const loadMore = () => {
    props.setFilters({
      ...props.filters,
      page: props.filters.page + 1
    })
  }

  let button 
  if(props.filters.page != props.lastPage) {
    button = (
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={loadMore}>Load More</button>
      </div>
    )  
  } 

  return (
    <div>
      <div className="col-md-12 mb-4 input-group">
        <input type="text" className="form-control" placeholder="Search" onChange={e => search(e.target.value)} />
        <div className="input-group-append">
          <select className="form-select" onChange={e => sort(e.target.value)}>
            <option >Select</option>
            <option value="asc">Sort by Ascending</option>
            <option value="desc">Sort by Descending</option>
          </select>
        </div>
      </div>
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

        
    </div>
  ) 
}

export default Product