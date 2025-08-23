const FilterDropdown = ({ setRegionValue }) => {
  return (
    <>
      <select
        className="rounded shadow-sm h-12 cursor-pointer px-4 w-60 items-center border-none outline-none"
        onClick={(e) => setRegionValue((e.target as HTMLSelectElement).value)}
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
