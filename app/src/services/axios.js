import axios from 'axios';

const api = axios.create({
    // baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    baseURL: 'https://api.linkauto.xyz',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

});

export default api;