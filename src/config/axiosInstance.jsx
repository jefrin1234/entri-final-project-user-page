import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);


 const axiosInstance = axios.create({
    baseURL: `${API_URL}/api/v1`,
    withCredentials: true,
});

export default axiosInstance