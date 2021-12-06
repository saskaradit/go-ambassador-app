import React from 'react'
import Nav from './nav'
import Header from './header'

const Layout = (props: any) => {
  return (
  <div>
    <Nav/>
      <main role="main">
        <Header/>
        <div className="album py-5 bg-light">
          <div className="container">
            {props.children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout