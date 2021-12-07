import Head from "next/head";
import React from "react";

const Layout = (props) => {
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <div className="container">
        {props.children}
      </div>
    </>
  )
}

export default Layout