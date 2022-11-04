import axios from "axios";
import { myChart } from "./chart";
import { AppState, ChartInput, Country, FetchedContinent } from "./types";
//axios.get("https://restcountries.com/v2/region/europe").then(console.log);
export const getContinentData = async (
  state: AppState,
  e: {
    target: { dataset: any; className: string } | any;
  }
) => {
  const { target } = e;
  if (target.className !== "continent-button") return;
  state.mode = "continent";
  const continent = state.fetchedContinents.find(
    (cont) => cont.name === target.dataset.continent
  );
  if (!continent) {
    state.currentContinent = await fetchContinentData(target.dataset.continent);
    state.fetchedContinents.push(state.currentContinent!);
  } else {
    state.currentContinent = continent;
  }
  state.chart?.destroy();
  const chartInput: ChartInput = { names: [], areas: [], populations: [] };
  for (const country of state.currentContinent.countries) {
    chartInput.names.push(country.name);
    chartInput.areas.push(country.area);
    chartInput.populations.push(country.population);
  }
  state.chart = myChart(chartInput);

  console.log(state);
};

const fetchContinentData = async (name: string): Promise<FetchedContinent> => {
  try {
    const regObj = await axios.get(
      `https://restcountries.com/v2/region/${name}`
    );
    const countriesFull: any[] = regObj.data;
    //make a countries Data :
    const countries: Country[] = countriesFull.map((country) => ({
      name: country.name,
      area: country.area,
      capital: country.capital,
      flag: country.flags.png,
      population: country.population,
    }));
    return { name, countries };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const state: AppState = {
  fetchedContinents: [],
  mode: "",
};
/*

 fetched country object from state.fetchedContinents[indexof currentContName]:
{name: 'Åland Islands', area: 1580, capital: 'Mariehamn', flag: 'https://flagcdn.com/w320/ax.png', population: 28875}
*/
