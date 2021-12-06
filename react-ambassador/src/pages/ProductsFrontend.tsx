import React, { useEffect, useState } from 'react'
import Products from '../components/products'
import Layout from '../components/layout'
import { Product } from '../models/product'
import axios from 'axios'

const ProductsFrontend = (props: any) => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get('products/frontend')
        setProducts(data)
      }
    )()
  },[])
  return (
    <Layout>
      <Products products={products}/>
    </Layout>
  )
}

export default ProductsFrontend