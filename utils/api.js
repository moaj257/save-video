import axios from 'axios';
const apiUrl = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: `${apiUrl}`,
    timeout: 30000,
    headers: {'X-Custom-Header': 'Ytdl'}
});

export default api;

// https://www.youtube.com/watch?v=HagVnWAeGcM - not playing