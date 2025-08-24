import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { darkModeAtom } from "../../atoms/darkModeAtom";
import { useAtom } from "jotai";

const CountryCard = ({
  getAllCountries,
  searchValue,
  regionValue,
  isLoading,
}) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countriesPerPage, setCountriesPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [darkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    if (!Array.isArray(getAllCountries)) return;

    let filtered = getAllCountries;

    // Filter by search value if present
    if (searchValue.trim() !== "") {
      filtered = filtered.filter((country) =>
        country?.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Filter by region only if it's not "none" or empty
    if (
      typeof regionValue === "string" &&
      regionValue.trim().toLowerCase() !== "" &&
      regionValue.toLowerCase() !== "none"
    ) {
      filtered = filtered.filter(
        (country) =>
          country?.region?.toLowerCase() === regionValue.toLowerCase()
      );
    }

    setFilteredCountries(filtered);
    setCurrentPage(1);
  }, [searchValue, regionValue, getAllCountries]);

  const totalCountriesPerPage = Math.ceil(
    filteredCountries.length / countriesPerPage
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  const visibleCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalCountriesPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Pagination Range Generator
  const getPaginationRange = () => {
    const totalPages = totalCountriesPerPage;
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handleSelectedCountry = (country) => {
    navigate(`/countryDetails/${country.cca3 || country.alpha3Code}`, {
      state: { alpha3Code: country.alpha3Code },
    });
  };

  if (isLoading && filteredCountries && filteredCountries.length === 0) {
    return (
      <div
        className={`min-h-screen dark:bg-gray-900 ${
          darkMode ? "" : "bg-gray-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p
                className={`mt-4 text-gray-600 dark:text-gray-300 ${
                  darkMode ? "" : "text-white"
                }`}
              >
                Loading country data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`grid min-[1520px]:grid-cols-3 min-[1600px]:grid-cols-4 gap-12 pl-59 pr-[13%] ${
          darkMode ? "" : "bg-gray-600"
        }`}
      >
        {visibleCountries?.length > 0 &&
          visibleCountries.map((country) => (
            <div
              onClick={() => handleSelectedCountry(country)}
              className={`px-6 pb-20 ${darkMode ? "" : "text-white"}`}
              key={country.name}
            >
              <div
                className="cursor-pointer rounded shadow-xl ease-in-out w-72 h-96 
                     transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={country?.flags?.png}
                  className="h-48 w-full rounded-t"
                  alt={country.name?.common}
                />
                <p className="px-4 py-5 text-2xl font-bold">{country.name}</p>
                <div className="px-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Population:</span>
                    <span>{country.population}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Region:</span>
                    <span>{country.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Capital:</span>
                    <span>{country.capital}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination Controls */}
      <div
        className={`flex justify-between py-10 space-x-4 ${
          darkMode ? "" : "bg-gray-600"
        }`}
      >
        {visibleCountries && (
          <div className="flex items-center space-x-2 pl-64 pr-[13%]">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded cursor-pointer ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Prev
            </button>

            {getPaginationRange().map((page, index) =>
              page === "..." ? (
                <span
                  key={index}
                  className="px-3 py-2 text-gray-500 select-none"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`px-4 py-2 rounded cursor-pointer ${
                    currentPage === page
                      ? "bg-green-700 text-white"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={handleNext}
              disabled={currentPage === totalCountriesPerPage}
              className={`px-4 py-2 rounded cursor-pointer ${
                currentPage === totalCountriesPerPage
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Dropdown for items per page */}
        <div className="flex items-center space-x-2 pr-[13%]">
          <select
            onChange={(e) => {
              setCountriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            value={countriesPerPage}
            className={`p-2 border rounded cursor-pointer ${
              darkMode ? "" : "bg-gray-700 text-white border-none outline-none"
            }`}
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default CountryCard;
