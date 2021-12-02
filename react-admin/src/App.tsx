import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Register from './pages/register'
import Users from './pages/users'
import Login from './pages/login/login'

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users/>}></Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
