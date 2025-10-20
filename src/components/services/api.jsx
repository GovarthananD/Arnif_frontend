import axios from 'axios';

const API = axios.create({
    URL: "http://localhost:6000",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;