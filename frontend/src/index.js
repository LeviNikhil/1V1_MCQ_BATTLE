import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './style.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);