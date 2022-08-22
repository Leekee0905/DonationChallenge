import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './layout/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Mypage from './components/Mypage';
import Challenge from './pages/Challenge';
import ChallengeUpload from './pages/ChallengeUpload';
import ChallengeDetail from './pages/ChallengeDetail';


function App() {
  return (
    <div>
        <Header />
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/member/new' element={<Signup />} />
          <Route path='/member/login' element={<Login />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/challenge/*' element={<Challenge />} />
          <Route path='/challenge/upload' element={<ChallengeUpload />}/>
          <Route path='/challenge/:id' element={<ChallengeDetail />}/>
        </Routes>
    </div>
  );
}

export default App;
