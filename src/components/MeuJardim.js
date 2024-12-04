import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

// Dados das plantas (estático ou poderia vir de uma API/Firestore)
const plantas = [
  {
    id: 1,
    nome: "Planta 1",
    foto: "https://via.placeholder.com/150",
    dataNascimento: "01/12/2024",
    ultimaRega: "03/12/2024",
  },
  {
    id: 2,
    nome: "Planta 2",
    foto: "https://via.placeholder.com/150",
    dataNascimento: "15/11/2024",
    ultimaRega: "01/12/2024",
  },
  {
    id: 3,
    nome: "Planta 3",
    foto: "https://via.placeholder.com/150",
    dataNascimento: "20/10/2024",
    ultimaRega: "29/11/2024",
  },
  {
    id: 12,
    nome: "Planta 12",
    foto: "https://via.placeholder.com/150",
    dataNascimento: "05/09/2024",
    ultimaRega: "30/11/2024",
  },
];

const MeuJardim = () => {
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
