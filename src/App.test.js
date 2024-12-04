const app = require('./app');

describe('Teste CI', () => {
    it('Verifica se modulo foi importado corretamente', () => {
        expect(app).toBeDefined();
    });

    it('Sempre deve passar nesse teste', () => {
        expect(1 + 1).toBe(2);
    });
});
