import { useAtom } from "jotai";
import { darkModeAtom } from "../../atoms/darkModeAtom";

const SearchBar = ({ setSearchValue }) => {
  const [darkMode] = useAtom(darkModeAtom);
  return (
    <div
      className={`white rounded shadow-md flex items-center px-6 mb-12 w-90 mt-8 ${
        darkMode ? "" : "text-white"
      }`}
    >
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        className={`w-96 p-3 outline-none ${
          darkMode
            ? "text-gray-600 placeholder:text-black"
            : "text-white placeholder:text-white"
        }`}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
