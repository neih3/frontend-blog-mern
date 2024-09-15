import React, { memo } from "react";
import CommentItem from "../CommentItem/CommentItem"; // Import the CommentItem component
import Comment from "../../types/comment.type";
import CommentInterface from "../../types/comment.type";
import User from "../../types/user.type";

interface Props {
  comments: CommentInterface[];
  user: User;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const Comments = ({ comments, user, setComments }: Props) => {
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
        <CommentItem
          key={index}
          setComments={setComments}
          comment={item}
          user={user}
        />
      ))}
    </div>
  );
};

export default memo(Comments);
