import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { getAuth } from "firebase/auth";
import Header from "../components/Header"; // Ajuste o caminho se necessário


// Função para obter o userId e nome do usuário do Firebase
const getUserInfo = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? { userId: user.uid, nome: user.displayName || "Usuário" } : { userId: null, nome: "Usuário" };
};

// Função para recuperar plantas do localStorage com base no usuário
const getPlantasDoUsuario = (userId) => {
  const data = localStorage.getItem(`plantas_${userId}`);
  return data ? JSON.parse(data) : [];
};

// Função para salvar plantas no localStorage
const salvarPlantasDoUsuario = (userId, plantas) => {
  localStorage.setItem(`plantas_${userId}`, JSON.stringify(plantas));
};

const MeuJardim = () => {
  const [plantas, setPlantas] = useState([]);
  const [userId, setUserId] = useState(null);
  const [usuarioNome, setUsuarioNome] = useState("Usuário");

  useEffect(() => {
    const { userId, nome } = getUserInfo();
    if (userId) {
      setUserId(userId);
      setUsuarioNome(nome);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const plantasDoUsuario = getPlantasDoUsuario(userId);
      setPlantas(plantasDoUsuario);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && plantas.length === 0) {
      const plantasIniciais = [
        {
          id: 1,
          nome: "Planta 1 - exemplo",
          foto: "/images/plantas/alface.jpg",
          dataNascimento: "01/12/2024",
          ultimaRega: "03/12/2024",
        },
        {
          id: 2,
          nome: "Planta 2 - exemplo",
          foto: "https://via.placeholder.com/150",
          dataNascimento: "15/11/2024",
          ultimaRega: "01/12/2024",
        },
      ];
      salvarPlantasDoUsuario(userId, plantasIniciais);
      setPlantas(plantasIniciais);
    }
  }, [plantas, userId]);

  return (
    <div>
      {/* Inclui o Header */}
      <Header />
      <div
        style={{
          backgroundColor: "#E3F2FD",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#146356" }}>
          Jardim de {usuarioNome}
        </h1>
        <Grid container spacing={3}>
          {plantas.map((planta) => (
            <Grid item xs={12} sm={6} md={4} key={planta.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  backgroundColor: "#C8E6C9",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={planta.foto}
                  alt={planta.nome}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {planta.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {planta.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Data de Nascimento: {planta.dataNascimento}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Última Rega: {planta.ultimaRega}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default MeuJardim;