class TimeComponent {
    constructor(updateFrequencyInHours = 24) {
      this.updateFrequency = updateFrequencyInHours * 60 * 60 * 1000; // Converte horas para milissegundos
      this.lastUpdateTimestamps = {}; // Armazena o último timestamp de cada planta
    }
  
    /**
     * Registra uma nova planta no sistema e define o tempo inicial de atualização.
     * @param {string} plantId - ID único da planta.
     */
    registrarPlanta(plantId) {
      this.lastUpdateTimestamps[plantId] = Date.now();
    }
  
    /**
     * Verifica se o tempo necessário para atualização de uma planta foi atingido.
     * @param {string} plantId - ID único da planta.
     * @returns {boolean} - True se a planta precisa de atualização, False caso contrário.
     */
    precisaAtualizar(plantId) {
      const now = Date.now();
      const lastUpdate = this.lastUpdateTimestamps[plantId];
      return now - lastUpdate >= this.updateFrequency;
    }
  
    /**
     * Atualiza o estado de uma planta e redefine seu timestamp.
     * @param {string} plantId - ID único da planta.
     * @param {function} atualizarEstado - Função que atualiza o estado da planta (ex.: saúde).
     */
    atualizarPlanta(plantId, atualizarEstado) {
      if (this.precisaAtualizar(plantId)) {
        atualizarEstado(plantId); // Executa a lógica de atualização (ex.: diminuir saúde)
        this.lastUpdateTimestamps[plantId] = Date.now(); // Atualiza o timestamp
      }
    }
  }
  
  module.exports = TimeComponent;

  /* Para utilizar essa parte na main é necessário implementar o seguinte código:
  const TimeComponent = require('./TimeComponent');

// Cria uma instância do componente com frequência de 12 horas
const timeComponent = new TimeComponent(12);

// Função simulada para atualizar o estado da planta
const atualizarEstadoDaPlanta = (plantId) => {
  console.log(`Atualizando o estado da planta ${plantId}: diminuindo saúde!`);
};

// Registra plantas no sistema
timeComponent.registrarPlanta('planta1');
timeComponent.registrarPlanta('planta2');

// Simula um loop para verificar e atualizar o estado das plantas
setInterval(() => {
  ['planta1', 'planta2'].forEach((plantId) => {
    timeComponent.atualizarPlanta(plantId, atualizarEstadoDaPlanta);
  });
}, 60 * 60 * 1000); // Verifica a cada hora
*/