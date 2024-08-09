import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({
  dealData,
  datasets,
  legendPosition,
  legendTextColor,
}) => {
  const data = {
    labels: dealData.map((dataset) => dataset.type),
    datasets: datasets.map((dataset) => ({
      data: dataset.data,
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition,
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
          },
          padding: 20,
          color: legendTextColor,
        },
        padding: {
          top: 20,
        },
        onHover: (event) => {
          event.chart.canvas.style.cursor = "pointer";
        },
        onLeave: (event) => {
          event.chart.canvas.style.cursor = "default";
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};
