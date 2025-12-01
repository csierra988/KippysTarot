import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import History from './components/History';
import Home from './components/Home';
import Reading from './components/Reading';

function App() {
  return (
      <div className="App">
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Reading" element={<Reading />} />
            <Route path="/History" element={<History />} />
          </Routes>
    </div>
  );

}

export default App
