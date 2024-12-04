import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

// Função para recuperar plantas do localStorage com base no usuário
const getPlantasDoUsuario = (userId) => {
  const data = localStorage.getItem(`plantas_${userId}`);
  return data ? JSON.parse(data) : [];
};

// Função para salvar plantas no localStorage
const salvarPlantasDoUsuario = (userId, plantas) => {
  localStorage.setItem(`plantas_${userId}`, JSON.stringify(plantas));
};

const MeuJardim = ({ userId }) => {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    // Carrega as plantas do usuário atual ao montar o componente
    const plantasDoUsuario = getPlantasDoUsuario(userId);
    setPlantas(plantasDoUsuario);
  }, [userId]);

  // Exemplo para inicializar o jardim do usuário com dados fixos na primeira vez
  useEffect(() => {
    if (plantas.length === 0) {
      const plantasIniciais = [
        {
          id: 1,
          nome: "Planta 1 - exemplo",
          foto: "https://via.placeholder.com/150",
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
    <div
      style={{
        backgroundColor: "#E3F2FD", // Azul claro
        minHeight: "100vh", // Garante que o fundo cubra toda a altura da tela
        padding: "20px", // Espaçamento interno para afastar os elementos das bordas
      }}
    >
      <h1 style={{ textAlign: "center", color: "#146356" }}>Meu Jardim</h1>
      <Grid container spacing={3}>
        {plantas.map((planta) => (
          <Grid item xs={12} sm={6} md={4} key={planta.id}>
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: "#C8E6C9", // Verde claro
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Adiciona sombra
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={planta.foto} // Foto da planta
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
  );
};

export default MeuJardim;
