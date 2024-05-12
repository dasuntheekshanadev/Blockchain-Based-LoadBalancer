import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaServer } from 'react-icons/fa'; // Importing server icon

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
                    borderColor: `#4F46E5`,
                    backgroundColor: `#C7D2FE`,
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
          .catch(error => {
            console.error('Failed to fetch data:', error);
            setError('Failed to load data.');
          })
          .finally(() => setLoading(false));
      });
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, fetchInterval); // Set up polling

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  if (error) return <p>Error loading data!</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="animate-fade-in-up min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6 bg-white">
          <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center"><FaServer className="mr-2"/>Handled Requests Overview</h2>
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
