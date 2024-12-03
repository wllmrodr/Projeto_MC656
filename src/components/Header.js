import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../firebase-config";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    // verificando se o usuario este autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
        navigate("/"); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AppBar position="static" sx={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflow: "hidden", backgroundColor: "#B6D55F" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Logo
          {/*<img
            src={logoImage}
            alt="Logo da aplicação"
            style={{
              height: "50px",
              objectFit: "contain",
            }}
          />*/}
        </Typography>
        <Button component={Link} to="/" color="inherit" sx={{ color: "#603F26", textTransform: 'none' }}>
          <strong>🌿 Início</strong>
        </Button>
        {isAuthenticated ? (
          // header para usuario logado
          <>
          <Button color="inherit" component={Link} to="/jogos" sx={{ color: "#603F26", textTransform: 'none' }}>
            <strong>🌿 Jogos</strong>
          </Button>
          <Button color="inherit" onClick={handleLogout} sx={{ color: "#603F26", textTransform: 'none' }}>
            <strong>Logout</strong>
          </Button>
          </>
        ) : (
          // header para usuario deslogado
          <>
            <Button color="inherit" component={Link} to="/login" sx={{ color: "#603F26", textTransform: 'none' }}>
              <strong>Login</strong>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
