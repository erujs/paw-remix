import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';
import Home from './pages/home/home.view';
import Cat from './pages/cat/cat.view';
import { AnimalListStm } from './contexts/cat.context-provider';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const App = () => {
  return (
    <div className="App">
      <AnimalListStm>
        <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Cat />} />
          </Routes>
        </Router>
      </AnimalListStm>
    </div>
  );
}

export default App;