import React, { SyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../components/layout'
import {Button, TextField} from "@material-ui/core"
import { Navigate, useParams } from 'react-router'

const ProductForm = (props: any) => {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [image,setImage] = useState('')
  const [price,setPrice] = useState('')
  const [redirect,setRedirect] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    if (id) {
      (
        async () => {
          const {data} = await axios.get(`/admin/products/${id}`);

          setTitle(data.title);
          setDescription(data.description);
          setImage(data.image);
          setPrice(data.price);
        }
      )();
    }
    })

  const submit = async(e: SyntheticEvent) => {
    e.preventDefault()
    const data = {
      title, description, image, price
    }

    if (id){
      await axios.put(`/admin/products/${id}`,data)
    }else{
      await axios.post('/admin/products',data)
    }


    setRedirect(true)
  }

  if (redirect){
    return <Navigate to={'/products'}/>
  }
  return (
    <Layout>
      <form onSubmit={submit}>
        <div className="mb-3">
          <TextField value={title} label="Title" onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="mb-3">
          <TextField value={description} label="Description" rows={4} multiline  onChange={e => setDescription(e.target.value)}/>
        </div>
        <div className="mb-3">
          <TextField value={image} label="Image"  onChange={e => setImage(e.target.value)}/>
        </div>
        <div className="mb-3">
          <TextField value={price} label="Price" type="number"  onChange={e => setPrice(e.target.value)}/>
        </div>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </Layout>
  )
}

export default ProductForm