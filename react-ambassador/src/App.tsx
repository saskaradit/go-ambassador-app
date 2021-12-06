import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProductsFrontend from './pages/ProductsFrontend';
import Login from './pages/login/login'
import Register from './pages/register'
import Profile from './pages/profile'
import Stats from './pages/stats'
import Rankings from './pages/rankings'

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsFrontend/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/stats' element={<Stats/>}></Route>
          <Route path='/rankings' element={<Rankings/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;