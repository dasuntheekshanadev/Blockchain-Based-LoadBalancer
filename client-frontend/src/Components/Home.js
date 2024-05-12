import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiServer } from 'react-icons/fi';
import TotalRequestsChart from './TotalRequestsChart';

/**
 * This component fetches and displays the total number of requests
 * handled by the server since the last restart. It updates the data
 * every 5 seconds to ensure the displayed information is current.
 */
const ApplicationServers = () => {
  const [totalRequests, setTotalRequests] = useState(0);

  // Fetches total requests from the server
  const fetchTotalRequests = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/total-requests");
      setTotalRequests(data.totalRequests);
    } catch (error) {
      console.error("Error fetching total requests:", error);
    }
  };

  useEffect(() => {
    fetchTotalRequests();
    // Set an interval to fetch total requests every 5 seconds
    const intervalId = setInterval(fetchTotalRequests, 5000);

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Only run once on mount

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-full">
      <FiServer size={50} className="text-blue-500 mb-4" />
      <h2 className="text-2xl font-semibold">Total Requests Handled After Restart</h2>
      <div className="text-3xl font-bold text-blue-500">{totalRequests}</div>
    </div>
  );
};

/**
 * The Home component serves as the main dashboard view, containing
 * the ApplicationServers component and the TotalRequestsChart component,
 * presenting a full overview of server statistics.
 */
const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-8">Welcome to Blockchain Based Load Balancer Dashboard</h1>
      <div className="w-full max-w-6xl"> 
        <ApplicationServers />
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center h-full mt-6 w-full">  
          <TotalRequestsChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
