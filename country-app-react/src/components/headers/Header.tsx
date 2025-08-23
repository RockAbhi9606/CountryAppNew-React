const Header = () => {
  return (
    <>
      <div className="white dark:bg-dark-blue shadow-md flex justify-between items-center pl-64 pr-[13%] py-5 mb-8">
        <p className="text-2xl font-semibold">Where in the world?</p>
        <div className="cursor-pointer">
          <span className="mr-2">
            <i className="fa-regular fa-moon"></i>
          </span>
          <span className="text-base">Dark Mode</span>
        </div>
      </div>
    </>
  );
};

export default Header;
