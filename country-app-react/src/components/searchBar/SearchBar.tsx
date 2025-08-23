const SearchBar = ({ setSearchValue }) => {
  return (
    <div className="white rounded shadow-md flex items-center px-6 mb-12 w-90">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-96 p-3 outline-none"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
