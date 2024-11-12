import instance from "./interceptor";

const urlComment = "https://backend-blog-mern-ctco.onrender.com/v1/comment";

const createComment = async (
  user: string,
  content: string,
  blog: string
): Promise<unknown> => {
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

const updateComment = async (
  id: unknown,
  content: string
): Promise<unknown> => {
  try {
    const res = await instance.put(`${urlComment}/${id}`, {
      content: content,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteCommentApi = async (id: unknown): Promise<unknown> => {
  try {
    console.log(id);
    const res = await instance.delete(`${urlComment}/${id}`);
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

export { createComment, getAllComment, updateComment, deleteCommentApi };
