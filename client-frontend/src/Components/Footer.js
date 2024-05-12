import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Importing social media icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-stone-800 to-stone-700 text-white py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <p className="text-center md:text-left">© 2024 Blockchain Based Load Balancer. All rights reserved.</p>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="https://github.com/dasuntheekshanadev/Blockchain-Based-LoadBalancer" className="hover:text-gray-300 transition duration-200 ease-in-out">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com" className="hover:text-gray-300 transition duration-200 ease-in-out">
            <FaLinkedin size={24} />
          </a>
          <a href="dasuntheekshana12@gmail.com" className="hover:text-gray-300 transition duration-200 ease-in-out">
            <FaEnvelope size={24} />
          </a>
        </div>
        <div className="flex justify-center mt-4 md:mt-0">
          <Link to="#" className="text-white hover:text-gray-300 mx-2">Privacy Policy</Link>
          <Link to="#" className="text-white hover:text-gray-300 mx-2">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
