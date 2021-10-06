import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});

export default api;
