import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './layout/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Mypage from './pages//mypage/Mypage';
import Challenge from './pages/challengepage/Challenge';
import ChallengeUpload from './pages/challengepage/ChallengeUpload';
import ChallengeDetail from './pages/challengepage/ChallengeDetail';
import Footer from './layout/Footer';
import NotFound from './pages/NotFound';



function App() {
  return (
    <div id='wrapper'>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/member/new' element={<Signup />} />
            <Route path='/member/login' element={<Login />} />
            <Route path='/mypage/*' element={<Mypage />} />
            <Route path='/challenge/list/*' element={<Challenge />} />
            <Route path='/challenge/upload' element={<ChallengeUpload />}/>
            <Route path='/challenge/:id' element={<ChallengeDetail />}/>
            <Route path='/*' element={<NotFound/>}/>
          </Routes>
        </div>
        <Footer />
    </div>
  );
}

export default App;
