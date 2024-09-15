import { Button } from "@headlessui/react";
import React, { useState, useMemo } from "react";
import ListCard from "../Components/ListCard/ListCard";
import { useQuery } from "@tanstack/react-query";
import { getAllBlog } from "../api/blog";
import Modal from "../Components/Modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [open, setOpen] = useState<any>(false);

  const user = useSelector((state: RootState) => state.user.user);

  console.log("profile render");

  // Fetching all blogs
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlog(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Memoize user info to avoid unnecessary re-renders
  const userInfo = useMemo(
    () => ({
      name: user.name || "No Name",
      email: user.email || "No Email",
      avatar:
        user.avatar ||
        "https://psc2.cf2.poecdn.net/assets/_next/static/media/assistant.b077c338.svg",
      bio: user.bio || "",
    }),
    [user]
  );

  // Memoize blogs filtered or processed for better performance if data changes
  const blogs = useMemo(() => {
    if (!data) return [];
    return data; // You could add filtering logic here, like filtering only user blogs
  }, [data]);

  return (
    <>
      <div className="h-screen lg:flex ">
        {/* sidebar */}
        <div
          className="text-[#ffffff] bg-[#1C1C1C] font-inter text-2xl flex flex-col lg:w-3/12  lg:items-center px-4 py-10 gap-3 lg:h-full"
          style={{ borderRight: "1px solid rgba(255, 255, 255, 0.2)" }}
        >
          <img
            className="w-10 h-10 rounded-full"
            src={userInfo.avatar}
            alt="Rounded avatar"
          />

          <p>{userInfo.name}</p>
          <p className="text-xl" style={{ color: "#ffffffb3" }}>
            {userInfo.email}
          </p>

          <p className="text-xs" style={{ color: "#ffffffb3" }}>
            {userInfo.bio}
          </p>

          <Button
            className="bg-slate-100 text-slate-900 font-arial text-xl px-2 py-1 rounded mt-4"
            onClick={() => setOpen(!open)}
          >
            <span>Edit info</span>
          </Button>
          <Modal user={user} open={open} setOpen={setOpen}></Modal>
        </div>
        {/* main */}
        <div className="w-full">
          {/* navbar */}
          <nav className="text-gray-50 bg-[#1C1C1C] flex justify-between  p-5 mb-8">
            <h3>My Blogs</h3>
            <Button className="bg-white text-black px-2 rounded py-1 flex items-center gap-1">
              <Link to="/editBlog">New Blog</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </nav>
          {/* Use memoized blog data */}
          <ListCard data={blogs}></ListCard>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
