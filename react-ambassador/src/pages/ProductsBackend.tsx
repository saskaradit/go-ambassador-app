import React, { useEffect, useState } from 'react'
import Nav from '../components/nav'
import Products from '../components/products'
import Layout from '../components/layout'
import axios from 'axios'
import {Product} from '../models/product'

const ProductsBackend = (props: any) => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get('products/backend')
      }
    )()
  })

  return (
    <Layout>
      <Products products={products}/>
    </Layout>
  )
}

export default ProductsBackend