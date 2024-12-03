import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../firebase-config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <Box sx={{
      backgroundColor: "#B6D55F",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#E9F5F5",
          borderRadius: "8px",
          boxShadow: 3,
          marginTop: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>Entrar na sua conta 🌱</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            autoFocus
            sx={{
              backgroundColor: "#fffccc",
              borderRadius: 1,
            }}
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{
              backgroundColor: "#fffccc",
              borderRadius: 1,
            }}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#146356",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#0b4f40",
              },
            }}
          >
            Entrar
          </Button>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" align="center">
              Não possui cadastro?{" "}
              <Link to="/cadastro" style={{ textDecoration: "none", color: "#146356" }}>
                Cadastre-se aqui!
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
