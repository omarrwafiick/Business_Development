import api from './api';
const domain = "/user";

export const contact = async (id, data) => api.post(domain+`/contact/${id}`, data);