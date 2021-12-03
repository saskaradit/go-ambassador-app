import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Register from './pages/register'
import Users from './pages/users'
import Links from './pages/links'
import Orders from './pages/orders'
import Products from './pages/products/products'
import ProductForm from './pages/products/productform'
import RedirectToUsers from './components/redirectToUsers'
import Login from './pages/login/login'

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RedirectToUsers/>}></Route>
          <Route path='/users' element={<Users/>}></Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/users/:id/links' element={<Links/>}></Route>
          <Route path='/products' element={<Products/>}></Route>
          <Route path='/products/create' element={<ProductForm/>}></Route>
          <Route path='/products/:id/edit' element={<ProductForm/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
