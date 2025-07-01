import api from './api';
const domain = "/location";

export const getAllLocations= async () => api.get(domain); 