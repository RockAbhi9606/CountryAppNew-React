import axios from "axios";
export const getContriesService = {
  getCountries: async () => {
    const response = await axios.get("https://www.apicountries.com/countries");
    return response.data;
  },

  getSelectedCountry: async (options) => {
    console.log("options", options);
    const response = await axios.get(
      `https://www.apicountries.com/alpha/${options}`
    );
    return response.data;
  },
};
