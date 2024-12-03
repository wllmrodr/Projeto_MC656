import { Typography, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import PlantasCuriosidades from "../PlantasCuriosidades";
import Header from '../Header';

const DetalhesPlantas = () => {
  const { id } = useParams();
  const plant = PlantasCuriosidades.find((p) => p.id === parseInt(id));


  return (
    <div>
      <Header />
      <div
          style={{
            backgroundColor: "#E9F5F5",
            padding: "20px",
          }}
        >
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
                🌸 <strong>{plant.description}</strong>
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
                  </ul></Paper>
                </Box>
              </Grid>

            </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default DetalhesPlantas;
