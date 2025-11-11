import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { accessToken, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) return <div>Checking authentication...</div>;

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}