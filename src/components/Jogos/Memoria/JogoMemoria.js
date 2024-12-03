import React, { useState, useEffect } from "react";
import PlantasCuriosidades from '../../PlantasCuriosidades.js';
import Header from '../../Header';
import { Card, Typography, Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from "@mui/system";

const JogoMemoria = () => {
    const [cartas, setCartas] = useState([]);
    const [cartasViradas, setCartasViradas] = useState([]);
    const [matchCount, setMatchCount] = useState(0);
  
    const embaralharCartas = () => {
        // escolhe quatro plantas aleatórias do array de dados
        const plantasEscolhidas = [];
        while (plantasEscolhidas.length < 4) {
          const plantaAleatoria = PlantasCuriosidades[Math.floor(Math.random() * PlantasCuriosidades.length)];
          if (!plantasEscolhidas.some(p => p.id === plantaAleatoria.id)) {
            plantasEscolhidas.push(plantaAleatoria);
          }
        }
      
        const cartasComImagens = [
          ...plantasEscolhidas.map(plant => ({ image: plant.image, id: plant.id })),
          ...plantasEscolhidas.map(plant => ({ image: plant.image, id: plant.id })),
        ];
      
        const cartasEmbaralhadas = cartasComImagens
          .map((item) => ({ ...item, key: Math.random(), virou: false, encontrou: false }))
          .sort(() => Math.random() - 0.5);
      
        setCartas(cartasEmbaralhadas);
        setCartasViradas([]);
        setMatchCount(0);
      };
      

    const novaPartida = () => {
        embaralharCartas();
        setMatchCount(0);
      };
  
    useEffect(() => {
      embaralharCartas();
    }, []);
  
    // funcao que lida com a virada das cartas
    const virarCarta = (index) => {
      // so pode virar duas cartas por vez
      if (cartasViradas.length === 2) {
        return;
      }
      // impede que pares ja encontrados seram virados
      if (cartas[index].encontrou) {
        return;
      }
  
      const novaCartasViradas = [...cartasViradas, index];
      const cartasAtualizadas = [...cartas];
      // marca a carta como virada
      cartasAtualizadas[index].virou = true;
  
      setCartas(cartasAtualizadas);
      setCartasViradas(novaCartasViradas);
  
      if (novaCartasViradas.length === 2) {
        // verificando se as cartas viradas são iguais
        const [primeiraCarta, segundaCarta] = novaCartasViradas;
        if (cartas[primeiraCarta].id === cartas[segundaCarta].id) {
          setMatchCount(matchCount + 1);
          // marcando as cartas como encontradas
          cartasAtualizadas[primeiraCarta].encontrou = true;
          cartasAtualizadas[segundaCarta].encontrou = true;
          setCartas(cartasAtualizadas);
          setCartasViradas([]);
        } else {
          // se nao for par, vira novamente depois de tempo
          setTimeout(() => {
            const cartasResetadas = [...cartas];
            cartasResetadas[primeiraCarta].virou = false;
            cartasResetadas[segundaCarta].virou = false;
            setCartas(cartasResetadas);
            setCartasViradas([]);
          }, 1000);
        }
      }
    };
  
    const renderCarta = (index) => {
      const carta = cartas[index];
      const cartaVirada = carta.virou;
      return (
        <Card
          key={carta.key}
          onClick={() => virarCarta(index)}
          style={{
            width: "140px",
            height: "155px",
            margin: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // desabilita o clique em cartas de pares encontrados
            cursor: cartaVirada || carta.encontrou ? "default" : "pointer",
          }}
        >
          {cartaVirada || carta.encontrou ? (
            <img
              src={carta.image}
              alt={`Planta ${carta.id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
                color: "#fff",
              }}
            >
              ?
            </div>
          )}
        </Card>
      );
    };
  
    const StyledButton = styled(Button)(({ theme }) => ({
        fontWeight: "bold",
        padding: "10px 20px",
        borderRadius: "8px",
      }));

    return (
      <div>
        <Header />
        <div
        style={{
          backgroundColor: "#E9F5F5",
          padding: "20px",
        }}>
            <Box sx={{ textAlign: 'center',
            fontFamily: '"Pacifico", cursive',
            color: "#603F26",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            marginBottom: "20px",
            }}>
                <Typography 
                    variant="h4" 
                    sx={{ fontWeight: 'bold', color: '#603F26', marginBottom: '10px' }}>
                    Jogo da memória! 🌱 
                </Typography>
                <Grid
                container
                spacing={2}
                justifyContent="center"
                style={{ maxWidth: "700px", margin: "0 auto" }}
                >
                {cartas.map((_, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                    {renderCarta(index)}
                    </Grid>
                ))}
                </Grid>
                <Box p={2}></Box>
                {matchCount === cartas.length / 2 && (<>
                <Typography 
                    variant="h4" 
                    sx={{ fontWeight: 'bold', color: '#603F26', marginBottom: '10px' }}>
                    Parabéns! Você venceu! 
                </Typography></>)}
                <Box p={2}></Box>
                <StyledButton
                variant="contained"
                sx={{
                  backgroundColor: "#146356",
                  width: '40%',
                  color: "#FEFAE0",
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  "&:hover": { backgroundColor: "#B6D55F", color: "#146356" },
                }} onClick={novaPartida}>
                    Nova Partida
                </StyledButton>
            </Box>
        </div>
      </div>
    );
  };
  
  export default JogoMemoria;