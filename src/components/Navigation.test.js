import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App'; // Ajuste o caminho conforme necessário

describe('Navigation between PlantWater and PlantInfo', () => {
  test('navigates to PlantInfo page', () => {
    render(<App />);
    
    // Assumindo que há um botão ou link para navegar para PlantInfo
    fireEvent.click(screen.getByText(/Informações da Planta/i));
    
    // Verifica se o componente PlantInfo é renderizado
    expect(screen.getByText(/Feijão \(Phaseolus vulgaris\)/i)).toBeInTheDocument();
  });

  test('navigates to PlantWater page', () => {
    render(<App />);
    
    // Assumindo que há um botão ou link para navegar para PlantWater
    fireEvent.click(screen.getByText(/Monitoramento de Regas/i));
    
    // Verifica se o componente PlantWater é renderizado
    expect(screen.getByText(/Dias passados:/i)).toBeInTheDocument();
  });

  test('navigates to PlantInfo page', () => {
    render(<App />);
    
    // Assumindo que há um botão ou link para navegar para PlantInfo
    fireEvent.click(screen.getByText(/Informações da Planta/i));
    
    // Verifica se o componente PlantInfo é renderizado
    expect(screen.getByText(/Feijão \(Phaseolus vulgaris\)/i)).toBeInTheDocument();
  });
});