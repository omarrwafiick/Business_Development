import api from './api';
const domain = "/business";

export const addBusiness = async (newBusiness) => api.post(domain, newBusiness);

export const getAllBusiness = async () => api.get(domain+'');

export const getBusinessById = async (id) => api.get(domain+`/${id}`);

export const getAllCategories = async () => api.get(domain+'/categories');