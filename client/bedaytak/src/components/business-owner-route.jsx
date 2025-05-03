import React from 'react'
import { useStore } from './store';
import { Navigate } from 'react-router-dom';

export default BusinessOwnerRoute = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const role = useStore((state) => state.role);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if(role.toLowerCase()!=="businessowner"){
    return <Navigate to="/" />;
  }

  return children;
};