import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.64.2:3000', // Ensure this matches your server URL
    timeout: 5000, // Optional: Set a timeout for requests
});

// Add error handling interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Axios Error:', error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
