import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Galeria from "./components/Galeria/Galeria";
import DetalhesPlantas from "./components/Galeria/DetalhesPlantas";
import Jogos from "./components/Jogos/Jogos";
import JogoMemoria from "./components/Jogos/Memoria/JogoMemoria";
import JogoCorrespondencia from "./components/Jogos/Correspondencia/JogoCorrespondencia";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/galeria/:id" element={<DetalhesPlantas />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route path="/jogos/memoria" element={<JogoMemoria />} />
        <Route path="/jogos/correspondencia" element={<JogoCorrespondencia />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;