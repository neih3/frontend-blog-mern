import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllUsers } from "../api/auth";
import { getAllBlog } from "../api/blog";

import TableComponent from "../Components/TableComponent/TableComponent";

const SidebarItem = ({ icon, text }: any) => (
  <li className="flex items-center cursor-pointer text-white">
    {icon}
    <span className="ml-2">{text}</span>
  </li>
);

const Sidebar = () => {
  const userIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
  const blogIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
  const commentIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  );
  return (
    <div className="w-1/4 p-6 bg-slate-900 h-full ">
      <h3 className="mb-10 font-jet text-xl text-white">Dashboard</h3>
      <ul className="flex flex-col gap-3 font-spe gap-4">
        <SidebarItem icon={userIcon} text="List Users" />
        <SidebarItem icon={blogIcon} text="List Blogs" />
        <SidebarItem icon={commentIcon} text="List Comments" />
      </ul>
    </div>
  );
};

const SearchBar = () => (
  <div className=" w-full">
    <input
      className="shadow w-full appearance-none  rounded  py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="username"
      type="text"
      placeholder="Search"
    />
  </div>
);

const MainBar = ({ data }: any) => {
  return (
    <div className="flex flex-col w-full">
      <SearchBar />
      <div className="pl-5">
        <h3 className="uppercase mt-10 text-sky-600 text-2xl">Dashboard</h3>
      </div>
      <TableComponent data={data} />
    </div>
  );
};

const Dashboard = () => {
  const [select, setSelect] = useState<string>("User");

  const { data } = useQuery({
    queryKey: ["users", select], // 'select' là phần phụ thuộc để queryKey thay đổi mỗi khi select thay đổi
    queryFn: () => {
      if (select == "User") {
        return getAllUsers();
      } else if (select == "Blog") {
        return getAllBlog();
      }
    },
    staleTime: 5 * 60 * 1000, // 5 phút
  });

  return (
    <div className="flex bg-white h-[100vh]">
      <Sidebar />
      <MainBar data={data} />
    </div>
  );
};

export default Dashboard;
