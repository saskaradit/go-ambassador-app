import React, { useEffect, useState } from 'react'
import { Product } from '../../models/product'
import axios from 'axios'
import Layout from '../../components/layout'
import {Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow} from "@material-ui/core"

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(0)
  const perPage = 0

  useEffect(()=>{
    (
      async () => {
        const {data} = await axios.get('/admin/products')
        setProducts(data)
      }
    )()
  })

  const deleteProduct = async (id:number) =>{
    if(window.confirm('are you sure?')){
      await axios.delete(`/admin/products/${id}`)

      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice(page * perPage, (page)*perPage).map(product => {
            return (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell><img src={product.image} width={50}/></TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => deleteProduct(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
          <TableFooter>
              <TablePagination
                count={products.length}
                page={page}
                onPageChange={(e, newPage)=> setPage(newPage)}
                rowsPerPage={perPage}
                rowsPerPageOptions={[]}
              />
          </TableFooter>
      </Table>
    </Layout>
  )
}

export default Products