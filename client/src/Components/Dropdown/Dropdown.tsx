import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/user.reducer";
import { RootState } from "../../store";

const Dropdown = () => {
  const user = useSelector((state: RootState) => state.user.user);

  console.log("render dropdown", user.name);
  const dispatch = useDispatch();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  text-sm font-semibold text-gray-900">
          <img
            className="w-10 h-10 rounded-full"
            src={
              user.avatar ||
              "data:image/jpeg;base64,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"
            }
            alt="Rounded avatar"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Profile
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="/editBlog"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Create Blog
            </a>
          </MenuItem>
          <MenuItem>
            <a
              onClick={() => {
                dispatch(logout());
              }}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Log out
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
