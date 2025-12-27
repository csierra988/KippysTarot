import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import History from './components/History';
import Home from './components/Home';
import Reading from './components/Reading';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Journal from './components/Journal';

function App() {
  return (
      <div className="App">
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Reading" element={<Reading />} />
            <Route path="/History" element={<History />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Journal/:readingId" element={<Journal />} />
          </Routes>
    </div>
  );

}

export default App
