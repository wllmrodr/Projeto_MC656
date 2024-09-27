import React from 'react';

const PlantInfo = () => {
  // Informações sobre a planta (feijão)
  const info = {
    name: 'Feijão (Phaseolus vulgaris)',
    sunExposure: 'Mínimo de 4 horas por dia',
    water: 'Água moderada, 4 a 5 vezes por semana',
    growthTime: '7 a 10 dias para germinar',
    soil: 'Solo rico em nutrientes e bem drenado'
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{info.name}</h1>
      <ul style={styles.list}>
        <li><strong>Exposição ao Sol:</strong> {info.sunExposure}</li>
        <li><strong>Quantidade de Água:</strong> {info.water}</li>
        <li><strong>Tempo de Crescimento:</strong> {info.growthTime}</li>
        <li><strong>Tipo de Solo:</strong> {info.soil}</li>
      </ul>
    </div>
  );
};

// Estilos modificados para posicionar no canto inferior esquerdo
const styles = {
  container: {
    position: 'fixed',
    bottom: '20px', // Posição no canto inferior
    left: '20px',   // Esquerda
    backgroundColor: '#E7F4E4',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '350px',
    textAlign: 'left',
    zIndex: 1000, // Garante que a caixa fique acima de outros elementos
  },
  title: {
    color: '#4CAF50',
    fontSize: '22px',
    marginBottom: '15px',
    marginTop: 0,
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    fontSize: '16px',
    color: '#333',
  }
};

export default PlantInfo;
