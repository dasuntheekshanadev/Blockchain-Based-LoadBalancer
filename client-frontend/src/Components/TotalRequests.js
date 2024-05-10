import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplicationServers = () => {
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const fetchTotalRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3001/total-requests");
        setTotalRequests(response.data.totalRequests);
      } catch (error) {
        console.error("Error fetching total requests:", error);
      }
    };

    fetchTotalRequests();
  }, []);

  return (
    <div>
      <h2>Total Requests Handled: {totalRequests}</h2>
      {/* Add your other server status components here */}
    </div>
  );
};

export default ApplicationServers;
