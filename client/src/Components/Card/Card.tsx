import { useMemo } from "react";
import { getTimeAgo } from "../../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import BlogPost from "../../types/blog.type";

interface Props {
  data: BlogPost;
}

export const Card = ({ data }: Props) => {
  const { content, image, title, user, createdAt } = data;

  // Memoize time ago calculation, ensuring createdAt is a string
  const timeAgo = useMemo(() => {
    if (createdAt) {
      return getTimeAgo(createdAt);
    }
    return "Không rõ thời gian"; // Default message if createdAt is null
  }, [createdAt]);

  // Memoize truncated content
  const truncatedContent = useMemo(
    () => `${content?.slice(0, 50)}...`,
    [content]
  );

  return (
    <div className="h-[500px] overflow-hidden border-gray-200 rounded-lg shadow dark:bg-gray-800 font-inter flex flex-col">
      <div className="h-[250px] overflow-hidden flex items-center justify-center bg-gray-800">
        <LazyLoadImage
          className="w-full h-[250px] object-contain"
          src={image || ""}
          alt={title || "Chưa có ảnh"}
        />
      </div>

      <div className="flex-1 px-6 py-4 flex flex-col justify-evenly">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LazyLoadImage
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
              src={
                user?.avatar ||
                "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              alt={user?.name || ""}
            />
            <span className="text-[#fffffff2] font-spe text-xs">
              {user?.name}
            </span>
          </div>
          <span className="text-[#fffffff2] text-xs">{timeAgo}</span>
        </div>

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-5 line-clamp-2">
          {title}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
          {truncatedContent}
        </p>
      </div>
    </div>
  );
};
