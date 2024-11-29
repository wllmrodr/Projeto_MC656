import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Galeria from "./components/Galeria/Galeria";
import DetalhesPlantas from "./components/Galeria/DetalhesPlantas";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/galeria/:id" element={<DetalhesPlantas />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;