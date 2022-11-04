import Chart from "chart.js/auto";
import { ChartInput } from "./types";

/*

 fetched country object from state.fetchedContinents[indexof currentContName]:
{name: 'Åland Islands', area: 1580, capital: 'Mariehamn', flag: 'https://flagcdn.com/w320/ax.png', population: 28875}
*/

export const ctx = document.getElementById("myChart") as HTMLCanvasElement;
export const myChart = (input: ChartInput) =>
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: input.names,
      datasets: [
        {
          label: "Area",
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
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
