import Header from "../components/headers/Header";
import SearchBar from "../components/searchBar/SearchBar";
import FilterDropdown from "../components/filtersDropdown/FilterDropdown";
import CountryCard from "../components/countryCard/CountryCard";
import { useGetCountries } from "../hooks/useGetCountries";
import { useState } from "react";

const CountryPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [regionValue, setRegionValue] = useState<string>("");
  const { getAllCountries, refetchAllCountries, error, isLoading } =
    useGetCountries();

  return (
    <>
      <Header />
      <div className="flex justify-between pl-64 pr-[13%] mb-12">
        <SearchBar setSearchValue={setSearchValue} />
        <FilterDropdown setRegionValue={setRegionValue} />
      </div>
      <CountryCard
        searchValue={searchValue}
        regionValue={regionValue}
        getAllCountries={getAllCountries}
      />
    </>
  );
};

export default CountryPage;
