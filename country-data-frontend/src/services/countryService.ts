import axios from "axios";

const BASE_URL = "http://localhost:3001"; // Replace with your actual backend URL

// Fetch All Countries
export const getAllCountries = async () => {
    try {
        console.log("calling")
        const response = await axios.get(`${BASE_URL}/countries`);

        return response?.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
};

//  Search Countries by Name, Capital, or Timezone
export const searchCountries = async (searchTerm: string, searchBy: string) => {
    try {
        if (searchBy === "name") {
            const response = await axios.get(`${BASE_URL}/countries/search`, {
                params: { name: searchTerm },
            });
            return response.data;
        }
        if (searchBy === "capital") {
            const response = await axios.get(`${BASE_URL}/countries/search`, {
                params: { capital: searchTerm },
            });
            return response.data;
        }

    } catch (error) {
        console.error("Error searching countries:", error);
        return [];
    }
};

// Fetch Country by Code
export const getCountryByCode = async (code: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/countries/${code}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country with code ${code}:`, error);
        return null;
    }
};

// Filter Countries by Region
export const filterCountriesByRegion = async (region: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/countries/region/${region}`);
        return response.data;
    } catch (error) {
        console.error("Error filtering countries:", error);
        return [];
    }
};
