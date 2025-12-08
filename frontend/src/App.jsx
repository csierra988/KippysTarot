import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import History from './components/History';
import Home from './components/Home';
import Reading from './components/Reading';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

const GrainyOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.60);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.30;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: overlay;
`;

function App() {
  return (
      <div className="App">
        <GrainyOverlay />
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Reading" element={<Reading />} />
            <Route path="/History" element={<History />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
    </div>
  );

}

export default App
