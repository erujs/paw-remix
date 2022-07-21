import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';
import Home from './pages/home/home.view';
import Cat from './pages/cat/cat.view';
import Error from "./pages/error/error.view"
import { CatProvider } from './contexts/cat.context';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App bg-dark">
      <CatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cat/:id" element={<Cat />} />
            <Route path='*' element={<Error errorcode={"ERROR [404]"} info={"Page Not Found!"} />} />
          </Routes>
        </Router>
      </CatProvider>
    </div>
  );
}

export default App;