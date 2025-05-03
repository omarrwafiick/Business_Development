import api from './api';
const domain = "/business";

export const addBusiness = async (newBusiness) => api.post(domain+'/add', newBusiness);

export const getAllBusiness = async () => api.get(domain+'/getall');

export const getBusinessById = async (id) => api.get(domain+`/get/${id}`);

export const getAllCategories = async () => api.get(domain+'/categories/getall');