import SearchInput from "./SearchInput";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <div className="p-5 flex items-center justify-between">
      <h3>{`${title} List`}</h3>
      <SearchInput />
      <div></div>
    </div>
  );
};

export default Header;
