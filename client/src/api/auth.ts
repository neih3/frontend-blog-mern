import axios from "axios";
import instance from "./interceptor";
import User from "../types/user.type";

// Khai báo baseURL dùng chung cho toàn bộ API
const baseURL = "http://localhost:3000";

// Hàm đăng nhập
const login = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  try {
    const res = await axios.post(`${baseURL}/login`, { email, password });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Gửi link qua email
const sendLinkEmail = async (email: string): Promise<any> => {
  try {
    const res = await axios.post(`${baseURL}/password-reset`, { email });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Đặt lại mật khẩu
const resetPassword = async (token: string, password: string) => {
  try {
    const res = await axios.post(`${baseURL}/password-reset/${token}`, {
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Đăng ký người dùng mới
const register = async (
  email: string,
  password: string,
  name: string
): Promise<User | undefined> => {
  try {
    const res = await axios.post(`${baseURL}/signup`, {
      email,
      password,
      name,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Lấy thông tin người dùng hiện tại
const getUser = async (): Promise<User | undefined> => {
  try {
    const res = await instance.get(`${baseURL}/getUser`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Lấy access token từ localStorage
const getAccessTokenFromLocal = (): string =>
  localStorage.getItem("access_token") || "";

// Lấy refresh token từ localStorage
const getRefreshTokenFromLocal = (): string =>
  localStorage.getItem("refresh_token") || "";

// Lấy thông tin người dùng từ localStorage
const getUserFromLocal = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Refresh lại access token
const refreshAccessToken = async (refresh_token: string) => {
  try {
    const res = await axios.post(`${baseURL}/refresh-token`, { refresh_token });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (user: string) => {
  try {
    const res = await instance.put(`${baseURL}/update-user`, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Lưu blog vào bookmark
const bookmark = async (blogId: string | undefined) => {
  try {
    const res = await instance.put(`${baseURL}/saveBlog`, { _id: blogId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Like blog
const likeBlog = async (blogId: string) => {
  try {
    const res = await instance.put(`${baseURL}/likeBlog`, { _id: blogId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Xóa toàn bộ dữ liệu trong localStorage
const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

// Lấy danh sách tất cả người dùng
const getAllUsers = async () => {
  try {
    const res = await instance.get(`${baseURL}/admin/getAllUsers`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Xóa người dùng theo ID
const deleteUser = async (id: string) => {
  try {
    const res = await instance.delete(`${baseURL}/admin/deleteUser/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
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
  sendLinkEmail,
  resetPassword,
  getAllUsers,
  deleteUser,
};
