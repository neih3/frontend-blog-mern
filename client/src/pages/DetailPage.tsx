import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { getABlog } from "../api/blog";
import { bookmark, likeBlog } from "../api/auth";
import Header from "../Components/Header/Header";
import { RootState } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DetailPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [blog, setBlog] = useState<any>(null);
  const [isBookMark, setIsBookMark] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [bookmarkCount, setBookMarkCount] = useState<number>(0);
  console.log(bookmarkCount);
  const { id } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await getABlog(id);
          setBlog(response);
          setIsBookMark(response.userSavedBlogs?.includes(user._id) || false);
          setIsLiked(response.userLikesBlogs?.includes(user._id) || false);
          setLikeCount(response.userLikesBlogs?.length || 0);
          setBookMarkCount(response.userSavedBlogs?.length || 0);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu blog:", error);
        }
      }
    }
    fetchData();
  }, [id, user._id]);

  const likeBlogMutation = useMutation({
    mutationFn: async ({ id }: any) => await likeBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Error liking blog:", error);
    },
  });

  const saveBlogMutation = useMutation({
    mutationFn: async ({ id }: any) => await bookmark(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Error bookmarked blog:", error);
    },
  });

  const handleBookmark = useCallback(async () => {
    if (id) {
      try {
        await bookmark(id);
        setIsBookMark((prevState) => !prevState);
        setBookMarkCount((prevCount) =>
          isBookMark ? prevCount - 1 : prevCount + 1
        );
        saveBlogMutation.mutate(id);
      } catch (error) {
        console.error("Lỗi khi đánh dấu:", error);
      }
    }
  }, [id, saveBlogMutation, isBookMark]);

  const handleLike = useCallback(async () => {
    if (id) {
      try {
        await likeBlog(id);
        setIsLiked((prevState) => !prevState);
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
        likeBlogMutation.mutate(id);
      } catch (error) {
        console.error("Lỗi khi thích:", error);
      }
    }
  }, [id, likeBlogMutation, isLiked]);

  if (!blog) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <Header />
      <div className="flex justify-center flex-col px-80 pt-10">
        <div className="flex text-white mb-10 items-center justify-between">
          {" "}
          <h3 className="text-4xl text-left font-inter">{blog.title}</h3>{" "}
          <div className="flex gap-2 items-center">
            <div className="cursor-pointer" onClick={handleLike}>
              {" "}
              <div className="group flex relative">
                {" "}
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isLiked ? "white" : "none"}
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
                  <span>{likeCount}</span>
                </div>
                <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-[12px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto">
                  {" "}
                  Like
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="cursor-pointer" onClick={handleBookmark}>
              {" "}
              <div className="group flex relative">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isBookMark ? "white" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />{" "}
                </svg>{" "}
                <span>{bookmarkCount}</span>
                <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-2 text-[12px] text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mx-auto">
                  {" "}
                  Bookmark{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
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
        </div>{" "}
        <div className="flex justify-between mb-8">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />{" "}
            <span className="text-[#fffffff2] font-spe text-xl">
              {" "}
              {blog.user?.name}{" "}
            </span>{" "}
          </div>{" "}
          <span className="text-[#fffffff2] font-spe">Nov 30, 2023</span>{" "}
        </div>{" "}
        <MarkdownEditor.Markdown
          className="font-spe"
          style={{ padding: "40px" }}
          source={blog.content}
        />
      </div>
    </div>
  );
};

export default DetailPage;
