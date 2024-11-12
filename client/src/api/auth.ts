import axios from "axios";
import instance from "./interceptor";
import User from "../types/user.type";

// Khai báo baseURL dùng chung cho toàn bộ API
const baseURL = "https://backend-blog-mern-ctco.onrender.com";

// Hàm đăng nhập
const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${baseURL}/login`, { email, password });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Gửi link qua email
const sendLinkEmail = async (email: string) => {
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
const register = async (email: string, password: string, name: string) => {
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

const updateUser = async (user: User) => {
  try {
    const res = await instance.put(`${baseURL}/update-user`, user);

    // Kiểm tra mã trạng thái phản hồi
    if (res.status === 200) {
      return res.data; // Trả về dữ liệu nếu cập nhật thành công
    } else {
      throw new Error(`Cập nhật không thành công: ${res.status}`);
    }
  } catch (error) {
    console.error("Lỗi cập nhật người dùng:", error);
    throw error; // Ném lại lỗi để có thể xử lý ở nơi khác
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
