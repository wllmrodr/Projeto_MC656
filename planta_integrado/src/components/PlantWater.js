import React, { useState, useEffect } from 'react';

import image1 from '../bean-images/bean1.png'
import image2 from '../bean-images/bean2.png'
import image3 from '../bean-images/bean3.png'
import image4 from '../bean-images/bean4.png'
import image5 from '../bean-images/bean5.png'
import image6 from '../bean-images/bean6.png'
import image7 from '../bean-images/bean7.png'

const images = [image1, image2, image3, image4, image5, image6, image7];

const PlantWater = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNextImage, setShowNextImage] = useState(false);

  // Function to handle button clicks to progress the sequence
  const handleClick = () => {
    if (currentImageIndex === 0 || currentImageIndex === 2 || currentImageIndex === 4) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
      setShowNextImage(true);  // Trigger the 2-second transition for the next image
    }
  };

  // Automatically display the next image after 2 seconds when needed
  useEffect(() => {
    if (showNextImage) {
      const timer = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        setShowNextImage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showNextImage]);

  return (
    <div>
      <img src={images[currentImageIndex]} alt="Current" style={{ width: '300px', height: '300px' }} />
      {(currentImageIndex === 0 || currentImageIndex === 2 || currentImageIndex === 4) && (
          <><br></br><button onClick={handleClick}>
            Clique para regar
          </button></>
      )}
    </div>
  );
};

export default PlantWater;