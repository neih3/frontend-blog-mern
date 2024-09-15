import CommentInterface from "./comment.type";
import User from "./user.type";

interface BlogPost {
  _id: string | null; // The unique ID of the blog post, can be null
  comments: CommentInterface[] | null; // Array of comment IDs or comment objects, can be null
  content: string | null; // HTML or text content of the blog post, can be null
  createdAt: string | null;
  updatedAt: string | null; // ISO string date of the last update, can be null
  genres: string | null; // Genre or category of the blog post, can be null
  image: string | null; // URL of the image for the blog post, can be null
  title: string | null; // Title of the blog post, can be null
  user: User | null; // The entire user object can be null
  userLikesBlogs: User[] | null; // Array of blog IDs that the user likes, can be null
  userSavedBlogs: User[] | null; // Array of blog IDs that the user saved, can be null
  __v: number | null; // Version key, can be null
}

export default BlogPost;
