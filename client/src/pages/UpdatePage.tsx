import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getABlog, updateBlog } from "../api/blog";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EditComponent from "../Components/EditComponent/EditComponent";

const UpdatePage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const _id = user._id;

  const { id } = useParams();

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [genres, setGenres] = useState<string>("Javascript");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await getABlog(id);
          const { content, title, image, genres } = response;
          setTitle(title);
          setContent(content);
          setImage(image);
          setGenres(genres);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu blog:", error);
        }
      }
    }
    fetchData();
  }, [id]);

  const updateBlogMutation = useMutation({
    mutationFn: async ({ title, image, content, genres, user, id }: any) =>
      await updateBlog(title, image, content, genres, user, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Error creating blog:", error);
    },
  });

  const handleSubmit = () => {
    updateBlogMutation.mutate({ title, image, content, genres, user: _id, id });
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

export default UpdatePage;
