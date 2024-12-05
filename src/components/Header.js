import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <header style={{ padding: "10px", backgroundColor: "#146356" }}>
      <nav>
        <ul style={{ listStyleType: "none", display: "flex", gap: "15px" }}>
          <li>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          </li>
          <li>
            <Link to="/galeria" style={{ color: "white", textDecoration: "none" }}>Galeria</Link>
          </li>
          <li>
            <Link to="/meu-jardim" style={{ color: "white", textDecoration: "none" }}>Meu Jardim</Link>
          </li>
          <li>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
