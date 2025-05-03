import React from 'react'
import { useStore } from './store';
import { Navigate } from 'react-router-dom';

export default ProtectedRoute = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};