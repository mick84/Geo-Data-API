import axios from "axios";
import { ContinentChart, countryChart } from "./chart";
import {
  AppState,
  CityData,
  ContinentChartInput,
  Country,
  FetchedContinent,
} from "./types";
export const countriesMenu = document.getElementById(
  "country-buttons"
)! as HTMLDivElement;
//axios.get("https://restcountries.com/v2/region/europe").then(console.log);
export const getContinentData = async (state: AppState, e: any) => {
  const { target: btn } = e;
  if (btn.tagName !== "BUTTON") return;
  state.mode = "continent";
  const continent = state.fetchedContinents.find(
    (cont) => cont.name === btn.dataset.continent
  );
  if (!continent) {
    state.currentContinent = await fetchContinentData(btn.dataset.continent);
    state.fetchedContinents.push(state.currentContinent!);
  } else {
    state.currentContinent = continent;
  }
  state.chart?.destroy();
  const chartInput: ContinentChartInput = {
    names: [],
    areas: [],
    populations: [],
  };
  countriesMenu.replaceChildren("");
  for (const country of state.currentContinent.countries) {
    chartInput.names.push(country.name);
    chartInput.areas.push(country.area);
    chartInput.populations.push(country.population);
    const btn = makeCountryButton(country);
    countriesMenu.appendChild(btn);
  }
  state.chart = ContinentChart(chartInput);
  console.log(state);
};
function makeCountryButton(country: Country) {
  const el = document.createElement("button");
  el.classList.add("country-btn");
  el.setAttribute("data-code", country.code);
  el.setAttribute("data-country", country.name);
  el.innerHTML = `<span class="flag" style="background-image: url(${country.flag})"></span>
  <span class="country-name">${country.name}</span>`;
  return el;
}
const fetchContinentData = async (name: string): Promise<FetchedContinent> => {
  try {
    const regObj = await axios.get(
      `https://restcountries.com/v2/region/${name}`
    );
    const countriesFull: any[] = regObj.data;
    console.log(countriesFull);
    const countries: Country[] = countriesFull.map((country) => ({
      name: country.name,
      area: country.area,
      capital: country.capital,
      flag: country.flags.png,
      population: country.population,
      code: country.cioc || country.alpha3Code,
    }));
    return { name, countries };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCountryData = async (state: AppState, e: any) => {
  const { target } = e;
  const btn = target.closest("button");
  if (!btn) return;
  state.mode = "country";
  try {
    const cityRes = await axios.post(
      `https://countriesnow.space/api/v0.1/countries/cities`,
      { country: btn.dataset.country }
    );
    if (cityRes.status !== 200) {
      throw new Error(cityRes.statusText);
    }
    const cityNames = cityRes.data.data;
    const settled = await Promise.allSettled(
      cityNames.map((city: string) =>
        axios.post(
          `https://countriesnow.space/api/v0.1/countries/population/cities`,
          { city }
        )
      )
    );
    const results = settled.filter((s) => s.status === "fulfilled");
    if (!results.length) {
      throw new Error("No cities to show!");
    }
    console.clear();
    const sortedData = results.map((r) => ({
      city: r["value"].data.data.city,
      records: r["value"].data.data.populationCounts
        .map((rec: { year: string; value: string }) => ({
          year: +rec.year,
          value: +rec.value,
        }))
        .sort((a, b) => a.year - b.year),
    }));
    state.chart?.destroy();
    state.chart = countryChart(sortedData);
  } catch (error) {
    console.error(error.message);
  }
};
export const state: AppState = {
  fetchedContinents: [],
  currentCountry: null,
  mode: "",
};
