import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-gray-900/50 rounded-lg border border-gray-700 py-2 pl-10 pr-3 outline-none text-gray-200 placeholder:text-gray-500 focus:border-gray-600"
      />
    </div>
  );
};

export default SearchInput;
