import React, { useEffect, useState } from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import axios from 'axios'
import {Product} from '../models/product'
import { Filter } from '../models/filter'

const ProductsBackend = (props: any) => {
  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] =  useState<Filter>({
    s: '',
    sort: '',
    page: 1
  })
  const [lastPage,setLastPage] = useState(0)
  useEffect(() => {
    (
      async () => {
        const arr = []
        if(filters.s){
          arr.push(`s=${filters.s}`)
        }
        if(filters.sort){
          arr.push(`sort=${filters.sort}`)
        }
        if(filters.page){
          arr.push(`page=${filters.page}`)
        }
        const {data} = await axios.get(`products/backend?${arr.join('&')}`)
        setProducts(filters.page === 1 ? data.data : [...products, ...data.data])
        setLastPage(data.last_page)
      }
    )()
  }, [filters])

  return (
    <Layout>
      <Products products={products} filters={filters} setFilters={setFilters} lastPage={lastPage}/>
    </Layout>
  )
}

export default ProductsBackend