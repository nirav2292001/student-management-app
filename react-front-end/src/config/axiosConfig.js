import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    validateStatus: function (status) {
        return status >= 200 && status < 300; 
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request:', config);
        return config;
    },
    (error) => {
        console.error('Request error:', {
            message: error.message,
            config: error.config,
            response: error.response,
            request: error.request,
            stack: error.stack
        });
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', {
            message: error.message,
            config: error.config,
            response: error.response,
            request: error.request,
            stack: error.stack
        });
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            console.error('Response config:', error.response.config);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
