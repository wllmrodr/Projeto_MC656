import React from 'react';
import plantInfoData from './plantInfoData';
import './PlantInfo.css';

const PlantInfo = () => (
  <div className="container">
    <h1 className="title">{plantInfoData.name}</h1>
    <ul className="list">
      <li><strong>Exposição ao Sol:</strong> {plantInfoData.sunExposure}</li>
      <li><strong>Quantidade de Água:</strong> {plantInfoData.water}</li>
      <li><strong>Tempo de Crescimento:</strong> {plantInfoData.growthTime}</li>
      <li><strong>Tipo de Solo:</strong> {plantInfoData.soil}</li>
    </ul>
  </div>
);

export default PlantInfo;
