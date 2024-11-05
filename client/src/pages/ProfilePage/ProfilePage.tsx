import { Button } from "@headlessui/react";
import { useState, useMemo, useEffect } from "react";
import ListCard from "../../Components/ListCard/ListCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBlog, getBlogsBookMark } from "../../api/blog";
import Modal from "../../Components/Modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import override from "../../commom/override";

const ProfilePage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelect] = useState("My blog");

  console.log("render");
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user.user);

  // Fetch dữ liệu blog dựa trên giá trị của 'select'
  const { data, isLoading } = useQuery({
    queryKey: ["blogs", select], // 'select' là phần phụ thuộc để queryKey thay đổi mỗi khi select thay đổi
    queryFn: () => (select === "My blog" ? getAllBlog() : getBlogsBookMark()),
    staleTime: 5 * 60 * 1000, // 5 phút
  });

  const getMyBlogsMutation = useMutation({
    mutationFn: async () => await getAllBlog(),
    onSuccess: async (data) => {
      queryClient.setQueriesData({ queryKey: ["blogs", "My blog"] }, data);
    },
  });

  const getMyBookMarksMutation = useMutation({
    mutationFn: async () => await getBlogsBookMark(),
    onSuccess: async (data) => {
      queryClient.setQueriesData({ queryKey: ["blogs", "My bookmark"] }, data);
      return data;
    },
  });

  useEffect(() => {
    if (select === "My blog") {
      getMyBlogsMutation.mutate();
    } else {
      getMyBookMarksMutation.mutate();
    }
  }, [select]);

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
            <div className="relative">
              <select
                onChange={(e) => setSelect(e.currentTarget.value)}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                {" "}
                <option value="My blog">My blog</option>
                <option value="My bookmark">My bookmark</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

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
          {isLoading ? (
            <div className="flex items-center justify-center w-full">
              <BounceLoader
                color="white"
                loading={isLoading}
                cssOverride={override}
                size={300}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <ListCard data={blogs}></ListCard>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
