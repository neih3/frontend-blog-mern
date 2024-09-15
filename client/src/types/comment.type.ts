import BlogPost from "./blog.type";
import User from "./user.type";

interface CommentInterface {
  _id: string;
  blog: BlogPost;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  __v?: number;
}
export default CommentInterface;
