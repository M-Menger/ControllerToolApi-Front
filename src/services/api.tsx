import axios from 'axios';

const api = axios.create({
  baseURL: 'https://controllertoolapi.onrender.com', // substitua pela URL base da sua API
  timeout: 10000,
});

export default api;