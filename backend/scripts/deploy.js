const { ethers } = require("hardhat");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Mutex = require('async-mutex').Mutex;
require("dotenv").config();

// MongoDB setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Could not connect to MongoDB", err);
  process.exit(1);
});

const totalRequestSchema = new mongoose.Schema({
  totalRequests: Number,
  timestamp: { type: Date, default: Date.now }
});

const TotalRequest = mongoose.model('TotalRequest', totalRequestSchema);

async function main() {
  const mutex = new Mutex();

  const ApplicationServersFactory = await ethers.getContractFactory("ApplicationServers");
  const serverUrls = ["http://localhost:5000", "http://localhost:5001", "http://localhost:5002", "http://localhost:5003"];
  const applicationServersContract = await ApplicationServersFactory.deploy(serverUrls);

  console.log("ApplicationServers contract deployed at:", applicationServersContract.address);

  const app = express();
  app.use(cors());

  app.get("/", async (req, res) => {
    try {
      const release = await mutex.acquire();
      const serverUrl = await applicationServersContract.getNextServerUrl();
      console.log(`Redirecting request to server: ${serverUrl}`);
      res.redirect(serverUrl);

      await applicationServersContract.incrementRequestCount(serverUrl);
      const totalRequestsHandled = await applicationServersContract.totalRequestsHandled();
      console.log(`Total requests handled: ${totalRequestsHandled}`);

      // Save to MongoDB
      await TotalRequest.create({ totalRequests: parseInt(totalRequestsHandled.toString()) });

      release();
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/total-requests", async (req, res) => {
    try {
      const totalRequestsHandled = await applicationServersContract.totalRequestsHandled();
      const totalRequestsString = totalRequestsHandled.toString();

      // Save/Update the total requests handled in MongoDB
      const newTotalRequest = new TotalRequest({ totalRequests: parseInt(totalRequestsString) });
      await newTotalRequest.save();

      res.json({ totalRequests: totalRequestsString });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/total-requests-history", async (req, res) => {
    try {
      const history = await TotalRequest.find().sort({ timestamp: 1 }); // Retrieve and sort by timestamp
      res.json(history.map(item => ({
        totalRequests: item.totalRequests,
        timestamp: item.timestamp
      })));
    } catch (error) {
      console.error("Error fetching total requests history:", error.message);
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
