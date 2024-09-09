import axios from "axios";
import instance from "./interceptor";
const urlLogin = "http://localhost:3000/login";
const urlSignup = "http://localhost:3000/signup";
const login = async (email: string, password: string): Promise<any> => {
  console.log(email, password);

  try {
    const res = await axios.post(urlLogin, {
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (
  email: string,
  password: string,
  name: string
): Promise<any> => {
  console.log(email, password);

  try {
    const res = await axios.post(urlSignup, {
      email: email,
      password: password,
      name: name,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const urlGetUser = "http://localhost:3000/getUser";

const getUser = async (): Promise<any> => {
  try {
    const res = await instance.get(urlGetUser);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getAccessTokenFromLocal = (): string => {
  const access_token = localStorage.getItem("access_token");
  return access_token || "";
};

const getRefreshTokenFromLocal = (): string => {
  const refresh_token = localStorage.getItem("refresh_token");
  return refresh_token || "";
};

const getUserFromLocal = () => {
  const user = localStorage.getItem("user");
  if (user !== null) {
    return JSON.parse(user);
  }
};

const urlRefreshToken = "http://localhost:3000/refresh-token";

const refreshAccessToken = async (refresh_token: string): Promise<any> => {
  try {
    const res = await axios.post(urlRefreshToken, {
      refresh_token: refresh_token,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (user: any) => {
  console.log(user);
  try {
    const res = await instance.put("http://localhost:3000/update-user", user);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const bookmark = async (blogId: any) => {
  try {
    const res = await instance.put("http://localhost:3000/saveBlog", {
      _id: blogId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const likeBlog = async (blogId: any) => {
  try {
    const res = await instance.put("http://localhost:3000/likeBlog", {
      _id: blogId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

export {
  login,
  register,
  getAccessTokenFromLocal,
  getUserFromLocal,
  clearLocalStorage,
  getUser,
  refreshAccessToken,
  getRefreshTokenFromLocal,
  updateUser,
  bookmark,
  likeBlog,
};
