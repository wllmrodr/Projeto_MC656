import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PlantInfo from './components/PlantInfo'; // Importar PlantInfo
import PlantWater from './components/PlantWater'; // Importar PlantWater
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

        <Routes>
          <Route path="/info" element={<PlantInfo />} />
          <Route path="/water" element={<PlantWater />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;