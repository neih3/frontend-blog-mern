import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { deleteBlog } from "../../../api/blog";

interface Props {
  id: string;
  isSelected: string;
}

const Action = ({ id, isSelected }: Props) => {
  console.log("id ne:", id);
  console.log(isSelected);

  const [openDropBar, setOpenDropBar] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => await deleteBlog(id),
    onSuccess: async () => {
      // Cập nhật danh sách blog bằng cách gọi lại query "blogs"
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  return (
    <li className="relative" ref={dropdownRef}>
      <Ellipsis
        className="cursor-pointer"
        onClick={() => setOpenDropBar(!openDropBar)}
      />
      <ul
        className={`absolute right-0 bg-slate-300 text-slate-950 rounded-md flex flex-col gap-2 mt-1 transition-opacity duration-200 ${
          openDropBar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <li className="cursor-pointer hover:bg-slate-400 hover:rounded-md px-2 py-1 ">
          Update
        </li>
        <li
          onClick={() => deleteBlogMutation.mutate(id)}
          className="cursor-pointer hover:bg-slate-400 hover:rounded-md px-2 py-1 "
        >
          Delete
        </li>
      </ul>
    </li>
  );
};

export default Action;
