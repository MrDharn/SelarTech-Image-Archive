import axios from 'axios'
const API = axios.create({
    baseURL: "http://10.207.191.71:3000/api/v1"
})



API.interceptors.request.use((req)=> {
    const token = localStorage.getItem('token')
    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req
})

export default API