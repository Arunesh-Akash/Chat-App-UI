import axios from "axios";

const axiosInstance=axios.create({
    baseURL:'https://chat-app-backend-k30p.onrender.com'
})


axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export default axiosInstance;