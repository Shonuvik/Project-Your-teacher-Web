import axios from 'axios';

//api à ser consumida
const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default api;