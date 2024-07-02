import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    console.log('Initial Auth Token in AuthContext:', authToken);
  }, []);

  const setToken = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);  // Ensure token is not null or undefined here
    console.log('Token set in AuthContext:', token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    console.log('Token removed in AuthContext');
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
