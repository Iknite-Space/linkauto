import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, //to allow sessions from PHP

});

export default api;