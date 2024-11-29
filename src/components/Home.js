import React from "react";
import {
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import gardenImage from "../images/garden.png";
import Header from './Header';

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "50px 0",
  backgroundColor: "#FCF8E8",
  color: "#603F26",
}));

const HeroImage = styled("img")({
  maxWidth: "100%",
  height: "auto",
  marginBottom: "20px",
});

const TextoPrincipal = styled(Typography)({
  fontFamily: '"Pacifico", cursive',
  fontSize: "2rem",
  lineHeight: "1.5",
  color: "#603F26",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  marginBottom: "20px",
});

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
        <HeroImage
          src={gardenImage}
          alt="Ilustração de uma criança em um jardim de plantas"
        />
        <TextoPrincipal variant="h4" gutterBottom>
          Aprenda a plantar, cuidar e se divertir com o mundo das plantas!
        </TextoPrincipal>
        <Box mt={2}>
          {/* remover alertas assim que desenvolver as paginas */}
          <StyledButton
            variant="contained"
            sx={{
              backgroundColor: "#9D5353",
              color: "#FEFAE0",
              "&:hover": { backgroundColor: "#146356" },
              marginRight: "10px",
            }}
            onClick={() => alert("Comece Agora!")}
          >
            Comece Agora!
          </StyledButton>
          <StyledButton
            variant="contained"
            sx={{
              backgroundColor: "#9D5353",
              color: "#FEFAE0",
              "&:hover": { backgroundColor: "#146356" },
            }}
            onClick={handleButtonClick}
          >
            Conheça as Plantas!
          </StyledButton>
        </Box>
      </HeroSection>
    </div>
  );
};

export default Home;