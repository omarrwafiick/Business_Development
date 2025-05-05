import api from './api';  

export const getAccessToken = async () => api.post('https://sandbox.paypal.com/v1/oauth2/token', {
    username : 'AXjFhbNzgjB3HtINW2-Bb6t5DBHb4EfWsE4v2Hy3WGxKoIbt-KYHsd-9AwC1RSevKWbUBSc2LLKabxNp',
    password : 'EJfFC-ODcI6ITqB0pDCXIuYkQTvx1J49kIuFswECGf5OTunADXUkO3R8mH3MXsdP-Y-paETHsvqOmPfL'
});