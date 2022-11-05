import Chart from "chart.js/auto";
import randomColor from "randomcolor";
import { ContinentChartInput } from "./types";

/*

 fetched country object from state.fetchedContinents[indexof currentContName]:
{name: 'Åland Islands', area: 1580, capital: 'Mariehamn', flag: 'https://flagcdn.com/w320/ax.png', population: 28875}
*/

const ctx = document.getElementById("myChart") as HTMLCanvasElement;
export const ContinentChart = (input: ContinentChartInput) =>
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: input.names,
      datasets: [
        {
          label: "Area (km^2)",
          data: input.areas,
          backgroundColor: "green",
          borderColor: "gray",
          borderWidth: 2,
        },
        {
          label: "Population",
          data: input.populations,
          backgroundColor: "blue",
          borderColor: "lightblue",
          borderWidth: 2,
        },
      ],
    },
  });
type CityChartInput = {
  city: string;
  records: { year: number; value: number }[];
};
export const countryChart = (inputs: CityChartInput[]) => {
  const years = [
    ...new Set(inputs.flatMap((i) => i.records.map((w) => w.year))),
  ].sort((a, b) => a - b);
  console.log(years);

  /*
  return  new Chart(ctx, {
    type: "line",
    data: {
      labels: inputs.map((i) => i.records.map((r) => r.year)),
      datasets: [],
    },
  });*/
};
