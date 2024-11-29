
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import PlantasCuriosidades from "../PlantasCuriosidades";
import Header from '../Header';

const Galeria = () => {
  return (
    <div>
      <Header />
    <div
      style={{
        backgroundColor: "#FEFAE0",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#603F26" }}
      >
        Galeria de Plantas
      </Typography>
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
                backgroundColor: "#C0C78C",
                color: "#603F26",
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                height="310"
                image={plant.image}
                alt={plant.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {plant.name}
                </Typography>
                <Link
                  to={`/galeria/${plant.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#603F26",
                    fontWeight: "bold",
                    fontFamily: '"Pacifico", cursive',
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
