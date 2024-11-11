import { useState } from "react";
import { Main } from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllBlog } from "../../api/blog";
import { getAllUsers } from "../../api/auth";

const Dashboard = () => {
  const [isSelected, setIsSelected] = useState("Blogs");

  // Query cho Blogs
  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await getAllBlog();
      return response;
    },
    enabled: isSelected === "Blogs",
  });

  // Query cho Users
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getAllUsers();
      return response;
    },
    enabled: isSelected === "Users",
  });

  // Query cho Comments
  const commentsQuery = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const response = await getAllBlog();
      return response;
    },
    enabled: isSelected === "Comments",
  });

  // Lấy data hiện tại dựa vào selection
  let currentData = null;

  switch (isSelected) {
    case "Blogs":
      currentData = blogsQuery.data;

      break;
    case "Users":
      currentData = usersQuery.data;

      break;
    case "Comments":
      currentData = commentsQuery.data;

      break;
  }

  return (
    <div className="font-inter text-white flex">
      <Sidebar isSelected={isSelected} setIsSelected={setIsSelected} />
      <Main isSelected={isSelected} data={currentData} />
    </div>
  );
};

export default Dashboard;
