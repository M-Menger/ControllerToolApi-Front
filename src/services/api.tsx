import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // substitua pela URL base da sua API
  timeout: 10000,
});

export default api;