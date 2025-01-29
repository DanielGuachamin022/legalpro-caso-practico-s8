/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/LoginForm';
import AdminDashboard from './components/AbogadoDashboard';
import UserDashboard from './components/ClienteDashboard';
import CalendarioPlazos from './components/CalendarioPlazos';
import AsignarCasoUsuario from './components/AsignarCasoUsuario';

const ProtectedRoute = ({ children, requiredProfile }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // Redirige si no está autenticado
  if (user.profile !== requiredProfile) return <Navigate to="/" />; // Redirige si el perfil no es el requerido

  return children; // Renderiza el componente protegido
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/abogado"
            element={
              <ProtectedRoute requiredProfile="Abogado">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client"
            element={
              <ProtectedRoute requiredProfile="Cliente">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute requiredProfile="Abogado">
                <CalendarioPlazos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/asignar"
            element={
              <ProtectedRoute requiredProfile="Abogado">
                <AsignarCasoUsuario />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
