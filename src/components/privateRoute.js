import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

const PrivateRoute = ({ element: Component }) => {
  const { user } = useAuth(); // Accéder au contexte d'authentification

  return user ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;