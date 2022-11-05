import Chart from "chart.js/auto";

export type Country = {
  name: string;
  area: number;
  capital: string;
  flag: URL;
  population: number;
  cityNames?: string[];
  code: string;
};
export type FetchedContinent = {
  name: string;
  countries: Country[];
};
export type AppState = {
  fetchedContinents: FetchedContinent[];
  currentContinent?: FetchedContinent;
  currentCountry: Country | null;
  mode: string;
  chart?: Chart;
};
export type ContinentChartInput = {
  names: string[]; //country names array,
  areas: number[]; //country areas array
  populations: number[]; //country populations array
};
