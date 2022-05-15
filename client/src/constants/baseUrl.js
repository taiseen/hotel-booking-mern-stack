import axios from 'axios';

// Backend Server URL Address
export default axios.create({
    baseURL: 'http://localhost:5000/api',
});

// export const baseUrl = 'http://localhost:5000/api';