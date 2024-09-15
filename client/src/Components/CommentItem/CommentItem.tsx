import React, {
  useState,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { getTimeAgo } from "../../utils/utils";
import { updateComment } from "../../api/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CommentInterface from "../../types/comment.type";
import User from "../../types/user.type";

interface Props {
  comment: CommentInterface;
  user: User;
  setComments: Dispatch<SetStateAction<CommentInterface[]>>;
}

interface UpdateCommentParams {
  id: number | string; // tùy thuộc vào kiểu id của bạn
  content: string;
}

const CommentItem = ({ comment, user, setComments }: Props) => {
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

    onSuccess: (data) => {
      // Cập nhật lại comments, chỉ thay đổi content của comment đã update
      // setComments((prevComments: CommentInterface[]) =>
      //   prevComments.map((comment: CommentInterface) =>
      //     comment._id === data.comment._id
      //       ? { ...comment, content: data.comment.content } // Chỉ cập nhật content
      //       : comment
      //   )
      // );
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });
  const handleComment = (id: string, content: string) => {
    console.log(id, content);
    updateCommentMutation.mutate({ id, content });
    setIsEditting(false); // Đặt lại trạng thái sau khi cập nhật bình luận
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
      )}
    </div>
  );
};

export default CommentItem;
