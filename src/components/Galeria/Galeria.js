
import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import PlantasCuriosidades from "../PlantasCuriosidades";
import Header from '../Header';
import titleText from "./titulo-secao.png";

const Galeria = () => {
  return (
    <div>
      <Header />
    <div
      style={{
        backgroundColor: "#E9F5F5",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <Box align="center">
        <img
          src={titleText}
          alt="Logo da aplicação"
          style={{
            alignContent: "center",
            height: "50px",
            objectFit: "contain",
          }}
        />
      </Box>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {PlantasCuriosidades.map((plant) => (
          <Grid item xs={12} sm={6} md={3} key={plant.id}>
            <Card
              sx={{
                backgroundColor: "#603F26",
                color: "#E9F5F5",
                textAlign: "center",
              }}
            >  
              <Box p={1}>
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto", 
                  }}
                  image={plant.image}
                  alt={plant.name}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" component="div">
                  <strong>{plant.name}</strong>
                </Typography>
                <Link
                  to={`/galeria/${plant.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#E9F5F5",
                    fontFamily: "'Roboto', sans-serif" 
                  }}
                >
                  Ver detalhes
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </div>
    </div>
    </div>
  );
};


export default Galeria;
