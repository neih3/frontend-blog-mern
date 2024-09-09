import React from "react";
import Button from "../Button/Button";
import { Link, redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../reducers/user.reducer";
import Dropdown from "../Dropdown/Dropdown";

const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return (
    <div className="flex justify-between py-4 px-48 font-jet border-b items-center">
      <Link to="/">
        {" "}
        <div className="text-[white] flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </div>
      </Link>
      {isAuthenticated ? (
        // <div className="flex gap-3 capitalize">
        //   <Link to="/editBlog">
        //     <Button>Create Blog</Button>
        //   </Link>

        //   <Button
        //     style={{ background: "#3A50FC" }}
        //     onClick={() => {
        //       dispatch(logout());
        //     }}
        //   >
        //     Log out{" "}
        //     <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       fill="none"
        //       viewBox="0 0 24 24"
        //       strokeWidth="1.5"
        //       stroke="currentColor"
        //       className="size-5"
        //     >
        //       <path
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        //       />
        //     </svg>
        //   </Button>
        // </div>
        <Dropdown></Dropdown>
      ) : (
        <div className="flex gap-3 capitalize">
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
          <Link to="/register">
            <Button style={{ background: "#3A50FC" }}>
              Sign up{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
