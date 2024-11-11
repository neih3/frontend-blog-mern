import { BookOpen, MessageCircle, User } from "lucide-react";
import { ReactElement } from "react";

interface TitleType {
  title: string;
  icon?: ReactElement;
  isSelected: string;
  setIsSelected: (value: string) => void;
}

const Item = ({ title, icon, isSelected, setIsSelected }: TitleType) => (
  <li
    className="flex gap-4 items-center cursor-pointer"
    onClick={() => setIsSelected(title)}
  >
    {icon}
    <span>{title}</span>
  </li>
);

const Sidebar = ({ isSelected, setIsSelected }: any) => {
  return (
    <div className="w-2/12 pl-6 pt-5 bg-slate-800 h-screen  ">
      <h3 className="mb-10 text-3xl">Admin</h3>
      <ul className="flex flex-col gap-4">
        <Item
          title="Blogs"
          icon={<BookOpen />}
          setIsSelected={setIsSelected}
          isSelected={isSelected}
        />
        <Item
          title="Users"
          icon={<User />}
          setIsSelected={setIsSelected}
          isSelected={isSelected}
        />
        <Item
          title="Comments"
          icon={<MessageCircle />}
          setIsSelected={setIsSelected}
          isSelected={isSelected}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
