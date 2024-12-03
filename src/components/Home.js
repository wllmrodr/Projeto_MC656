import React from "react";
import {
  Button,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Header from './Header';
import gardenRight from "../images/home-right.png";
import homeText from "../images/home-text.png";

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  backgroundColor: "#E9F5F5",
  color: "#603F26",
  padding: "50px 0",
  marginTop: "5px",
  borderRadius: "10px"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "8px",
}));

const Home = () => {
  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    navigate('/galeria');
  };

  return (
    <div>
      <Header />
      <HeroSection>
        <Grid container style={{ height: '100vh' }}>
          <Grid container item xs={6} direction="column" style={{ height: '100%', width: '50%' }}>
            <Grid item style={{ flex: 1 }}>
              <Paper elevation={0} style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', flexDirection: "column", gap: "30px" }}>
                <img
                  src={homeText}
                  alt="Imagem contendo o texto 'Aprenda a plantar, cuidar e se divertir com o mundo das plantas!'"
                  style={{ width: '80%', height: 'auto' }}
                  />
                <StyledButton
                variant="contained"
                sx={{
                  backgroundColor: "#146356",
                  width: '40%',
                  color: "#FEFAE0",
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  "&:hover": { backgroundColor: "#B6D55F", color: "#146356" },
                }}
                onClick={handleButtonClick}
              >
                Comece agora!
              </StyledButton>
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={6} style={{ height: '100%', width: '50%' }}>
            <Paper elevation={0} style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
              <img
                src={gardenRight}
                alt="Imagem contendo a ilustração de uma árvores e duas crianças com um cachorro em frente."
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </Paper>
          </Grid>
        </Grid>
      </HeroSection>
    </div>
    );
};

export default Home;