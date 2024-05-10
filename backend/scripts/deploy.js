const { ethers } = require("hardhat");
const express = require("express");
const cors = require("cors");
const Mutex = require('async-mutex').Mutex; // Import the Mutex for locking

async function main() {
  const mutex = new Mutex(); // Create a mutex instance

  // Deploy the ApplicationServers contract
  const ApplicationServersFactory = await ethers.getContractFactory("ApplicationServers");
  const serverUrls = ["http://localhost:5000", "http://localhost:5001", "http://localhost:5002", "http://localhost:5003"];
  const applicationServersContract = await ApplicationServersFactory.deploy(serverUrls);

  console.log("ApplicationServers contract deployed at:", applicationServersContract.address);

  // Set up the Express server
  const app = express();
  let serverUrl;

  // Enable CORS
  app.use(cors());

  // API endpoint for redirection
  app.get("/", async (req, res) => {
    try {
      // Acquire lock
      const release = await mutex.acquire();
      
      // Retrieve the next server URL from the contract based on load
      serverUrl = await applicationServersContract.getNextServerUrl();
      console.log(`Redirecting request to server: ${serverUrl}`);
      res.redirect(serverUrl);

      // Update request count for the chosen server
      await applicationServersContract.incrementRequestCount(serverUrl);
      
      // Retrieve total requests handled from the contract
      const totalRequestsHandled = await applicationServersContract.totalRequestsHandled();
      console.log(`Total requests handled: ${totalRequestsHandled}`);
      
      // Release the lock
      release();
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  // Endpoint to get the total requests handled
  app.get("/total-requests", async (req, res) => {
    try {
      // Retrieve total requests handled from the contract
      const totalRequestsHandled = await applicationServersContract.totalRequestsHandled();
      // Convert BigInt to string
      const totalRequestsString = totalRequestsHandled.toString();
      res.json({ totalRequests: totalRequestsString });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
  });
}

main()
  .then(() => {})
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
