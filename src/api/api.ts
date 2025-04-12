import axios from "axios";
import useAuthStore from "../store/authStore";

interface IUser {
    email : string,
    password : string
}

interface ResetPasswordPayload {
  uid: string;
  token: string;
  new_password: string;
}
export interface IAppeal {
  name : string,
  phone : string,
  r_dat : string,
  source : string,
  data_from : string,
  tourist_count : number,
  name_client : string
  transport_type : string,
  city_departure : string,
  arrival_city : string,
  comments : string,
}

export interface IFeedback {
  name : string,
  email : string,
  message : string,
  name_client : string
}

interface IUserInfo {
  first_name: string,
  last_name: string,
  phone_number: string,
  gender: string,
  passport_number: string,
  date_of_birth: string,
  citizenship: string,
  international_passport_number: string
}

const userApi = axios.create({
    baseURL : "https://master-turov.ru:8443/users/api/v1"
});

const apiClient = axios.create({
    baseURL: "https://master-turov.ru:8443/users/api/v1/auth",
  });
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setAuthHeader = (config: any) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};
  
apiClient.interceptors.request.use(setAuthHeader, (error) => Promise.reject(error));
userApi.interceptors.request.use(setAuthHeader, (error) => Promise.reject(error));
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleResponseError = async (error: any) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; 
    await refreshToken(); 
    const newAccessToken = localStorage.getItem("access"); 
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return axios(originalRequest); 
  }
  return Promise.reject(error);
};
  
apiClient.interceptors.response.use((response) => response, handleResponseError);
userApi.interceptors.response.use((response) => response, handleResponseError);
  
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

  //Регистрация пользователя
export const registerUser = async (user : IUser) => {
    try {
        const response = await apiClient.post("/users/", user);
        return response.data;   
    } catch (error) {
        throw new Error ("Ошибка регистрации пользователя" + error);
    }
}
// Акивация пользователя
export const activateUser = async (uid : string, token : string) => {
    try {
        const response = await apiClient.post("/users/activation/", {uid, token});
            return response.data;   
        } catch (error) {
            throw new Error ("Ошибка активации пользователя" + error);
        }
}
// Вход пользователя
export const loginUser = async (user : IUser) => {
    try {
        const response = await apiClient.post("/jwt/create/", user);
        const {access } = response.data;

        useAuthStore.getState().setAuth(access);
        return response.data;   
        } catch (error) {
            throw new Error ("Ошибка авторизации пользователя" + error);
        }
}
//Получение данных пользователя
export const getUserInfo = async () => {
  try {
      const response = await userApi.get("/profile");  
      return response.data;   
  } catch (error) {
      throw new Error("Ошибка при получении данных пользователя" + error);
  }
};


export const usersOrders = async () => {
    try {
        const response = await userApi.get("/my-orders/");
        return response.data;
    } catch (error) {
        throw new Error("Ошибка при получении списка заказов" + error);
    }
}

export const putUserInfo = async (userInfo : IUserInfo) => {
  try {
        const response = await userApi.put("/update/", userInfo,{
          headers : {
            "Content-Type" : "application/json"
          }
        });
        return response.data;
    } catch (error) {
      throw new Error("Ошибка при обновлении информации о пользователе" + error);
    }
}

export const feedbackApi = async (feedback : IFeedback) => {
  try {
        const response = await axios.post("https://master-turov.ru:8443/users/api/v1/create-lead-appeal/", feedback,{
          headers : {
            "Content-Type" : "application/json"
          }
        });
        return response.data;
} catch (error) {
  throw new Error("Ошибка при отправке отзыва" + error);
}
}
// Отправка обращений авиа и жд транспорта
export const userAppealTransport = async (userAppeal : IAppeal) => {
  try {
    const response = await axios.post("https://master-turov.ru:8443/users/api/v1/create-lead/", userAppeal,{
      headers : {
        "Content-Type" : "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Ошибка при отправке обращения" + error);
  }
}

export const resetPassword = async ({ uid, token, new_password }: ResetPasswordPayload) => {
  try {
    const response = await axios.post("https://master-turov.ru:8443/users/api/v1/auth/users/reset_password_confirm/", {
      uid,
      token,
      new_password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Ошибка при сбросе пароля: " + error);
  }
};

export const sendPasswordResetEmail = async ( email : string) => {
  try {
    const response = await axios.post('https://master-turov.ru:8443/users/api/v1/auth/users/reset_password/', { email }, {
       headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса на сброс пароля: " + error);
  }
}