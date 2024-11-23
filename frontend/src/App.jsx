import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Diseases from './pages/SkinDiseases';
import Upload from './pages/ImageUpload';

function App() {
  return (
    <Router>
      <div>
        {/* Header */}
        <header className="header">
          <h1>Skin Disease Detection</h1>
          <nav>
            <ul className="nav-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/diseases">Common Skin Diseases</Link>
              </li>
              <li>
                <Link to="/upload">Upload Image</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/diseases" element={<Diseases />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
