import axios from "axios";
import instance from "./interceptor";

const urlComment = "http://localhost:3000/v1/comment";

const createComment = async (
  user: string,
  content: string,
  blog: string
): Promise<any> => {
  try {
    const res = await instance.post(urlComment, {
      user: user,
      content: content,
      blog: blog,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const updateComment = async (id: unknown, content: string): Promise<any> => {
  try {
    const res = await instance.put(`${urlComment}/${id}`, {
      content: content,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllComment = async (id: string) => {
  try {
    const res = await instance.get(`urlblog${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { createComment, getAllComment, updateComment };
