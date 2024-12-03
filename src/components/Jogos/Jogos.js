import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const Jogos = () => {
  const navigate = useNavigate();

  const jogos = [
    { nome: 'Jogo de Correspondência', descricao: 'Selecione a informação que corresponde à imagem correta.', rota: '/jogos/correspondencia' },
    { nome: 'Jogo da Memória', descricao: 'Combine os pares de cartas.', rota: '/jogos/memoria' },
  ];

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
                <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <Typography 
                        variant="h4" 
                        sx={{ fontWeight: 'bold', color: '#603F26', marginBottom: '10px' }}>
                        Escolha um jogo! 🌱 
                    </Typography>
                    {jogos.map((jogo, index) => (
                    <Card 
                    key={index} 
                    sx={{ maxWidth: 345, width: '100%' }} 
                    onClick={() => navigate(jogo.rota)}
                    >
                    <CardActionArea>
                        <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            {jogo.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {jogo.descricao}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                ))}
                </Box>
            </Box>
        </div>
    </div>
  );
};

export default Jogos;
