import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';  
import Galeria from './Galeria';
import '@testing-library/jest-dom';

// mock do useNavigate diretamente no início do arquivo de testes
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    // mock da funcao useNavigate para evitar redirecionamentos reais acontecam durante os testes
    useNavigate: jest.fn(), 
}));

// mock do modulo PlantasCuriosidades
jest.mock('../PlantasCuriosidades', () => ({
  __esModule: true,
  default: [
    { id: 0, name: 'Planta 0', image: 'planta0.png' },
    { id: 1, name: 'Cacto', image: 'cacto.png' },
    { id: 2, name: 'Suculenta', image: 'suculenta.png' },
    { id: 3, name: 'Orquídea', image: 'orquidea.png' },
    { id: 99, name: 'Planta 99', image: 'planta99.png' },
  ],
}));

describe('Galeria Component', () => {
  
  /** 
   * Teste 1: Verificar a renderização correta dos itens 
   * Critério: Particionamento em Classes de Equivalência 
   * Dados válidos (array preenchido) representam uma classe.
   */
  test('deve renderizar corretamente os itens de PlantasCuriosidades', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Galeria />
        </MemoryRouter>
      </AuthProvider>
    );

    // verifica se os nomes das plantas aparecem na tela
    expect(screen.getByText('Cacto')).toBeInTheDocument();
    expect(screen.getByText('Suculenta')).toBeInTheDocument();
    expect(screen.getByText('Orquídea')).toBeInTheDocument();

    // verifica se as imagens correspondem corretamente aos nomes das plantas
    expect(screen.getByAltText('Cacto')).toHaveAttribute('src', 'cacto.png');
    expect(screen.getByAltText('Suculenta')).toHaveAttribute('src', 'suculenta.png');
    expect(screen.getByAltText('Orquídea')).toHaveAttribute('src', 'orquidea.png');
  });

  describe('Galeria Component', () => {
    // funcao mockada para interceptar navegação, sem redirecionar de fato
    const mockNavigate = jest.fn();
    
    beforeEach(() => {
      // limpa os mocks entre os testes para garantir que o estado nao afete os outros
      jest.clearAllMocks();  
      require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    });
  
    /** 
     * Teste 2: Verificar o redirecionamento correto
     * Critério: Grafo de Causa-Efeito (Tabela de Decisão)
     * Testa se ao clicar na planta, a navegação é feita corretamente
     */
    test('deve redirecionar para o link correto ao clicar em uma planta', () => {
      render(
        <AuthProvider>
          <MemoryRouter>
            <Galeria />
          </MemoryRouter>
        </AuthProvider>
      );

      // utiliza o nome da planta para localizar o link
      const link = screen.getByRole('link', { name: /Cacto/i });
      // verifica se o link contém o atributo href correto
      expect(link).toHaveAttribute('href', '/galeria/1');
    });
  
    /** 
     * Teste 3: Verificar a renderização com limite superior de plantas
     * Critério: Análise de Valor Limite
     * Testa como a aplicação lida com o limite superior de plantas (ex. o número máximo esperado de elementos)
     */
    describe('Limite superior de plantas', () => {
      test('deve lidar corretamente com limite superior de plantas', async () => {
        render(
          <AuthProvider>
            <MemoryRouter>
              <Galeria />
            </MemoryRouter>
          </AuthProvider>
        );
    
        // espera que o componente renderizar e as plantas ficarem visiveis na tela
        await waitFor(() => {
          // verifica se as plantas "Planta 0" e "Planta 99" estão sendo renderizadas
          expect(screen.getByText(/Planta 0/i)).toBeInTheDocument();
          expect(screen.getByText(/Planta 99/i)).toBeInTheDocument();
        });
      });
    });
  });
  
});
