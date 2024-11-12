import axios from "axios";
import instance from "./interceptor";
import BlogPost from "../types/blog.type";

// Khai báo URL chung cho toàn bộ API blog
const baseURL = "https://backend-blog-mern-ctco.onrender.com/v1/blog";

// Tạo blog mới
const createBlog = async (
  title: string,
  image: string,
  content: string,
  genres: string,
  user: string
): Promise<BlogPost | undefined> => {
  try {
    const res = await axios.post(baseURL, {
      title,
      image,
      content,
      genres,
      user,
    });
    console.log("Blog created:", title, image, content, genres, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Cập nhật blog
const updateBlog = async (
  title: string,
  image: string,
  content: string,
  genres: string,
  user: string,
  id: string
): Promise<BlogPost | undefined> => {
  try {
    const res = await instance.put(`${baseURL}/${id}`, {
      title,
      image,
      content,
      genres,
      user,
    });
    console.log("Blog updated:", title, image, content, genres, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Lấy tất cả blogs
const getAllBlog = async () => {
  try {
    const res = await axios.get(baseURL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Lấy một blog theo ID
const getABlog = async (id: string) => {
  try {
    console.log("Getting blog with ID:", id);
    const res = await axios.get(`${baseURL}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Lấy blog theo thể loại
const getBlogbyGenre = async (genre: string) => {
  try {
    const res = await axios.get(`${baseURL}/genres`, {
      params: { genre },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Upload hình ảnh lên Cloudinary
const cloudinaryUpload = async (file: FormData) => {
  try {
    const res = await axios.post(`${baseURL}/upload-image`, file);
    console.log("Image uploaded:", file);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Lấy blogs đã được bookmark
const getBlogsBookMark = async () => {
  try {
    const res = await instance.get(`${baseURL}/bookmark`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Xóa blog theo ID
const deleteBlog = async (id: string) => {
  try {
    const res = await instance.delete(`${baseURL}/${id}`);
    console.log("Blog deleted:", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  deleteBlog,
  createBlog,
  getAllBlog,
  getABlog,
  getBlogbyGenre,
  cloudinaryUpload,
  updateBlog,
  getBlogsBookMark,
};
