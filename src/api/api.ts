import axios from "axios";
import useAuthStore from "../store/authStore";

interface IUser {
    email : string,
    password : string
}

const apiClient = axios.create({
    baseURL: "https://master-turov.ru/users/api/v1/auth/",
  });
  
  apiClient.interceptors.request.use(
    (config) => {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; 
        await refreshToken(); 
        const newAccessToken = localStorage.getItem("access"); 
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest); 
      }
      return Promise.reject(error);
    }
  );
  
  export default apiClient;

export const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) throw new Error("Нет refresh токена");
  
      const response = await apiClient.post("/jwt/refresh/", { refresh });
      localStorage.setItem("access", response.data.access);
      useAuthStore.getState().setAuth(response.data.access);
    } catch (error) {
      console.error("Ошибка обновления токена:", error);
      useAuthStore.getState().setAuth(null);
    }
  };
    

export const registerUser = async (user : IUser) => {
    try {
        const response = await apiClient.post("/users/", user);
        return response.data;   
    } catch (error) {
        throw new Error ("Ошибка регистрации пользователя" + error);
    }
}

export const activateUser = async (uid : string, token : string) => {
    try {
        const response = await apiClient.post("/users/activation/", {uid, token});
            return response.data;   
        } catch (error) {
            throw new Error ("Ошибка активации пользователя" + error);
        }
}

export const loginUser = async (user : IUser) => {
    try {
        const response = await apiClient.post("/jwt/create/", user);
            return response.data;   
        } catch (error) {
            throw new Error ("Ошибка авторизации пользователя" + error);
        }
}
