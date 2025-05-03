import React from 'react'
import  AppStore  from '../store/store';
import { Navigate } from 'react-router-dom';

const ConsultantRoute = ({ children }) => {
  const isAuthenticated = AppStore((state) => state.isAuthenticated);
  const role = useStore((state) => state.role);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if(role.toLowerCase()!=="consultant"){
    return <Navigate to="/" />;
  }

  return children;
};

export default ConsultantRoute;