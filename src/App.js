import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './layout/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Mypage from './components/Mypage';
function App() {
  return (
    <div>
      <Header />
    <Routes>
      <Route path='/*' element={<Home />} />
      <Route path='/member/new' element={<Signup />} />
      <Route path='/member/login' element={<Login />} />
      <Route path='/mypage' element={<Mypage />} />
    </Routes>
    </div>
  );
}

export default App;
