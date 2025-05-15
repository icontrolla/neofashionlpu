import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Faculty from './pages/Faculty';
import Exhibition from './pages/Exhibition';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/exhibition" element={<Exhibition />} />
      </Routes>
    </Router>
  );
}

export default App;
