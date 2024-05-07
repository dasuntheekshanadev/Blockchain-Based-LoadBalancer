import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplicationServerStatus = ({ serverUrl, title }) => {
  const [serverStatus, setServerStatus] = useState({
    uptime: null,
    cpuUsage: null,
    memoryUsage: null,
    diskUsage: null
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await axios.get(serverUrl);
        setServerStatus(response.data);
      } catch (error) {
        console.error("Error fetching server status:", error);
        setServerStatus({
          uptime: "Error",
          cpuUsage: "Error",
          memoryUsage: "Error",
          diskUsage: "Error"
        });
      }
    };

    const intervalId = setInterval(fetchServerStatus, 5000);

    // Fetch server status immediately when component mounts
    fetchServerStatus();

    return () => clearInterval(intervalId);
  }, [serverUrl]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-4">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
      <button
        onClick={toggleDetails}
        className="mb-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="text-gray-700 dark:text-gray-400">
          <div className="mb-4">
            <p className="text-gray-500">Uptime:</p>
            <p>{serverStatus.uptime} seconds</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-500">CPU Usage:</p>
            <p>{serverStatus.cpuUsage}%</p>
            <div className="h-2 bg-gray-200 rounded-md overflow-hidden">
              <div
                style={{ width: `${serverStatus.cpuUsage}%` }}
                className="h-full bg-blue-500 transition-all duration-500"
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-gray-500">Memory Usage:</p>
            <p>{serverStatus.memoryUsage}%</p>
            <div className="h-2 bg-gray-200 rounded-md overflow-hidden">
              <div
                style={{ width: `${serverStatus.memoryUsage}%` }}
                className="h-full bg-green-500 transition-all duration-500"
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-gray-500">Disk Usage:</p>
            <p>{serverStatus.diskUsage}%</p>
            <div className="h-2 bg-gray-200 rounded-md overflow-hidden">
              <div
                style={{ width: `${serverStatus.diskUsage}%` }}
                className="h-full bg-yellow-500 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ApplicationServers = () => {
  return (
    <div className="mt-8 flex justify-center">
      <ApplicationServerStatus serverUrl="http://localhost:5000/health" title="Application Server 1 Status" />
      <ApplicationServerStatus serverUrl="http://localhost:5001/health" title="Application Server 2 Status" />
      <ApplicationServerStatus serverUrl="http://localhost:5002/health" title="Application Server 3 Status" />
      <ApplicationServerStatus serverUrl="http://localhost:5003/health" title="Application Server 4 Status" />
    </div>
  );
};

  

export default ApplicationServers;
