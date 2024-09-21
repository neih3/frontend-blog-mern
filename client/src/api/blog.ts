import axios from "axios";
import instance from "./interceptor";

import BlogPost from "../types/blog.type";

const urlblog = "http://localhost:3000/v1/blog";

const createBlog = async (
  title: string,
  image: string,
  content: string,
  genres: string,
  user: string
): Promise<BlogPost | undefined> => {
  try {
    const res = await axios.post(urlblog, {
      title: title,
      image: image,
      content: content,
      genres: genres,
      user: user,
    });
    console.log(title, image, content, genres, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const updateBlog = async (
  title: string,
  image: string,
  content: string,
  genres: string,
  user: string,
  id: string
): Promise<BlogPost | undefined> => {
  try {
    const res = await instance.put(`${urlblog}/${id}`, {
      title: title,
      image: image,
      content: content,
      genres: genres,
      user: user,
    });
    console.log(title, image, content, genres, user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllBlog = async () => {
  try {
    const res = await axios.get(urlblog);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getABlog = async (id: string) => {
  try {
    console.log("id get blog nhận được", id);
    const res = await axios.get(`${urlblog}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const urlGetBlogByGenre = "http://localhost:3000/v1/blog/genres?genre=";
const getBlogbyGenre = async (genre: string) => {
  try {
    const res = await axios.get(`${urlGetBlogByGenre}${genre}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const cloudinaryUpload = async (file: FormData) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/v1/blog/upload-image",
      file
    );
    console.log(file);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  createBlog,
  getAllBlog,
  getABlog,
  getBlogbyGenre,
  cloudinaryUpload,
  updateBlog,
};
