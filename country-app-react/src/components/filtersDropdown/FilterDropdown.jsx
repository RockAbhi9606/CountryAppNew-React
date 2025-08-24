import { useAtom } from "jotai";
import { darkModeAtom } from "../../atoms/darkModeAtom";

const FilterDropdown = ({ setRegionValue }) => {
  const [darkMode] = useAtom(darkModeAtom);
  return (
    <>
      <select
        className={`rounded shadow-sm h-12 cursor-pointer px-4 w-60 items-center border-none outline-none mt-8 ${
          darkMode ? "" : "bg-gray-700 text-white"
        }`}
        onClick={(e) => setRegionValue(e.target.value)}
      >
        <option value="none">None</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
};

export default FilterDropdown;
