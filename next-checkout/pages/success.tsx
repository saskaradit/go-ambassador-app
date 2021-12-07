import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../components/layout";
import constants from "../constants";

const Success = () => {
  const router = useRouter()

  const {source} = router.query

  useEffect(() => {
    if (source !== undefined){
      (
        async() => {
          await axios.post(`${constants.endpoint}/orders/confirm`, {
            source
          })
        }
      )()
    }
  }, [source])
  return (
    <Layout>
      <div className="py-5 text-center">
        <h2>Success</h2>
        <p className="lead">Your purchase has been compoleted!</p>
      </div>
    </Layout>
  )
}

export default Success