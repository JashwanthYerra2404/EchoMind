import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/chat",
    withCredentials: true // send the cookies with the request
})