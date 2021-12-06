import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import ProductsFrontend from './pages/ProductsFrontend';

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsFrontend/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;