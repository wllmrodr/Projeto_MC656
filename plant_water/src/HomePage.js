// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Link to="/plant-water">Clique para plantar um grão de feijão!</Link>
    </div>
  );
};

export default HomePage;
