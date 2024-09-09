import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blog";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EditComponent from "../Components/EditComponent/EditComponent";

const EditPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const _id = user._id;

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [genres, setGenres] = useState<string>("Javascript");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addBlogMutation = useMutation({
    mutationFn: async ({ title, image, content, genres, user }: any) =>
      await createBlog(title, image, content, genres, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Error creating blog:", error);
    },
  });

  const handleSubmit = () => {
    addBlogMutation.mutate({ title, image, content, genres, user: _id });
  };

  return (
    <EditComponent
      setTitle={setTitle}
      setImage={setImage}
      setContent={setContent}
      setGenres={setGenres}
      handleSubmit={handleSubmit}
      title={title}
      image={image}
      content={content}
      genres={genres}
    />
  );
};

export default EditPage;
