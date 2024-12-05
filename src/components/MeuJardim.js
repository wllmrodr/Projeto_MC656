import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Menu,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import Header from "../components/Header";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const getUserInfo = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? { userId: user.uid, nome: user.displayName || "Usuário" } : { userId: null, nome: "Usuário" };
};

const getPlantasDoUsuario = (userId) => {
  const data = localStorage.getItem(`plantas_${userId}`);
  return data ? JSON.parse(data) : [];
};

const salvarPlantasDoUsuario = (userId, plantas) => {
  localStorage.setItem(`plantas_${userId}`, JSON.stringify(plantas));
};

const MeuJardim = () => {
  const [plantas, setPlantas] = useState([]);
  const [userId, setUserId] = useState(null);
  const [usuarioNome, setUsuarioNome] = useState("Usuário");
  const [openDialog, setOpenDialog] = useState(false);
  const [novaPlanta, setNovaPlanta] = useState({ nome: "", especie: "", foto: "" });
  const [openRegaDialog, setOpenRegaDialog] = useState(false);  // Estado para o diálogo da data de rega
  const [dataRega, setDataRega] = useState("");  // Estado para armazenar a data da rega selecionada
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPlantaId, setSelectedPlantaId] = useState(null);

  const especiesDisponiveis = [
    "Alface", "Alho", "Cebolinha", "Cenoura", "Ervilha", "Feijão", "Girassol",
    "Manjericão", "Menta", "Morango", "Salsa", "Tomate",
  ];

  const fotosEspecies = {
    "Alface": "/images/plantas/alface.jpg", "Alho": "/images/plantas/alho.jpg", "Cebolinha": "/images/plantas/cebolinha.jpg",
    "Cenoura": "/images/plantas/cenoura.jpg", "Ervilha": "/images/plantas/ervilha.jpg", "Feijão": "/images/plantas/feijao.jpg",
    "Girassol": "/images/plantas/girassol.jpg", "Manjericão": "/images/plantas/manjericao.jpg", "Menta": "/images/plantas/menta.jpg",
    "Morango": "/images/plantas/morango.jpg", "Salsa": "/images/plantas/salsa.jpg", "Tomate": "/images/plantas/tomate.jpg",
  };

  useEffect(() => {
    const { userId, nome } = getUserInfo();
    if (userId) {
      setUserId(userId);
      setUsuarioNome(nome);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const plantasDoUsuario = getPlantasDoUsuario(userId);
      setPlantas(plantasDoUsuario);
    }
  }, [userId]);

  const handleAddPlanta = () => {
    const novaPlantaObj = {
      id: plantas.length + 1,
      nome: novaPlanta.nome,
      foto: fotosEspecies[novaPlanta.especie] || "/images/plantas/default.jpg",
      dataNascimento: new Date().toISOString().split("T")[0],
      ultimaRega: new Date().toISOString().split("T")[0],
      especie: novaPlanta.especie,
    };
    const novasPlantas = [...plantas, novaPlantaObj];
    salvarPlantasDoUsuario(userId, novasPlantas);
    setPlantas(novasPlantas);
    setOpenDialog(false);
    setNovaPlanta({ nome: "", especie: "", foto: "" });
  };

  const handleMenuClick = (event, plantaId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlantaId(plantaId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePlanta = () => {
    if (selectedPlantaId !== null) {
      const novasPlantas = plantas.filter(planta => planta.id !== selectedPlantaId);
      salvarPlantasDoUsuario(userId, novasPlantas);
      setPlantas(novasPlantas);
      setAnchorEl(null);
    }
  };

  const handleAddRega = () => {
    if (selectedPlantaId !== null && dataRega) {
      const novasPlantas = plantas.map(planta =>
        planta.id === selectedPlantaId ? { ...planta, ultimaRega: dataRega } : planta
      );
      salvarPlantasDoUsuario(userId, novasPlantas);
      setPlantas(novasPlantas);
      setOpenRegaDialog(false);  // Fechar o diálogo da rega após adicionar
      setDataRega("");  // Limpar a data
    }
  };

  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "#E3F2FD", minHeight: "100vh", padding: "20px" }}>
        <h1 style={{ textAlign: "center", color: "#146356" }}>
          Jardim de {usuarioNome}
        </h1>
        <Grid container spacing={3}>
          {plantas.map((planta) => (
            <Grid item xs={12} sm={6} md={4} key={planta.id}>
              <Card sx={{ maxWidth: 345, backgroundColor: "#C8E6C9", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", position: "relative" }}>
                <IconButton sx={{ position: "absolute", top: 8, right: 8, color: "white" }} onClick={(event) => handleMenuClick(event, planta.id)}>
                  <MoreVertIcon />
                </IconButton>
                <CardMedia component="img" height="140" image={planta.foto} alt={planta.nome} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">{planta.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">Espécie: {planta.especie}</Typography>
                  <Typography variant="body2" color="text.secondary">Data de Nascimento: {planta.dataNascimento}</Typography>
                  <Typography variant="body2" color="text.secondary">Última Rega: {planta.ultimaRega}</Typography>
                </CardContent>
              </Card>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Editar</MenuItem>
                <MenuItem onClick={() => setOpenRegaDialog(true)}>Adicionar Nova Rega</MenuItem>
                <MenuItem onClick={handleDeletePlanta}>Excluir</MenuItem>
              </Menu>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, backgroundColor: "#B3E5FC", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", height: "180px" }}>
              <Typography gutterBottom variant="h5" component="div">Nova Planta</Typography>
              <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>Adicionar</Button>
            </Card>
          </Grid>
        </Grid>

        {/* Dialog para adicionar a rega */}
        <Dialog open={openRegaDialog} onClose={() => setOpenRegaDialog(false)}>
          <DialogTitle>Adicionar Nova Rega</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Data da Rega"
              type="date"
              value={dataRega}
              onChange={(e) => setDataRega(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRegaDialog(false)}>Cancelar</Button>
            <Button onClick={handleAddRega} variant="contained" color="primary">Adicionar</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog para adicionar nova planta */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Adicionar Nova Planta</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel id="especie-label">Espécie</InputLabel>
              <Select
                labelId="especie-label"
                value={novaPlanta.especie}
                onChange={(e) => setNovaPlanta({ ...novaPlanta, especie: e.target.value })}
              >
                {especiesDisponiveis.map((especie) => (
                  <MenuItem key={especie} value={especie}>{especie}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Nome da Planta"
              value={novaPlanta.nome}
              onChange={(e) => setNovaPlanta({ ...novaPlanta, nome: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={handleAddPlanta} variant="contained" color="primary">Adicionar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default MeuJardim;
