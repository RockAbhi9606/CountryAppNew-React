import { darkModeAtom, toggleDarkModeAtom } from "../../atoms/darkModeAtom";
import { useAtom } from "jotai";

const Header = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const [, toggleDarkMode] = useAtom(toggleDarkModeAtom);
  return (
    <>
      <div
        className={`white dark:bg-dark-blue shadow-md flex justify-between items-center pl-64 pr-[13%] py-5 ${
          darkMode ? "" : "bg-gray-700"
        }`}
      >
        <p className={`text-2xl font-semibold ${darkMode ? "" : "text-white"}`}>
          Where in the world?
        </p>
        <div className="cursor-pointer">
          <span className="mr-2">
            <i
              className={`fa-regular fa-${
                darkMode ? "sun " : "moon text-white"
              }`}
            ></i>
          </span>
          <span
            className={`text-base ${darkMode ? "" : "text-white"}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
