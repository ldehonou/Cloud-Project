import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Changez cette URL en fonction de l'adresse de votre API
});

export default api;
