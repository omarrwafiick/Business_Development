import api from './api';
const domain = "/admin";

export const addAdmin = async (newAdmin) => api.post(domain+'', newAdmin);

export const addConsultant = async (newConsultant) => api.post(domain+'add-consultant-by-admin', newConsultant);

export const getUsers = async () => api.get(domain+'/users');

export const getUserById = async (id) => api.get(domain+`/user/${id}`);

export const deleteUser = async (id) => api.delete(domain+`/user/${id}`);