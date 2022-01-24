import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken')!)}`,
  },
});

export default api;
