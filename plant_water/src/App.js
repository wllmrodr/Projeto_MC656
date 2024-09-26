import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import PlantWater from './PlantWater';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plant-water" element={<PlantWater />} />
        </Routes>
    </Router>
  );
}

export default App;
