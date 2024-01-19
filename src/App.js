import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Model from './components/Model';
import Data from './components/Data';
import Frequency from './components/Frequency';
import About from './components/About';
import './App.css';
import MapComponents from './MapComponents';
import StateProfileCard from './StateProfileCard'; // Import StateProfileCard component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/model">Model</Link></li>
            <li><Link to="/data">Data</Link></li>
            <li><Link to="/frequency">Frequency</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/model" element={<Model />} />
          <Route path="/data" element={
            <div>
              <Data />
              <StateProfileCard /> {/* Include the StateProfileCard component */}
            </div>
          } />
          <Route path="/frequency" element={<MapComponents />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Model />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
