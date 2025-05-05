import api from './api';
const domain = "/consultant";

export const getAllConsultants = async () => api.get(domain+'/getall');

export const getConsultantById = async (id) => api.get(domain+`/getall/${id}`);

export const updateConsultantById = async (id, consultant) => api.put(domain+`/update/${id}`, consultant);

export const deleteConsultantById = async (id) => api.get(domain+`/delete/${id}`);

export const getQualifications = async () => api.get(domain+'/get/qualifications');
