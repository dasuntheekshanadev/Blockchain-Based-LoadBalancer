const express = require("express");
const cors = require("cors");
const os = require("os");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// Hardcoded server ID
const serverId = 1; // Change this to the appropriate server ID for each instance

// Create a dynamic collection name based on the server ID
const collectionName = `applicationserver${serverId}`;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Connected to MongoDB for Application Server ${serverId}🚬`);
}).catch((error) => {
  console.error(`Error connecting to MongoDB for Application Server ${serverId}:`, error);
  process.exit(1);
});

const requestSchema = new mongoose.Schema({
  count: Number,
  timestamp: { type: Date, default: Date.now }
});

// Use dynamic collection name
const Request = mongoose.model("Request", requestSchema, collectionName);

app.use(cors()); // Enable CORS for all routes

let requestCount = 0;

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to log system information
function getSystemInfo() {
  // Uptime
  const uptime = os.uptime();

  // CPU Usage
  const cpuUsage = os.loadavg()[0]; // 1 minute load average

  // Memory Usage
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  // Disk Usage
  const diskUsage = os.freemem();
  const totalDisk = os.totalmem();
  const usedDisk = totalDisk - diskUsage;

  return {
      uptime,
      cpuUsage: cpuUsage.toFixed(2) + '%',
      memoryUsage: formatBytes(usedMemory) + ' / ' + formatBytes(totalMemory),
      diskUsage: formatBytes(usedDisk) + ' / ' + formatBytes(totalDisk)
  };
}

app.get("/", (req, res) => {
  requestCount++;
  res.send(`Hello from Application Server ${serverId}!`);
});

app.get("/health", async (req, res) => {
  try {
    // Save request count to MongoDB
    const insertedDoc = await Request.create({ count: requestCount });
    
    // Log inserted document
    console.log("Inserted document:", insertedDoc);
    
    // Get system information
    const systemInfo = getSystemInfo();
    systemInfo.requestCount = requestCount;

    // Send system information as response
    res.json(systemInfo);
  } catch (error) {
    console.error("Error inserting document:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/data", async (req, res) => {
  try {
    // Query the MongoDB collection to get all documents
    const data = await Request.find();

    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Application Server ${serverId} listening on port ${PORT}`);
});
