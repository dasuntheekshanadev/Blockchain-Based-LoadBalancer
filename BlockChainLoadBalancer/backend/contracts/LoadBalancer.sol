// SPDX-License-Identifier: MIT 
// LoadBalancer.sol
pragma solidity ^0.8.19;

contract LoadBalancer {
    address[] private applicationServers;
    uint256 private currentIndex;

    constructor(address[] memory _servers) {
        applicationServers = _servers;
        currentIndex = 0;
    }

    function getNextServer() public returns (address) {
        currentIndex = (currentIndex + 1) % applicationServers.length;
        return applicationServers[currentIndex];
    }
}
