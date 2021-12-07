import React, { useState } from 'react'
import { Product } from '../models/product'
import { Filter } from '../models/filter'
import axios from 'axios'

const Products = (props: {
  products: Product[], 
  filters: Filter, 
  setFilters: (filters:Filter)=> void, 
  lastPage: number
}) => {
  const [selected, setSelected] = useState<number[]>([])
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: ''
  })

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

  let buttonMore 
  if(props.filters.page !== props.lastPage) {
    buttonMore = (
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={loadMore}>Load More</button>
      </div>
    )  
  } 

  const select = (id: number) => {
    if(selected.some(s => s === id)){
      setSelected(selected.filter(s => s !== id))
      return
    }
    setSelected([...selected,id])
  }

  const generate = async () => {
    try {
      const {data} = await axios.post('links', {
        products: selected
      })
  
      setNotify({
        show: true,
        error: false,
        message: `Link Generated: http://localhost:5000/${data.code}`
      })
    } catch (error) {
      setNotify({show:true, error: true, message: "You need to be logged in"})
    }finally{
      setTimeout(() => {
        setNotify({
          show: false, error:false, message: ''
        })
      }, 3000)
    }
  }

  let buttonGenerate, info
  if( selected.length >  0 ) {
    buttonGenerate = (
      <div className="input-group-append">
        <button className="btn btn-info" onClick={generate}>Generate Link</button>
      </div>
    )
  }
  if(notify.show){
    info = (
      <div className="col-md-12 mb-4">
        <div className={notify.error? "alert alert-danger" : "alert alert-info"} role="alert">
          {notify.message}
        </div>
      </div>
    )
  }

  return (
    <div>
      {info}
      <div className="col-md-12 mb-4 input-group">
        <input type="text" className="form-control" placeholder="Search" onChange={e => search(e.target.value)} />
        {buttonGenerate}
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
            <div className="col-md-4" onClick={() => select(prod.id)} key={prod.id}>
              <div className={selected.some(s => s === prod.id)? "card mb-4 box-shadow selected" : "card mb-4 box-shadow" }>
                <img className="card-img-top" src={`https://picsum.photos/200/300?random=${prod.id}`} alt="Cardcap" height={200}/>
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
        {buttonMore}
        
    </div>
  ) 
}

export default Products