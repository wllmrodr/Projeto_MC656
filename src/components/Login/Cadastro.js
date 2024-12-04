import { Box, Button, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import firebaseApp from "../../firebase-config";

const auth = getAuth(firebaseApp);

function Cadastro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);

        try {
            // cria usuario
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // atualiza o perfil do usuário com o nome inserido no cadastro
            await updateProfile(userCredential.user, {
                displayName: name
            });

            // envia o link de verificação para o e-mail
            await sendEmailVerification(userCredential.user);

            setError("");
            setMessage("Cadastro realizado com sucesso! Verifique seu e-mail para confirmar sua conta.");

            setEmail("");
            setPassword("");
            setName("");
        } catch (err) {
            setLoading(false);
            if (err.code === "auth/email-already-in-use") {
                setMessage("");
                setError("Este e-mail já está em uso.");
            } else if (err.code === "auth/weak-password") {
                setMessage("");
                setError("A senha deve ter pelo menos 6 caracteres.");
            } else {
                setMessage("");
                setError("Erro no cadastro: " + err.message);
            }
        }
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
              borderRadius: "8px",
              boxShadow: 3,
              marginTop: "20px",
              backgroundColor: "#E9F5F5",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Cadastro 🌱
            </Typography>
            <Box
              component="form"
              onSubmit={handleSignup}
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  backgroundColor: "#fffccc",
                  borderRadius: 1,
                }}
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: "#fffccc",
                  borderRadius: 1,
                }}
                required
              />
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  backgroundColor: "#fffccc",
                  borderRadius: 1,
                }}
                required
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ marginTop: "10px" }}>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                </Typography>
              )}
              {message && (
                <Typography color="success" variant="body2" sx={{ marginTop: "10px" }}>
                  {message && <div style={{ color: "green" }}>{message}</div>}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="success" 
                fullWidth
                sx={{
                  marginTop: "20px",
                  backgroundColor: "#146356",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#0b4f40",
                  },
                }}
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
    
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" align="center">
                  Já possui cadastro?{" "}
                  <Link to="/login" style={{ textDecoration: "none", color: "#146356" }}>
                    Clique para entrar!
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      );
}

export default Cadastro;
