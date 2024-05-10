import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaServer } from 'react-icons/fa'; // Importing icons from react-icons library

const NavigationBar = () => {
  return (
    <nav className="bg-gradient-to-r from-stone-800 to-stone-700 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Blockchain Based Load Balancer</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300 flex items-center space-x-1">
            <FaHome />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link to="/servers" className="text-white hover:text-gray-300 flex items-center space-x-1">
            <FaServer />
            <span className="hidden sm:inline">Application Servers</span>
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300 flex items-center space-x-1">
            <FaServer />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
