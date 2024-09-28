import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import PlantWater from './PlantWater';

jest.useFakeTimers();

describe('PlantWater Component', () => {
  beforeEach(() => {
    render(<PlantWater />);
  });

  test('initial state is correct', () => {
    expect(screen.getByText(/Dias passados: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Dias desde a última rega: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Recomenda-se regar a planta a cada três dias./i)).toBeInTheDocument();
  });

  test('button click advances image and updates state', () => {
    fireEvent.click(screen.getByText(/Clique para regar/i));
    expect(screen.getByAltText(/Current/i)).toHaveAttribute('src', expect.stringContaining('bean2.png'));
    expect(screen.getByText(/Dias desde a última rega: 0/i)).toBeInTheDocument();
  });

  test('image transitions correctly after button click', async () => {
    fireEvent.click(screen.getByText(/Clique para regar/i));
    await act(async () => {
      jest.advanceTimersByTime(3000); // Simulate 3 seconds
    });
    expect(screen.getByAltText(/Current/i)).toHaveAttribute('src', expect.stringContaining('bean3.png'));
  });

  test('day counter updates correctly', async () => {
    fireEvent.click(screen.getByText(/Clique para regar/i));
    await act(async () => {
      jest.advanceTimersByTime(3000); // Simulate 3 seconds
    });
    expect(screen.getByText(/Dias passados: 1/i)).toBeInTheDocument();
  });

  test('plant grows after correct number of clicks', async () => {
    fireEvent.click(screen.getByText(/Clique para regar/i)); // to bean2
    await act(async () => {
      jest.advanceTimersByTime(2000); // Simulate 2 seconds
    });
    fireEvent.click(screen.getByText(/Clique para regar/i)); // to bean4
    await act(async () => {
      jest.advanceTimersByTime(2000); // Simulate 2 seconds
    });
    fireEvent.click(screen.getByText(/Clique para regar/i)); // to bean6
    await act(async () => {
      jest.advanceTimersByTime(2000); // Simulate 2 seconds
    });

    expect(screen.getByText(/Parabéns, a planta cresceu!/i)).toBeInTheDocument();
  });
});