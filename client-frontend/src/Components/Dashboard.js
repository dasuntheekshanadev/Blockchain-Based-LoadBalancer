import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [datasets, setDatasets] = useState([]);
  const ports = [5000, 5001, 5002, 5003]; // Ports for your servers
  const fetchInterval = 5000; // Update every 5000 ms or 5 seconds

  useEffect(() => {
    const fetchData = () => {
      ports.forEach(port => {
        fetch(`http://localhost:${port}/data`)
          .then(response => response.json())
          .then(data => {
            const timestamps = data.map(item => new Date(item.timestamp).toLocaleString());
            const counts = data.map(item => item.count);
            setDatasets(prevData => {
              const index = prevData.findIndex(set => set.label === `Server on port ${port}`);
              if (index === -1) {
                return [
                  ...prevData,
                  {
                    label: `Server on port ${port}`,
                    data: counts,
                    borderColor: `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
                    backgroundColor: `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.5)`,
                    timestamps: timestamps
                  }
                ];
              } else {
                let newPrevData = [...prevData];
                newPrevData[index] = {
                  ...newPrevData[index],
                  data: counts,
                  timestamps: timestamps
                };
                return newPrevData;
              }
            });
          })
          .catch(error => console.error('Failed to fetch data:', error));
      });
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, fetchInterval); // Set up polling

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="animate-fade-in-up min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6 bg-white">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Request Activity Overview</h3>
          <div className="mt-5 border-t border-gray-200 pt-5">
            {datasets.map((dataset, index) => (
              <div key={index} style={{ height: '300px' }} className="mb-10">
                <h4 className="text-center font-medium text-lg">{dataset.label}</h4>
                <Line 
                  data={{
                    labels: dataset.timestamps,
                    datasets: [dataset]
                  }} 
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
