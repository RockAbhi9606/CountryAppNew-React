import axios from "axios";
export const getContriesService = {
  getCountries: async () => {
    const response = await axios.get("https://www.apicountries.com/countries");
    return response.data;
  },
};
