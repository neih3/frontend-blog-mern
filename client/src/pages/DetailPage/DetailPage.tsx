import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { getABlog } from "../../api/blog";
import { bookmark, likeBlog } from "../../api/auth";
import Header from "../../Components/Header/Header";
import { RootState } from "../../store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PostComment from "./PostComment";
import { formatDate } from "../../utils/utils";
import Comments from "./Comments";

const DetailPage = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const location = useLocation();
  const id = location.state?.blogId;

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => await getABlog(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  console.log(data);

  const likeBlogMutation = useMutation({
    mutationFn: async () => await likeBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
    },
    onError: (error) => {
      console.error("Error liking blog:", error);
    },
  });

  const saveBlogMutation = useMutation({
    mutationFn: async () => await bookmark(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
    },
    onError: (error) => {
      console.error("Error bookmarking blog:", error);
    },
  });

  const handleBookmark = useCallback(() => {
    saveBlogMutation.mutate();
  }, [saveBlogMutation]);

  const handleLike = useCallback(() => {
    likeBlogMutation.mutate();
  }, [likeBlogMutation]);

  // Xử lý trạng thái đang tải và lỗi
  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra khi tải bài viết!</div>;
  }

  return (
    <div>
      <Header />
      <div className="flex justify-center flex-col 2xl:px-80 md:px-40 lg:pt-10 px-2 mt-10 py-4">
        <div className="flex text-white mb-10 items-center justify-between">
          <h3 className="text-4xl text-left font-inter">{data.title}</h3>
          <div className="flex gap-2 items-center">
            <div className="cursor-pointer" onClick={handleLike}>
              <div className="group flex relative">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      data.userLikesBlogs?.includes(user._id) || false
                        ? "white"
                        : "none"
                    }
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  <span>{data.userLikesBlogs?.length || 0}</span>
                </div>
                <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-[12px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto">
                  Like
                </span>
              </div>
            </div>
            <div className="cursor-pointer" onClick={handleBookmark}>
              <div className="group flex relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={
                    data.userSavedBlogs?.includes(user._id) || false
                      ? "white"
                      : "none"
                  }
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
                <span>{data.userSavedBlogs?.length || 0}</span>
                <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-[12px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto">
                  Bookmark
                </span>
              </div>
            </div>
            <Link to={`/updateBlog/${id}`}>
              {" "}
              <div className="cursor-pointer">
                {" "}
                <div className="group flex relative">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-[12px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto">
                    {" "}
                    Edit{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </Link>
          </div>
        </div>
        <div className="flex justify-between mb-8">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src={
                user.avatar ||
                "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              alt=""
            />{" "}
            <span className="text-[#fffffff2] font-spe text-xl">
              {" "}
              {data.user?.name}{" "}
            </span>{" "}
          </div>{" "}
          <span className="text-[#fffffff2] font-spe">
            {formatDate(data.createdAt)}
          </span>{" "}
        </div>{" "}
        <MarkdownEditor.Markdown
          className="font-spe"
          style={{ padding: "40px" }}
          source={data.content || undefined}
        />
        <PostComment user={user._id} blog={id} />
        <Comments comments={data.comments} user={user} />
      </div>
    </div>
  );
};

export default DetailPage;
