import api from './api';

export const login = (credentials) => api.post('/auth/login', credentials);

export const register = (userData) => api.post('/auth/register', userData);

export const forgetPassword = () =>  api.post('/auth/forget-password/'+token);

export const resetPassword = () =>  api.post('/auth/reset-password/', password);

export const logout = () =>  api.post('/auth/logout');

export const checkAuth = () =>  api.post('/auth/check-auth');