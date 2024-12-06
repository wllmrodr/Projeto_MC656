import '@testing-library/jest-dom'; // Importa jest-dom para usar toBeInTheDocument
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cadastro from './Cadastro';

// Mockando as funções do Firebase
jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(() => ({})),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: '12345' } })),
    sendEmailVerification: jest.fn(() => Promise.resolve()),
    updateProfile: jest.fn(() => Promise.resolve()),
}));

const renderComponent = () => {
    render(
        <Router>
            <Cadastro />
        </Router>
    );
};

describe('Cadastro Component', () => {
    beforeEach(() => {
        renderComponent();
    });

    const testCases = [
        { password: 'Abc12', expectedError: 'A senha deve ter entre 6 e 10 caracteres.' },
        { password: 'Abc123', expectedError: null },
        { password: 'Abc1234567', expectedError: null },
        { password: 'Abc12345678', expectedError: 'A senha deve ter entre 6 e 10 caracteres.' },
        { password: 'abcdef', expectedError: 'A senha deve conter pelo menos um caractere maiúsculo.' },
        { password: 'Abcdef', expectedError: 'A senha deve conter pelo menos um número.' },
        { password: 'Abcde1', expectedError: null },
        { password: 'abc123', expectedError: 'A senha deve conter pelo menos um caractere maiúsculo.' },
        { password: 'Abc123', expectedError: null },
        { password: '123456', expectedError: 'A senha deve conter pelo menos um caractere maiúsculo.' },
        { password: 'a23456', expectedError: 'A senha deve conter pelo menos um caractere maiúsculo.' },
        { password: 'A23456', expectedError: null },
        { password: 'ABCDEF', expectedError: 'A senha deve conter pelo menos um número.' },
        { password: 'ABCDE1', expectedError: null },
    ];

    testCases.forEach(({ password, expectedError }) => {
        test(`Password: ${password}`, async () => {
            const emailInput = screen.getByLabelText(/Email/i);
            const nameInput = screen.getByLabelText(/Nome/i);
            const passwordInput = screen.getByLabelText(/Senha/i);
            const submitButton = screen.getByRole('button', { name: /Cadastrar/i });

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(nameInput, { target: { value: 'Test User' } });
            fireEvent.change(passwordInput, { target: { value: password } });
            fireEvent.click(submitButton);

            if (expectedError) {
                expect(screen.queryByText(expectedError)).toBeInTheDocument();
            } else {
                await waitFor(() => {
                    expect(screen.queryByText("A senha deve")).not.toBeInTheDocument();
                });
            }
        });
    });
});