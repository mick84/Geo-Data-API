//https://restcountries.com/v2/region/{region}

import { continentMenu, countriesMenu } from "./DOM";
import { getContinentData, getCountryData, state } from "./functions";

continentMenu.addEventListener("click", getContinentData.bind(null, state));
countriesMenu.addEventListener("click", getCountryData.bind(null, state));
