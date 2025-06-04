import axios from "axios";
import { USER_AUTH_TOKEN } from "../utils/tokenVariables";

export const BASE_URL = 'https://api-hayala-c4bbacb8319e.herokuapp.com/api/v1/';

// Axios instance
export const Api_Handle = axios.create({
    baseURL: BASE_URL,
});

// Interceptor to set Authorization header if token exists
Api_Handle.interceptors.request.use((config) => {
    const token = localStorage.getItem(USER_AUTH_TOKEN)
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`

    }
    return config
}, (error) => {
    return Promise.reject(error);
})

