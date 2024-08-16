import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({
  barData,
  legendBool,
  legendPosition,
  datasets,
  yBool = false,
}) => {
  const data = {
    labels: barData.map((item) => item.quarter),
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor,
      borderRadius: 10,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition,
        display: legendBool,
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
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
        },
        title: {
          display: yBool,
          text: "Time",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
