import React, { useMemo } from "react";
import { getTimeAgo } from "../../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import BlogPost from "../../types/blog.type";

interface Props {
  data: BlogPost;
}

export const Card = ({ data }: Props) => {
  const { content, image, title, user, createdAt } = data;

  // Memoize time ago calculation
  const timeAgo = useMemo(() => getTimeAgo(createdAt), [createdAt]);

  // Memoize truncated content
  const truncatedContent = useMemo(
    () => `${content?.slice(0, 50)}...`,
    [content]
  );

  return (
    <>
      {/* <div className="border-gray-200 rounded-lg shadow dark:bg-gray-800 font-inter max-w-sm">
        <div className="w-full h-[200px]">
          <LazyLoadImage
            className="rounded-t-lg w-full p-5"
            src={image || ""}
            alt={title || "Chưa có ảnh"}
          />
        </div>

        <div className="p-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt={user?.name || ""} // Added alt text for accessibility
              />
              <span className="text-[#fffffff2] font-spe text-xs">
                {user?.name}
              </span>
            </div>
            <span className="text-[#fffffff2]">{timeAgo}</span>
          </div>

          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-5">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {truncatedContent}
          </p>
        </div>
      </div> */}
      <div className=" overflow-hidden border-gray-200 rounded-lg shadow dark:bg-gray-800 font-inter ">
        <div className="max-w-max max-h-max mx-auto">
          <LazyLoadImage
            className="rounded-t-lg w-full h-auto "
            src={image || ""}
            alt={title || "Chưa có ảnh"}
          />
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LazyLoadImage
                className="inline-block h-6 w-6 rounded-full ring-2  ring-white"
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt={user?.name || ""} // Added alt text for accessibility>
              />
              <span className="text-[#fffffff2] font-spe text-xs">
                {user?.name}
              </span>
            </div>
            <span className="text-[#fffffff2] text-xs">{timeAgo}</span>
          </div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-5">
            {title}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {truncatedContent}
          </p>
        </div>
      </div>
    </>
  );
};
