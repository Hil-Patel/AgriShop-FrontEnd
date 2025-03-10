import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Replace with your backend URL

const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  },
});


export default api;
