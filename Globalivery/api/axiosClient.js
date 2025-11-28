import axios from 'axios';

// Update this base URL to point at your Flask backend when deploying
export const API_BASE_URL = 'http://127.0.0.1:5000';

const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export function setAuthToken(token) {
  if (token) {
    axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosApi.defaults.headers.common['Authorization'];
  }
}

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default axiosApi;
