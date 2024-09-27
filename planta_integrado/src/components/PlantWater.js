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
  const [lastWateredTime, setLastWateredTime] = useState(0); // Dias da última rega
  const [daysSinceLastWatered, setDaysSinceLastWatered] = useState(0); // Dias desde a última rega

  // Estado para armazenar se a planta cresceu
  const [plantGrown, setPlantGrown] = useState(false);

  // Função para avançar as imagens e iniciar o contador de dias
  const handleClick = () => {
    if (currentImageIndex === 0 || currentImageIndex === 2 || currentImageIndex === 4) {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex === images.length - 1) {
          setPlantGrown(true); // Define que a planta cresceu
        }
        return nextIndex;
      });
      setShowNextImage(true);  // Inicia a transição da imagem
      
      // Armazena o número de dias passados como a última vez que foi regada
      setLastWateredTime(daysPassed);
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
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex === images.length - 1) {
            setPlantGrown(true); // Define que a planta cresceu
          }
          return nextIndex;
        });
        setShowNextImage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showNextImage]);

  // Efeito para atualizar o contador de dias e o tempo desde a última rega
  useEffect(() => {
    let interval;
    if (isMonitoring && !plantGrown) { // Para o contador se a planta cresceu
      interval = setInterval(() => {
        setDaysPassed((prevDays) => prevDays + 1);

        // Atualiza os dias desde a última rega
        if (lastWateredTime !== null) {
          const daysSinceWatered = daysPassed - lastWateredTime;
          setDaysSinceLastWatered(daysSinceWatered);
        }
      }, 3000);  // Incrementa o contador a cada 3 segundos
    }

    return () => clearInterval(interval);
  }, [isMonitoring, lastWateredTime, daysPassed, plantGrown]); // Adiciona plantGrown na lista de dependências

  return (
    <div>
      <h1>Monitoramento de Regas</h1>
      <p>Dias passados: {daysPassed}</p>
      <p>Dias desde a última rega: {daysSinceLastWatered}</p>

      {/* Exibe a mensagem de recomendação */}
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        Recomenda-se regar a planta a cada três dias.
      </p>

      {/* Verifica se a planta morreu ou exibe a imagem */}
      {daysSinceLastWatered > 4 ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>A planta morreu.</p>
      ) : plantGrown ? (
        <>
          <img 
            src={images[images.length - 1]} 
            alt="Current" 
            style={{ width: '300px', height: '300px' }} 
          />
          <p style={{ color: 'blue', fontWeight: 'bold' }}>Parabéns, a planta cresceu!</p>
        </>
      ) : (
        <img 
          src={images[currentImageIndex]} 
          alt="Current" 
          style={{ width: '300px', height: '300px' }} 
        />
      )}
      
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
