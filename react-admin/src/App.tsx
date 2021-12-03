import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Register from './pages/register'
import Users from './pages/users'
import Links from './pages/links'
import Products from './pages/products/products'
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
