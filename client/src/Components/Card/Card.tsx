import React from "react";
import Blog from "../../types/blog.type";
import { Link } from "react-router-dom";

export const Card = ({ data }: any) => {
  const { content, image, title, user, updatedAt } = data;
  return (
    <>
      <div className=" border-gray-200 rounded-lg shadow  dark:bg-gray-800 font-inter max-w-sm ">
        <div className="w-full h-[200px] ">
          <img
            className="rounded-t-lg w-full  p-5
          "
            src={image}
            alt=""
          />
        </div>

        <div className="p-5 ">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="text-[#fffffff2] font-spe text-xs">
                {user?.name}
              </span>
            </div>
            <span className="text-[#fffffff2]">{updatedAt}</span>
          </div>
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-5">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {`${content.slice(0, 50)}...`}
          </p>
        </div>
      </div>
    </>
  );
};
