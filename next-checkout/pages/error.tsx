import React from "react";
import Layout from "../components/layout";

const Error = () => {
  return (
    <Layout>
      <div className="py-5 text-center">
        <h2>Error</h2>
        <p className="lead">Could not process payment!</p>
      </div>
    </Layout>
  )
}

export default Error