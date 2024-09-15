import BlogPost from "./blog.type";

interface User {
  _id: string | null;
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  refreshToken?: string | null;
  avatar?: string | null;
  bio?: string | null;
  blogs?: BlogPost[];
  blogsSaved?: (string | null)[];
  likes?: BlogPost[] | null;
  __v?: number | null;
}

export default User;
