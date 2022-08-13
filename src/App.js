import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';

function App() {
  return (
    <div>
      <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    </div>
  );
}

export default App;
