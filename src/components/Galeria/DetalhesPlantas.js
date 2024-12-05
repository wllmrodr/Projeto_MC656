import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import PlantasCuriosidades from "../PlantasCuriosidades";

const DetalhesPlantas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = PlantasCuriosidades.find((p) => p.id === parseInt(id));
  
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBackClick = () => {
    navigate('/galeria');
  };

  return (
    <div>
      <Header />
      <div
        style={{
          backgroundColor: "#E9F5F5",
          padding: "20px",
          position: "relative"
        }}
      >
        <IconButton 
          onClick={handleBackClick} 
          sx={{ position: "absolute", top: "20px", left: "20px", color: "#603F26" }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ textAlign: 'center',
            fontFamily: '"Pacifico", cursive',
            color: "#603F26",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            marginBottom: "20px",
        }}>
          <Typography 
            variant="h4" 
            sx={{ fontWeight: 'bold', color: '#603F26', marginBottom: '10px' }}>
            {plant.name}
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
                🌸 {plant.description}
              </Typography>
          </Paper>
        </Box>

        <Paper sx={{ 
          padding: '10px', 
          backgroundColor: '#9D5353', 
          width: '100%', 
          maxWidth: '850px',
          margin: '0 auto',
          fontFamily: '"Pacifico", cursive' }}>  
          <Grid container spacing={0.1} justifyContent="center" alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', 
                justifyContent: 'right',
                alignItems: 'right',
                height: '100%', }}>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '10px',
                      marginTop: '20px',
                      marginBottom: '20px',}}/>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ paddingTop: '25px', paddingLeft: '25px' }}>
                  <Paper sx={{ 
                    padding: '10px', 
                    backgroundColor: '#ac6464', 
                    width: '100%', 
                    maxWidth: '500px',
                    margin: '0 auto', }}>  
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FEFAE0', marginBottom: '10px' }}>
                      Curiosidades:
                    </Typography>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                      {plant.details.map((detail, index) => (
                        <li key={index} style={{ color: '#FEFAE0', marginBottom: '10px' }}>
                          🌱 {detail}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handleOpenModal} 
                      sx={{ marginTop: '10px', backgroundColor: '#603F26' }}>
                      Ver dicas de plantio
                    </Button>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
        </Paper>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal} PaperProps={{
        sx: {
          backgroundColor: "#E9F5F5",
        }}}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {plant.name} - Dicas de Plantio
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Dificuldade: </strong>{plant.guide.difficulty}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Dicas:
          </Typography>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {plant.guide.steps.map((tip, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                🌱 {tip}
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetalhesPlantas;