import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'

const Rankings = () => {
  const [rankings, setRankings] = useState([])

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get('ranks')
        setRankings(data)
      }
    )()
  })
  return (
    <Layout>
      <div className="table-responsive">
        <div className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rankings).map((key: any,index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{key}</td>
                  <td>{rankings[key]}</td>
                </tr>
              )
            })}
          </tbody>
        </div>
      </div>
    </Layout>
  )
}

export default Rankings