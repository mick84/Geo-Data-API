import Chart from "chart.js/auto";
import randomColor from "randomcolor";
import { ctx } from "./DOM";
import { CityData, ContinentChartInput } from "./types";

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

export const countryChart = (inputs: CityData[]) => {
  /*[{city:"city0",records:[{year,value},...{year,value}]},...{city:"cityN",records:[{year,value},...{year,value}]}]*/
  //const  newlabels=inputs.map((el, i) => el.city);
  const labs: string[] = [];
  const sets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[] = [];
  const dateArr: number[] = [];
  //make dateline:
  for (const input of inputs) {
    labs.push(input.city);
    const color = randomColor();
    sets.push({
      label: input.city,
      data: input.records.map((r) => r.value),
      backgroundColor: color,
      borderColor: color,
    });
    const years = input.records.map((r) => r.year);
    dateArr.push(...years);
  }
  const dates = [...new Set(dateArr.sort())];
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: sets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
