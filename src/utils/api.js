import axios from 'axios';

// Créer une instance d'Axios
const api = axios.create({
  baseURL: 'https://back-pharmacie.onrender.com',
});

// Interceptor pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;