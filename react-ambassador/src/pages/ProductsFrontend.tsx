import React, { useEffect, useState } from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import { Product } from '../models/product'
import axios from 'axios'
import { Filter } from '../models/filter'

const ProductsFrontend = (props: any) => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setfilteredProducts] = useState<Product[]>([])
  const perPage = 9
  const [lastPage,setLastPage] = useState(0)
  const [filters, setFilters] =  useState<Filter>({
    s: '',
    sort: '',
    page: 1
  })
  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get('/products/frontend')
        setAllProducts(data)
        setfilteredProducts(data)
        setLastPage(Math.ceil(data.length / perPage))
      }
    )()
  },[])



  useEffect(()=> {
    let products = allProducts.filter(p => p.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
    p.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0)

    if (filters.sort === 'asc'){
      products.sort((a,b) => {
        if (a.price > b.price){
          return 1;
        }else if (a.price < b.price){
          return -1
        }
        return 0
        
      })
    }else if (filters.sort === 'desc'){
      products.sort((a,b) => {
        if (a.price < b.price){
          return 1;
        }else if (a.price > b.price){
          return -1
        }
        return 0
        
      })
    }
    setLastPage(Math.ceil(products.length / perPage))
    setfilteredProducts(products.slice(0, filters.page * perPage))
  },[filters])
  return (
    <Layout>
      <Products products={filteredProducts} filters={filters} setFilters={setFilters} lastPage={lastPage}/>
    </Layout>
  )
}

export default ProductsFrontend