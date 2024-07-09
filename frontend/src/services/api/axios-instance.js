import axios from "axios";
import AuthCookies from "../cookie/authToken.cookie";

const BASE_URL = "http://localhost:5000/api/";  // Ensure the URL is correct

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthCookies.GetAccessToken();
    // Check if the request URL is not for the register endpoint
    if (token && !config.url.endsWith('/register/')) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;