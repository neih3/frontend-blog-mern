import { memo } from "react";
import Comment from "../../types/comment.type";
import CommentInterface from "../../types/comment.type";
import User from "../../types/user.type";
import CommentItem from "./CommentItem";

interface Props {
  comments: CommentInterface[];
  user: User;
}

const Comments = ({ comments, user }: Props) => {
  // Check if comments exist and is an array
  if (!comments || comments.length === 0) {
    return (
      <p className="text-white font-inter text-sm pt-3">No comments yet.</p>
    );
  }
  console.log(comments);
  return (
    <div>
      {comments.map((item: Comment, index: number) => (
        <CommentItem key={index} comment={item} user={user} />
      ))}
    </div>
  );
};

export default memo(Comments);
