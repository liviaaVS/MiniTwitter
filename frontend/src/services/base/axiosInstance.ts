import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/v1/";

// Função para obter tokens
export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

// Criando a instância do Axios
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${getAccessToken()}`
    }
});

// Interceptor para renovar o token
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Ignora rotas de autenticação para evitar loop
        const ignoredUrls = [
            `${baseURL}auth/token/`,
            `${baseURL}auth/token/refresh/`
        ];

        if (ignoredUrls.some(url => originalRequest.url?.startsWith(url))) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(`${baseURL}auth/token/refresh/`, {
                    refresh: getRefreshToken()
                });

                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);

                axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                

                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Erro ao renovar o token:", err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
