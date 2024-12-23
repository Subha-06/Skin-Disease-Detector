import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Diseases from './pages/SkinDiseases';
import Upload from './pages/ImageUpload';

function App() {
  return (
    <Router>
      <div>
        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/diseases" element={<Diseases />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
