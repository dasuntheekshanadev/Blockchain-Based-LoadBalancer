#!/bin/bash

# Number of requests to send
NUM_REQUESTS=100

# URL of the server
SERVER_URL="http://localhost:3001"

# Function to send requests
send_requests() {
  for ((i = 0; i < $NUM_REQUESTS; i++)); do
    curl -s -o /dev/null -w "%{http_code}\n" $SERVER_URL &
  done
  wait
}

# Main function
main() {
  echo "Sending $NUM_REQUESTS requests to $SERVER_URL..."
  send_requests
  echo "Requests sent."
}

main
