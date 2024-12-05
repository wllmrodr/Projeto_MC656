import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Importa o contexto de autenticação

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  textDecoration: "none",
  display: "inline-block",
  textAlign: "center",
  transition: "background-color 0.3s ease"
};

const inactiveButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#81C784", // Cor mais clara
  color: "white", // Mantém a cor do texto consistente
};

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Obtém o estado de autenticação e a função para definir o estado
  const navigate = useNavigate();
  const location = useLocation(); // Obtém a localização atual

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erro ao deslogar:", error);
      });
  };

  return (
    <header style={{ padding: "10px", backgroundColor: "#146356", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <nav>
        <ul style={{ listStyleType: "none", display: "flex", gap: "15px" }}>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/galeria" style={location.pathname === "/galeria" ? buttonStyle : inactiveButtonStyle}>Galeria</Link>
              </li>
              <li>
                <Link to="/meu-jardim" style={location.pathname === "/meu-jardim" ? buttonStyle : inactiveButtonStyle}>Meu Jardim</Link>
              </li>
              <li>
                <Link to="/jogos/correspondencia" style={location.pathname === "/jogos/correspondencia" ? buttonStyle : inactiveButtonStyle}>Jogo da Correspondência</Link>
              </li>
              <li>
                <Link to="/jogos/memoria" style={location.pathname === "/jogos/memoria" ? buttonStyle : inactiveButtonStyle}>Jogo da Memória</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" style={location.pathname === "/" ? buttonStyle : inactiveButtonStyle}>Home</Link>
              </li>
              <li>
                <Link to="/login" style={location.pathname === "/login" ? buttonStyle : inactiveButtonStyle}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {isLoggedIn && (
        <button onClick={handleLogout} style={{ ...buttonStyle, marginLeft: "auto" }}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;