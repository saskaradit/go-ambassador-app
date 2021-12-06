import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProductsFrontend from './pages/ProductsFrontend';
import Login from './pages/login/login'
import Register from './pages/register'

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsFrontend/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;