import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the adapter

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function TotalRequestsChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Requests',
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/total-requests-history')
      .then(response => response.json())
      .then(data => {
        const labels = data.map(d => new Date(d.timestamp));
        const datasetData = data.map(d => d.totalRequests);
        setChartData({
          labels,
          datasets: [{
            label: 'Total Requests',
            data: datasetData,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          }]
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line
        data={chartData}
        options={{
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute',
                tooltipFormat: 'MMM D, h:mm a'
              },
              title: {
                display: true,
                text: 'Time'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Total Requests'
              }
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Total Requests Over Time'
            }
          },
          maintainAspectRatio: false
        }}
      />
    </div>
  );
}
