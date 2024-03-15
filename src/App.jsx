import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Error from "./pages/error/error"
import AnimalList from './pages/animalList/animalList';
import Animal from './pages/animal/animal';
import { AnimalProvider } from './contexts/animalContext';
import './App.css'

const App = () => {
  return (
    <div className="App">
      <AnimalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/:animal' element={<AnimalList />} />
            <Route path="/:animal/:id" element={<Animal />} />
            <Route path='*' element={<Error statusCode={"ERROR [404]"} statusMessage={"Page Not Found!"} />} />
          </Routes>
        </Router>
      </AnimalProvider>
    </div>
  )
}

export default App
