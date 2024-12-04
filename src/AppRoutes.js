import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Cadastro from "./components/Login/Cadastro";
import Galeria from "./components/Galeria/Galeria";
import DetalhesPlantas from "./components/Galeria/DetalhesPlantas";
import RotaProtegida from "./RotaProtegida";
import Jogos from "./components/Jogos/Jogos";
import JogoMemoria from "./components/Jogos/Memoria/JogoMemoria";
import JogoCorrespondencia from "./components/Jogos/Correspondencia/JogoCorrespondencia";
import MeuJardim from "./components/MeuJardim"; // Importa o componente MeuJardim

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/galeria/:id" element={<DetalhesPlantas />} />
        <Route path="/meu-jardim" element={<RotaProtegida><MeuJardim /></RotaProtegida>} />  {/* Rota para Meu Jardim */}
        <Route path="/jogos" element={<RotaProtegida><Jogos /></RotaProtegida>} />
        <Route path="/jogos/memoria" element={<RotaProtegida><JogoMemoria /></RotaProtegida>} />
        <Route path="/jogos/correspondencia" element={<RotaProtegida><JogoCorrespondencia /></RotaProtegida>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
