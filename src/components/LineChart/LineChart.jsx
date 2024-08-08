import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ lineData, LineFunction, datasets }) => {
  const data = {
    labels: lineData.map((item) => item.month),
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      fill: false,
      borderColor: dataset.borderColor,
      pointRadius: 4,
      pointBorderWidth: 0.1,
      pointBackgroundColor: dataset.pointBackgroundColor,
      borderWidth: 2,
      borderRadius: 10,
      tension: 0.4,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
          },
          padding: 20,
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
      //   tooltip: {
      //     callbacks: {
      //       label: function (tooltipItem) {
      //         return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
      //       },
      //     },
      //   },
    },
    scales: {
      y: {
        grace: 20,
        grid: {},
        border: {
          display: false,
          dash: [5, 5],
          dashOffset: 5,
        },
        title: {
          display: true,
          text: "Amount",
          font: {
            size: 12,
            weight: "semibold",
          },
        },
        min: 0,
        max: 320,
        ticks: {
          callback: LineFunction,
          stepSize: 40,
          font: {
            weight: 500,
          },
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
          dashOffset: 5,
        },
        title: {
          display: true,
          text: "Month",
          font: {
            size: 12,
            weight: "semibold",
          },
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            weight: 500,
          },
        },
      },
    },
  };

  return <Line className="max-w-[600px]" data={data} options={options} />;
};
