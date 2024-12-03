<<<<<<< HEAD
import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PlantInfo from './components/PlantInfo'; // Importar PlantInfo
import PlantWater from './components/PlantWater'; // Importar PlantWater
import { Notificacao } from './components/NotificationService';
//teste git
function App() {
  return (
    <Router>
      <div className="App">
        <h1>Aplicativo de Cuidados com Plantas</h1>
        <nav>
          <ul>
            <li><Link to="/info">Informações da Planta</Link></li>
            <li><Link to="/water">Monitoramento de Regas</Link></li>
          </ul>
        </nav>
=======
import React from "react";
import AppRoutes from "./AppRoutes";
>>>>>>> a978a2d4b01c8f953f621875fba1557de81259ce

function App() {
  return <AppRoutes />;
}

export default App;