import { useState, useRef, useEffect } from "react";
import { getTimeAgo } from "../../utils/utils";
import { deleteCommentApi, updateComment } from "../../api/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommentInterface from "../../types/comment.type";
import User from "../../types/user.type";

interface Props {
  comment: CommentInterface;
  user: User;
}

interface UpdateCommentParams {
  id: number | string; // tùy thuộc vào kiểu id của bạn
  content: string;
}

const CommentItem = ({ comment, user }: Props) => {
  console.log("user id");
  const [isEditting, setIsEditting] = useState(false);
  const [content, setContent] = useState<string>("");
  const queryClient = useQueryClient();
  // Sửa: Thêm kiểu cho useRef
  const inputElement = useRef<HTMLInputElement | null>(null);

  // Sử dụng useEffect để focus sau khi DOM đã được cập nhật
  useEffect(() => {
    if (isEditting && inputElement.current) {
      inputElement.current.focus(); // Focus vào input khi đang ở chế độ chỉnh sửa
    }
  }, [isEditting]); // Theo dõi sự thay đổi của isEditting

  const updateCommentMutation = useMutation({
    mutationFn: async ({ id, content }: UpdateCommentParams) =>
      await updateComment(id, content),

    onSuccess: () => {
      // Cập nhật lại comments, chỉ thay đổi content của comment đã update

      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await deleteCommentApi(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
    onError: (error) => {
      console.error("Error deleting comment", error);
    },
  });
  const handleComment = (id: string, content: string) => {
    console.log(id, content);
    updateCommentMutation.mutate({ id, content });
    setIsEditting(false); // Đặt lại trạng thái sau khi cập nhật bình luận
  };
  const deleteComment = (id: string) => {
    console.log("ok");
    deleteCommentMutation.mutate({ id });
  };

  return (
    <div className="flex gap-4 mb-4">
      <img
        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
        src={
          comment.user?.avatar ||
          "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
        alt="Profile"
      />
      <div className="w-full">
        <div className="text-gray-50 flex justify-between">
          <div className="flex gap-3 items-center">
            <span className="font-spe">{comment.user?.name || "No Name"}</span>
            <p className="text-gray-400 text-xs">
              {getTimeAgo(comment.createdAt)}
            </p>
          </div>
          {/* Add any icons or interaction buttons */}
        </div>
        {!isEditting ? (
          <p className="text-white font-inter text-sm pt-3">
            {comment.content}
          </p>
        ) : (
          <input
            ref={inputElement} // Gán ref cho input
            defaultValue={comment.content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              // Xử lý khi nhấn phím Enter
              if (e.key === "Enter") handleComment(comment._id, content);
            }}
            className="text-sm p-2 rounded bg-gray-800 text-white"
          />
        )}
      </div>
      {user._id == comment?.user?._id && (
        <div className="flex ">
          <div
            onClick={() => {
              setIsEditting((prev) => !prev); // Chuyển đổi chế độ chỉnh sửa
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
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
          </div>
          <div
            onClick={() => {
              deleteComment(comment._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
