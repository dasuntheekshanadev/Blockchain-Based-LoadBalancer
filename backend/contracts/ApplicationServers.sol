// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract ApplicationServers {
    string[] private serverUrls;
    uint private currentIndex;

    constructor(string[] memory _serverUrls) {
        serverUrls = _serverUrls;
        currentIndex = 0;
    }

    function getServerUrl() public view returns (string memory) {
        require(serverUrls.length > 0, "No servers available");
        return serverUrls[currentIndex];
    }

    function nextServer() public {
        require(serverUrls.length > 0, "No servers available");
        currentIndex = (currentIndex + 1) % serverUrls.length;
    }
}
