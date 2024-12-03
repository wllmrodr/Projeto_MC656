import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflow: "hidden", backgroundColor: "#B6D55F" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Logo
          {/*<img
            src={logoImage}
            alt="Logo da aplicação"
            style={{
              height: "50px",
              objectFit: "contain",
            }}
          />*/}
        </Typography>
        <Button component={Link} to="/" color="inherit" sx={{ color: "#603F26", textTransform: 'none' }}>
          <strong>🌿 Início</strong>
        </Button>
        <Button color="inherit" sx={{ color: "#603F26", textTransform: 'none' }}>
          <strong>🌿 Jogos</strong>
        </Button>
        <Button color="inherit" sx={{ color: "#603F26", textTransform: 'none' }}>
          <strong>🌿 Login</strong>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
