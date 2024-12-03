import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import logoImage from "../images/logo.png";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#DAE2B6" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img
            src={logoImage}
            alt="Logo da aplicação"
            style={{
              height: "30px",
              objectFit: "contain",
              marginTop: "5px",
            }}
          />
        </Typography>
        <Button component={Link} to="/" color="inherit" sx={{ color: "#603F26" }}>
          <strong>Início</strong>
        </Button>
        <Button color="inherit" sx={{ color: "#603F26" }}>
          <strong>Login</strong>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
