import { Box, Button, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from "@mui/system";
import { useEffect, useState } from 'react';
import Header from '../../Header';
import PlantasCuriosidades from '../../PlantasCuriosidades.js';

const JogoCorrespondencia = () => {
  // eslint-disable-next-line no-unused-vars
  const [detalhes, setDetalhes] = useState([]);
  const [imagens, setImagens] = useState([]);
  const [detalhesEmbaralhados, setDetalhesEmbaralhados] = useState([]);
  const [imagensEmbaralhadas, setImagensEmbaralhadas] = useState([]);
  const [selecionadoDetail, setSelecionadoDetail] = useState(null);
  const [selecionadoImagem, setSelecionadoImagem] = useState(null);
  const [correspondencias, setCorrespondencias] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [cores, setCores] = useState(['#FFD7EE', '#CEEEF8', '#E9F9E5', '#FEF1AB', '#D0C3F1']);
  const [erro, setErro] = useState(null);

  const embaralhar = (array) => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const embaralharPlantas = () => {
    const plantasEscolhidas = [];
    while (plantasEscolhidas.length < 5) {
      const plantaAleatoria = PlantasCuriosidades[Math.floor(Math.random() * PlantasCuriosidades.length)];
      if (!plantasEscolhidas.some(p => p.id === plantaAleatoria.id)) {
        plantasEscolhidas.push(plantaAleatoria);
      }
    }

    const detalhesArray = plantasEscolhidas.map(plant => ({
      detail: plant.details[Math.floor(Math.random() * plant.details.length)],
      id: plant.id,
    }));
    const imagensArray = plantasEscolhidas.map((plant, index) => ({
      name: plant.name,
      image: plant.image,
      id: plant.id,
      color: cores[index],
    }));

    setDetalhes(detalhesArray);
    setImagens(imagensArray);
    setDetalhesEmbaralhados(embaralhar(detalhesArray));
    setImagensEmbaralhadas(embaralhar(imagensArray));
    setCorrespondencias({});
    setSelecionadoDetail(null);
    setSelecionadoImagem(null);
    setErro(null);
  };

  useEffect(() => {
    embaralharPlantas();
  }, []);

  // selecao aleatoria de um detalhe sobre alguma planta
  const handleSelectDetail = (detail) => {
    if (selecionadoImagem) {
      if (selecionadoImagem.id === detail.id) {
        setCorrespondencias((prev) => ({
          ...prev,
          [detail.id]: selecionadoImagem.color,
        }));
        setErro(null);
      } else {
        setErro({ detailId: detail.id, imageId: selecionadoImagem.id });
        setTimeout(() => setErro(null), 1000);
      }
      setSelecionadoDetail(null);
      setSelecionadoImagem(null);
    } else {
      setSelecionadoDetail(detail);
    }
  };

  // selecao de imagem
  const handleSelectImagem = (imagem) => {
    if (selecionadoDetail) {
      if (selecionadoDetail.id === imagem.id) {
        setCorrespondencias((prev) => ({
          ...prev,
          [imagem.id]: imagem.color,
        }));
        setErro(null); 
      } else {
        setErro({ detailId: selecionadoDetail.id, imageId: imagem.id });
        setTimeout(() => setErro(null), 1000);
      }
      setSelecionadoDetail(null);
      setSelecionadoImagem(null);
    } else {
      setSelecionadoImagem(imagem);
    }
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
                Selecione o detalhe correspondente à imagem! 🌱 
                </Typography>
                <Paper sx={{ 
                textAlign: 'center', 
                padding: '10px', 
                backgroundColor: '#A6B37D',
                width: '100%', 
                maxWidth: '850px',
                margin: '0 auto',
                fontFamily: '"Pacifico", cursive'}}>
                    <Typography variant="body1" sx={{ color: '#603F26'}}>
                        Para jogar, clique em um detalhe na coluna da esquerda e, em seguida, clique na imagem da planta que corresponde a este detalhe, na coluna da direita!
                    </Typography>
                </Paper>
            <Box>

            <Grid container spacing={4} mt={2} justifyContent="center">
                <Grid item xs={6} sm={3}>
                {detalhesEmbaralhados.map((detail, index) => (
                    <Button
                    key={index}
                    variant="outlined"
                    onClick={() => handleSelectDetail(detail)}
                    disabled={correspondencias[detail.id]}
                    sx={{
                        display: 'block',
                        mb: 2,
                        backgroundColor: correspondencias[detail.id]
                        ? correspondencias[detail.id]
                        : erro?.detailId === detail.id
                        ? 'rgba(255,0,0,0.3)' // feedback visual de erro
                        : 'transparent',
                        color: correspondencias[detail.id] ? 'white' : 'black',
                        border: erro?.detailId === detail.id ? '2px solid red' : '1px solid black',
                        '&:hover': {
                        backgroundColor: correspondencias[detail.id]
                            ? correspondencias[detail.id]
                            : 'lightgray',
                        },
                        transition: 'all 0.3s ease',
                        maxWidth: '300px',
                        wordWrap: 'break-word',
                    }}>
                        {detail.detail}
                    </Button>
                ))}
                </Grid>

                <Grid item xs={6} sm={3}>
                {imagensEmbaralhadas.map((imagem, index) => (
                    <Button
                    key={index}
                    variant="outlined"
                    onClick={() => handleSelectImagem(imagem)}
                    disabled={correspondencias[imagem.id]}
                    sx={{
                        display: 'block',
                        mb: 2,
                        backgroundColor: correspondencias[imagem.id]
                        ? correspondencias[imagem.id]
                        : erro?.imageId === imagem.id
                        ? 'rgba(255,0,0,0.3)'
                        : 'transparent',
                        color: correspondencias[imagem.id] ? 'white' : 'black',
                        border: erro?.imageId === imagem.id ? '2px solid red' : '1px solid black',
                        '&:hover': {
                        backgroundColor: correspondencias[imagem.id]
                            ? correspondencias[imagem.id]
                            : 'lightgray',
                        },
                        transition: 'all 0.3s ease',
                        width: '150px',
                    }}
                    >
                        <img
                            src={imagem.image}
                            alt={imagem.name}
                            style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                        />
                        <Typography variant="body2">{imagem.name}</Typography>
                    </Button>
                ))}
                </Grid>
            </Grid>

            <Box p={2}></Box>
            {Object.keys(correspondencias).length === imagens.length && (
                        <Typography 
                        variant="h4" 
                        sx={{ fontWeight: 'bold', color: '#603F26', marginBottom: '10px' }}>
                        Parabéns! Você venceu! 
                    </Typography>
            )}

            <Box p={2}></Box>
                <StyledButton
                variant="contained"
                sx={{
                  backgroundColor: "#146356",
                  width: '40%',
                  color: "#FEFAE0",
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  "&:hover": { backgroundColor: "#B6D55F", color: "#146356" },
                }} onClick={embaralharPlantas}>
                    Nova Partida
                </StyledButton>
            </Box>
            </Box>
        </div>
    </div>
  );
};

export default JogoCorrespondencia;
