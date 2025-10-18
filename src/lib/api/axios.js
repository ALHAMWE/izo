import axios from 'axios';
import { getCookie } from 'cookies-next';

const URL = getCookie('apiUrl')
const token = getCookie('token')
const database = getCookie('DatabaseConnection')

const apiClient = axios.create({
    baseURL: URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        database: database
    },
});

apiClient.interceptors.request.use(
    (config) => {

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Redirect to login or refresh token
            // if (typeof window !== 'undefined') {
            //     localStorage.removeItem('authToken');
            //     window.location.href = '/login';
            // }
        }

        return Promise.reject(error);
    }
);

export default apiClient;