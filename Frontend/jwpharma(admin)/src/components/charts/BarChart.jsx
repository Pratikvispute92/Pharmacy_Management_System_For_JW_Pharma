import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const salesData = [65, 59, 80, 81, 56, 55];
  const totalSales = salesData.reduce((acc, curr) => acc + curr, 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Medicine Sales (Total: $${totalSales})`,
        font: {
          size: 16
        }
      },
    },
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Medicine Sales 2023',
        data: salesData,
        backgroundColor: '#98BDFF',
      },
    ],
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
