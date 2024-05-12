import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaServer, FaChartPie } from 'react-icons/fa'; // Added an icon for the Dashboard

const NavigationBar = () => {
  return (
    <nav className="bg-gradient-to-r from-stone-800 to-stone-700 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-white text-xl font-bold">Blockchain Based Load Balancer</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300 flex items-center space-x-2 transition duration-200 ease-in-out transform hover:scale-110">
            <FaHome size={20} />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link to="/servers" className="text-white hover:text-gray-300 flex items-center space-x-2 transition duration-200 ease-in-out transform hover:scale-110">
            <FaServer size={20} />
            <span className="hidden sm:inline">Application Servers</span>
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300 flex items-center space-x-2 transition duration-200 ease-in-out transform hover:scale-110">
            <FaChartPie size={20} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link to="/serverstat" className="text-white hover:text-gray-300 flex items-center space-x-2 transition duration-200 ease-in-out transform hover:scale-110">
            <FaChartPie size={20} />
            <span className="hidden sm:inline">Server Status</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
