import api from './api';
const domain = "/consultant";

export const getAllConsultants = async () => api.get(domain+'');

export const getConsultantById = async (id) => api.get(domain+`/${id}`);

export const updateConsultantById = async (id, consultant) => api.put(domain+`/${id}`, consultant);

export const deleteConsultantById = async (id) => api.get(domain+`/${id}`);

export const getQualifications = async () => api.get(domain+'/qualifications');
