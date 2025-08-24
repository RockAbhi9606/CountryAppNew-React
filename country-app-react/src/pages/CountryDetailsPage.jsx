import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/headers/Header";
import { useGetSelectedCountry } from "../hooks/useGetSelectedCountry";
import { darkModeAtom } from "../atoms/darkModeAtom";
import { useAtom } from "jotai";

const CountryDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState(null);
  const [darkMode] = useAtom(darkModeAtom);

  // Get the alpha3Code from location state
  const { alpha3Code: stateCode } = location.state || {};

  // Use the custom hook
  const {
    getSelectedCountry: selectedCountry,
    error,
    isLoading: loading,
    refetch,
  } = useGetSelectedCountry(countryCode);

  // Set the country code for the hook when stateCode is available
  useEffect(() => {
    if (stateCode) {
      setCountryCode(stateCode);
    }
  }, [stateCode]);

  // Handle click on border country
  const handleBorderClick = (borderCode) => {
    setCountryCode(borderCode);
    // Update URL without pushing new entry to history stack
    navigate(location.pathname, {
      state: { alpha3Code: borderCode },
      replace: true,
    });

    // Scroll to top for better UX
    window.scrollTo(0, 0);
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Handle retry
  const handleRetry = () => {
    if (countryCode) {
      refetch();
    } else if (stateCode) {
      setCountryCode(stateCode);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen dark:bg-gray-900 ${
          darkMode ? "" : "bg-gray-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-24">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <span>← Back</span>
            </button>
          </div>
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

  if (error) {
    return (
      <div className="min-h-screen dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-24">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <span>← Back</span>
            </button>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <p className="text-red-500 mb-4">Error: {error.message}</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div
        className={`min-h-screen dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200 ${
          darkMode ? "" : "bg-gray-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-16">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-6 py-3 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer ${
                darkMode ? "" : "bg-gray-700 text-white"
              }`}
            >
              <span>← Back</span>
            </button>
          </div>

          {/* Main Content */}
          {selectedCountry && (
            <div
              className={`flex flex-col lg:flex-row gap-16 ${
                darkMode ? "" : "text-white"
              }`}
            >
              {/* Flag Image */}
              <div className="lg:w-1/2">
                <img
                  className="w-full h-auto max-h-96 object-cover rounded-xl shadow-lg"
                  src={selectedCountry.flags.png}
                  alt={`${selectedCountry.name} flag`}
                />
              </div>

              {/* Country Details */}
              <div className="lg:w-1/2">
                <h1 className="text-3xl font-bold mb-8">
                  {selectedCountry.name}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">Native Name: </span>
                      <span>{selectedCountry.nativeName || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Population: </span>
                      <span>
                        {selectedCountry.population.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Region: </span>
                      <span>{selectedCountry.region || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Sub Region: </span>
                      <span>{selectedCountry.subregion || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Capital: </span>
                      <span>{selectedCountry.capital || "N/A"}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">Top Level Domain: </span>
                      <span>
                        {(selectedCountry.topLevelDomain || []).join(", ") ||
                          "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Currencies: </span>
                      <span>
                        {(selectedCountry.currencies || [])
                          .map((c) => c.name)
                          .join(", ") || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Languages: </span>
                      <span>
                        {(selectedCountry.languages || [])
                          .map((l) => l.name)
                          .join(", ") || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Border Countries */}
                {selectedCountry.borders &&
                selectedCountry.borders.length > 0 ? (
                  <div>
                    <h2
                      className={`text-xl font-semibold mb-4 ${
                        darkMode ? "" : "text-white"
                      }`}
                    >
                      Border Countries
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {selectedCountry.borders.map((borderCode) => (
                        <button
                          key={borderCode}
                          onClick={() => handleBorderClick(borderCode)}
                          className={`px-4 py-2 dark:bg-gray-800 rounded-md shadow-sm text-sm cursor-pointer hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed ${
                            darkMode ? "" : "text-white bg-gray-700"
                          }`}
                          disabled={loading}
                        >
                          {borderCode}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-red-600 dark:text-gray-400">
                    No border countries
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CountryDetailsPage;
