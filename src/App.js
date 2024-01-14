import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Model from './components/Model';
import Data from './components/Data';
import Frequency from './components/Frequency';
import Correlation from './components/Correlation';
import About from './components/About';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/model">Model</Link></li>
            <li><Link to="/data">Data</Link></li>
            <li><Link to="/frequency">Frequency</Link></li>
            <li><Link to="/correlation">Correlation</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/model" component={Model} />
          <Route path="/data" component={Data} />
          <Route path="/frequency" component={Frequency} />
          <Route path="/correlation" component={Correlation} />
          <Route path="/about" component={About} />
          <Route exact path="/" component={Model} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;