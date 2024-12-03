import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Typography,
  } from "@mui/material";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import firebaseApp from "./firebase-config";

const RotaProtegida = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#E9F5F5',
      textAlign: 'center',
    }}
  >
    <CircularProgress sx={{ color: '#146356' }} size={60} />
    <Typography
      sx={{
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#146356',
      }}
    >
      Carregando, por favor aguarde...
    </Typography>
  </Box>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RotaProtegida;