import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;