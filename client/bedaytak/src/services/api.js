import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/bedaytak', 
  headers: {
    'Content-Type': 'application/json',
  },
}); 
axios.defaults.withCredentials = true;  

export default api;