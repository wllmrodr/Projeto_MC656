import React, { useState, useEffect } from 'react';
import images from './images';
import './PlantWater.css';

const PlantWater = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Função para manipular cliques no botão de progresso
  const handleClick = () => {
    if (isWateringStage(currentImageIndex)) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Verifica se o índice atual permite um estágio de rega
  const isWateringStage = (index) => [0, 2, 4].includes(index);

  // Exibe a próxima imagem automaticamente após 2 segundos quando aplicável
  useEffect(() => {
    if (isWateringStage(currentImageIndex - 1)) {
      const timer = setTimeout(() => {
        setCurrentImageIndex(currentImageIndex + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentImageIndex]);

  return (
    <div>
      <img src={images[currentImageIndex]} alt="Current" className="image" />
      {isWateringStage(currentImageIndex) && (
        <button className="water-button" onClick={handleClick}>
          Clique para regar
        </button>
      )}
    </div>
  );
};

export default PlantWater;
