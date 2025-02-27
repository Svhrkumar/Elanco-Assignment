import { useState, useEffect, Fragment, lazy, Suspense } from "react";
import { getAllCountries, filterCountriesByRegion, getCountryByCode } from "../../services/countryService";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../../components/Header";

const CountryCard = lazy(() => import("../../components/CountryCard"));
const SearchBar = lazy(() => import("../../components/SearchBar"));
const CountryDetails = lazy(() => import("../../components/CountryDetails"));


interface Country {
  name: string;
  flag: string;
  region: string;
  capital?: string;
  timezone?: string;
}

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [countryData, setCountryData] = useState<Country | null>(null);
  const [searchBy, setSearchBy] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getAllCountries();
        setCountries(response);
        setFilteredCountries(response);
      } catch (err) {
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedRegion) return;

    const fetchFilteredRegion = async () => {
      setLoading(true);
      try {
        const response =
          selectedRegion === "All Region"
            ? await getAllCountries()
            : await filterCountriesByRegion(selectedRegion);
        setFilteredCountries(response);
      } catch (err) {
        setError("Failed to filter countries by region");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredRegion();
  }, [selectedRegion]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCountries(countries);
      return;
    }

    setFilteredCountries(
      countries.filter((country) => {
        if (searchBy === "country name")
          return country.name?.toLowerCase().includes(searchTerm.toLowerCase());
        if (searchBy === "capital")
          return country.capital
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        return (
          country.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.capital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.timezone?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [searchTerm, searchBy, countries]);

  const handleDetails = async (code: string) => {
    setLoading(true);
    try {
      const data = await getCountryByCode(code);
      setCountryData(data);
    } catch (error) {
      setError("Failed to fetch country details");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setCountryData(null);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <Fragment>
      <Header />
      <div className="p-4 sm:p-6">
        {/* Search & Region Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-16 gap-4">
          {countryData ? (
            <button className="flex items-center text-lg text-gray-700 hover:text-black transition" onClick={handleBack}>
              <IoMdArrowRoundBack className="mr-2 text-2xl" /> Back
            </button>
          ) : (
            <Fragment>
              {/* Search By Dropdown */}
              <select
                className="border border-gray-300 p-2 sm:p-3 rounded-lg w-full sm:w-auto"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option value="">Search By</option>
                {["country name", "capital"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Search Bar */}
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

              {/* Region Filter Dropdown */}
              <select
                className="border border-gray-300 p-2 sm:p-3 rounded-lg w-full sm:w-auto"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="All Region">All Regions</option>
                {[...new Set(countries.map((c) => c.region))].map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </Fragment>
          )}
        </div>

        {/* Display country details or list */}
        {
          loading ? (
            <div className="flex justify-center items-center h-screen">
              <span className="animate-spin border-4 border-gray-300 border-t-orange-500 rounded-full h-12 w-12"></span>
            </div>
          ) : (<Fragment>
            {countryData ? (
              <CountryDetails country={countryData} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[30rem] overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <CountryCard
                      key={country.name}
                      country={country}
                      handleDetails={handleDetails}

                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-full">No countries found.</p>

                )}
                
              </div>
            )}
          </Fragment>
          )
        }

      </div>
    </Fragment>
  );
}

export default Countries