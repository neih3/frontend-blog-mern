import axios, { AxiosInstance } from "axios";
import {
  getAccessTokenFromLocal,
  getRefreshTokenFromLocal,
  refreshAccessToken,
} from "./auth";

const instance: AxiosInstance = axios.create();
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const access_token = getAccessTokenFromLocal();

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // console.log("error", error.status);
    const originalRequest = error.config;
    if (error.status == 401) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshTokenFromLocal();
        // console.log(refreshToken);
        const { accessToken } = await refreshAccessToken(refreshToken);
        // console.log(accessToken);
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axios(originalRequest);
      } catch (err) {
        // Xử lý lỗi khi làm mới token
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
