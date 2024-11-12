/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, memo } from "react";
import { createComment } from "../../api/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  user: string;
  blog: string;
}

const PostComment = ({ user, blog }: Props) => {
  const [comment, setComment] = useState<string>("");
  console.log("Pos comment render");
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: async ({ user, content, blog }: any) => {
      // Giả sử `createComment` là hàm gọi API để tạo bình luận mới
      return await createComment(user, content, blog);
    },
    onSuccess: () => {
      // Invalidate the query for "blogs" to refresh the data

      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },

    onError: (error) => {
      console.error("Error posting comment:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") {
      console.error("Comment cannot be empty");
      return;
    }
    // Thực hiện gửi bình luận bằng mutation
    addCommentMutation.mutate({
      user,
      content: comment,
      blog,
    });
    // Reset comment sau khi gửi thành công
    setComment("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              id="comment"
              rows={4}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              disabled={addCommentMutation.isLoading}
            >
              {addCommentMutation.isLoading ? "Posting..." : "Post comment"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default memo(PostComment);
