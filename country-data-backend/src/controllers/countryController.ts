import { Request, Response } from 'express';
import axios from 'axios';
import moment from "moment-timezone";
import { find } from "geo-tz";

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1/all';

// Get all countries
// Function to get the current time in a given timezone



const getCurrentTime = (lat: number, lon: number) => {
  try {
    const timezones = find(lat, lon); // Get accurate timezone
    const timezone = timezones[0] || "UTC"; // Fallback to UTC if no timezone found
    console.log(`Fetching time for timezone: ${timezone}`);

    return moment().tz(timezone).format("hh:mm:ss A"); // Format in 12-hour format
  } catch (error) {
    console.error(`Error fetching time for coordinates: ${lat}, ${lon}`, error);

    return moment().tz("UTC").format("hh:mm:ss A"); // Fallback time
  }
};

export const getCountries = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(REST_COUNTRIES_API);

    const countries = response.data.map((country: any) => {
      const latlng = country.latlng || [0, 0]; // Default to (0,0) if missing
      const timezone = find(latlng[0], latlng[1])[0] || "UTC"; // Get the correct timezone
      const localTime = getCurrentTime(latlng[0], latlng[1]);

      return {
        name: country.name?.common || "Unknown",
        flag: country.flags?.svg || "",
        region: country.region || "Unknown",
        code: country.cca3,
        timezone,
        localTime,
      };
    });

    res.json(countries);
  } catch (error) {
    console.error("Error fetching country data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get country by code
export const getCountryByCode = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {

    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    const country = response.data[0];
    res.json({
      name: country.name?.common,
      flag: country.flags?.svg,
      population: country.population,
      languages: country.languages,
      region: country.region,
      currency: country.currencies,
    });
  } catch (error) {
    console.error("Error fetching country data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




// Filter countries by region
export const filterCountriesByRegion = async (req: Request, res: Response) => {
  const { region } = req.params;

  try {
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data
      .filter((country: any) => country.region === region)
      .map((country: any) => ({
        name: country.name?.common || "Unknown",
        flag: country.flags?.svg || "",
        region: country.region || "Unknown",
          code: country.cca3
      }));

    res.json(countries); 
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};


export const searchCountries = async (req: Request, res: Response) => {
  const { name, capital, region, timezone } = req.query;
  console.log(req.query)
  try {
    const response = await axios.get(REST_COUNTRIES_API);
    let countries = response.data;
    if (name) {
      countries = countries.filter((country: any) =>
        country.name.common.toLowerCase().includes((name as string).toLowerCase())
      ).map((country: any) => ({
        name: country.name?.common || "Unknown",
        flag: country.flags?.svg || "",
        region: country.region || "Unknown",
      }));
      ;
    }
    if (capital) {
      countries = countries.filter((country: any) =>
        country.capital && country.capital[0].toLowerCase().includes((capital as string).toLowerCase())
      ).map((country: any) => ({
        name: country.name?.common || "Unknown",
        flag: country.flags?.svg || "",
        region: country.region || "Unknown",
      }));
      ;
    }
    if (region) {
      countries = countries.filter((country: any) => country.region === region).map((country: any) => ({
        name: country.name?.common || "Unknown",
        flag: country.flags?.svg || "",
        region: country.region || "Unknown",
      }));;
    }
    if (timezone) {
      countries = countries.filter((country: any) => country.timezones.includes(timezone as string));
    }
    res.json(countries);

  } catch (error) {
    console.error("Error fetching countries by search:", error);
    res.status(500).json({ message: "Failed to fetch countries" });
  }

}



