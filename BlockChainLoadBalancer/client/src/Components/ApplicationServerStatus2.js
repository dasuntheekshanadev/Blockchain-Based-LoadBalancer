import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplicationServerStatus2 = () => {
  const [serverStatus, setServerStatus] = useState({
    uptime: null,
    cpuUsage: null,
    memoryUsage: null,
    diskUsage: null
  });

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5001/health");
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

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Application Server 2 Status </h1>
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-white">Server Status</h2>
          <div className="text-white">
            <div className="mb-4">
              <p className="text-gray-300">Uptime:</p>
              <p>{serverStatus.uptime} seconds</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-300">CPU Usage:</p>
              <p>{serverStatus.cpuUsage}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-300">Memory Usage:</p>
              <p>{serverStatus.memoryUsage}</p>
            </div>
            <div>
              <p className="text-gray-300">Disk Usage:</p>
              <p>{serverStatus.diskUsage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationServerStatus2;
