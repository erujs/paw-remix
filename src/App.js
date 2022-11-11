import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.view';
import AnimalList from './pages/animal-list/animal-list.view';
import Animal from './pages/animal/animal.view';
import Error from "./pages/error/error.view"
import { AnimalProvider } from './contexts/animal.context';
import './App.scss';

const App = () => {
  return (
    <div className="App bg-dark">
      <AnimalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/:animal' element={<AnimalList />} />
            <Route path="/:animal/:id" element={<Animal />} />
            <Route path='*' element={<Error errorcode={"ERROR [404]"} info={"Page Not Found!"} />} />
          </Routes>
        </Router>
      </AnimalProvider>
    </div>
  );
}

export default App;