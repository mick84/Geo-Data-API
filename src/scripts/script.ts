//https://restcountries.com/v2/region/{region}

import { getContinentData, state } from "./functions";

const continentMenu = document.getElementById("continent-buttons")!;
const countriesMenu = document.getElementById("country-buttons")!;
continentMenu.addEventListener("click", getContinentData.bind(null, state));
