import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './/components/context/AuthContext'; // Importa o provedor de autenticação
import App from './App';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);