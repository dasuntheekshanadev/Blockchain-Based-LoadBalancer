const { ethers } = require("hardhat");
const express = require("express");

async function main() {
  // Deploy the ApplicationServers contract
  const ApplicationServersFactory = await ethers.getContractFactory("ApplicationServers");
  const serverUrls = ["http://localhost:5000", "http://localhost:5001"];
  const applicationServersContract = await ApplicationServersFactory.deploy(serverUrls);

  console.log("ApplicationServers contract deployed at:", applicationServersContract.address);

  // Set up the Express server
  const app = express();
  let serverUrl;

  // API endpoint for redirection
  app.get("/", async (req, res) => {
    try {
      // Retrieve the next server URL from the contract
      serverUrl = await applicationServersContract.getServerUrl();
      console.log(`Redirecting request to server: ${serverUrl}`);
      res.redirect(serverUrl);
      
      // Move to the next server for next request
      await applicationServersContract.nextServer();
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