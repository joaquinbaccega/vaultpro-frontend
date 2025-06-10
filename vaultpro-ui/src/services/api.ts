import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:44367/api', // ⚠️ Asegurate que el backend corra en este puerto
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
