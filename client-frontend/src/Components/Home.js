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
    const intervalId = setInterval(fetchTotalRequests, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Total Requests Handled</h2>
      <div className="text-3xl font-bold text-blue-500">{totalRequests}</div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Blockchain Based Load Balancer Dashboard</h1>
        <ApplicationServers />
        {/* <div className="mt-8">
          <iframe src="https://giphy.com/embed/3o6ZtoqsuHrNBmj3NK" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/netflix-3o6ZtoqsuHrNBmj3NK">via GIPHY</a></p>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
