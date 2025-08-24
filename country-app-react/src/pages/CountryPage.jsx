import Header from "../components/headers/Header";
import SearchBar from "../components/searchBar/SearchBar";
import FilterDropdown from "../components/filtersDropdown/FilterDropdown";
import CountryCard from "../components/countryCard/CountryCard";
import { useGetCountries } from "../hooks/useGetCountries";
import { useState } from "react";
import { darkModeAtom } from "../atoms/darkModeAtom";
import { useAtom } from "jotai";

const CountryPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [regionValue, setRegionValue] = useState("");
  const { getAllCountries, isLoading } = useGetCountries();
  const [darkMode] = useAtom(darkModeAtom);

  return (
    <>
      <Header />
      <div
        className={`flex justify-between pl-64 pr-[13%] pb-12 ${
          darkMode ? "" : "bg-gray-600"
        }`}
      >
        <SearchBar setSearchValue={setSearchValue} />
        <FilterDropdown setRegionValue={setRegionValue} />
      </div>
      <CountryCard
        searchValue={searchValue}
        regionValue={regionValue}
        getAllCountries={getAllCountries}
        isLoading={isLoading}
      />
    </>
  );
};

export default CountryPage;
