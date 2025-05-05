import api from './api';
const domain = "/auth";

export const login = async (credentials) => api.post(domain+'/login', credentials);

export const register = async (userData) => api.post(domain+'/register', userData);

export const forgetPassword = async () =>  api.post(domain+'/forget-password/'+token);

export const resetPassword = async () =>  api.post(domain+'/reset-password/', password);

export const logout = async () =>  api.post(domain+'/logout');

export const checkAuth = async () =>  api.post(domain+'/check-auth');