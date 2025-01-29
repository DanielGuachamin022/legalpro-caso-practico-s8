/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario autenticado

  const login = (userData) => {
    setUser(userData); // Guarda los datos del usuario en el contexto
  };

  const logout = () => {
    setUser(null); // Limpia el estado al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
