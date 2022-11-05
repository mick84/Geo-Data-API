//https://restcountries.com/v2/region/{region}

import {
  countriesMenu,
  getContinentData,
  getCountryData,
  state,
} from "./functions";

const continentMenu = document.getElementById("continent-buttons")!;

continentMenu.addEventListener("click", getContinentData.bind(null, state));
countriesMenu.addEventListener("click", getCountryData.bind(null, state));
