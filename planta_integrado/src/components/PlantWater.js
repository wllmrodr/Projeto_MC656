import React, { useState, useEffect } from 'react';

import image1 from '../bean-images/bean1.png';
import image2 from '../bean-images/bean2.png';
import image3 from '../bean-images/bean3.png';
import image4 from '../bean-images/bean4.png';
import image5 from '../bean-images/bean5.png';
import image6 from '../bean-images/bean6.png';
import image7 from '../bean-images/bean7.png';

const images = [image1, image2, image3, image4, image5, image6, image7];

const PlantWater = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNextImage, setShowNextImage] = useState(false);
  const [daysPassed, setDaysPassed] = useState(0);  // Estado para o contador de dias
  const [isMonitoring, setIsMonitoring] = useState(false);  // Controle para o monitoramento

  // Função para avançar as imagens e iniciar o contador de dias
  const handleClick = () => {
    if (currentImageIndex === 0 || currentImageIndex === 2 || currentImageIndex === 4) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
      setShowNextImage(true);  // Inicia a transição da imagem
    }
    
    // Inicia o monitoramento do tempo ao clicar
    if (!isMonitoring) {
      setIsMonitoring(true);
    }
  };

  // Efeito para exibir a próxima imagem após 2 segundos
  useEffect(() => {
    if (showNextImage) {
      const timer = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        setShowNextImage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showNextImage]);

  // Efeito para atualizar o contador de dias a cada 3 segundos
  useEffect(() => {
    let interval;
    if (isMonitoring) {
      interval = setInterval(() => {
        setDaysPassed((prevDays) => prevDays + 1);
      }, 3000);  // Incrementa o contador a cada 3 segundos
    }

    return () => clearInterval(interval);
  }, [isMonitoring]);

  return (
    <div>
      <h1>Monitoramento de Regas</h1>
      <p>Dias passados: {daysPassed}</p>

      {/* Exibe a mensagem de recomendação */}
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        Recomenda-se regar a planta a cada três dias.
      </p>
      
      <img 
        src={images[currentImageIndex]} 
        alt="Current" 
        style={{ width: '300px', height: '300px' }} 
      />
      
      {(currentImageIndex === 0 || currentImageIndex === 2 || currentImageIndex === 4) && (
        <>
          <br />
          <button onClick={handleClick}>
            Clique para regar
          </button>
        </>
      )}
    </div>
  );
};

export default PlantWater;
