#!/bin/bash

# Endpoint URLs
BASE_URL="http://localhost:5000"
HEALTH_ENDPOINT="$BASE_URL/health"

# Function to make a GET request and print response
function make_request {
  local url="$1"
  local response=$(curl -s "$url")
  echo "$response"
}

# Infinite loop to send requests
while true; do
  echo "Request to /:"
  make_request "$BASE_URL"
  
  echo -e "\nRequest to /health:"
  make_request "$HEALTH_ENDPOINT"
  
  # Add a delay between requests (optional)
  sleep 1
done

