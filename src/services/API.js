import axios from "axios";
import { Platform } from "react-native";

const DEFAULT_URL = 'http://localhost:8080/api'

axios.defaults.withCredentials = true;
let API = axios.create({
    baseURL: DEFAULT_URL,
    timeout: 100000,
});

API.interceptors.request.use(
    async (config) => {
        config.headers = {
            Accept: "application/json",
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);


API.interceptors.response.use(
    (response) => response,
    async error => {
        console.log(Platform.OS, error);
        // if (error.response.status === 498 && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     return API(originalRequest)
        // }
        return Promise.reject(error);
    }
)



export default API;
