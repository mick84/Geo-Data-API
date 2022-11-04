import Chart from "chart.js/auto";

export type Country = {
  name: string;
  area: number;
  capital: string;
  flag: URL;
  population: number;
  cityNames?: string[];
};
export type FetchedContinent = {
  name: string;
  countries: Country[];
};
export type AppState = {
  fetchedContinents: FetchedContinent[];
  currentContinent?: FetchedContinent;
  currentCountry?: Country;
  mode: string;
  chart?: Chart;
};
export type ChartInput = {
  names: string[]; //country names array,
  areas: number[]; //country areas array
  populations: number[]; //country populations array
};
