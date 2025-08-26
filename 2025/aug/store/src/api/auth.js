import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Configure axios defaults
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const authAPI = {
  register: (email, password) => 
    api.post('/auth/register', { email, password }),
  
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  logout: () => 
    api.post('/auth/logout'),
  
  getCurrentUser: () => 
    api.get('/auth/me'),
};