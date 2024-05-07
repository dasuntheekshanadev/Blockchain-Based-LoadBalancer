// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract ApplicationServers {
    struct ServerInfo {
        string url;
        uint requestCount;
    }

    ServerInfo[] private servers;

    constructor(string[] memory _serverUrls) {
        for (uint i = 0; i < _serverUrls.length; i++) {
            servers.push(ServerInfo({
                url: _serverUrls[i],
                requestCount: 0
            }));
        }
    }

    function getNextServerUrl() public view returns (string memory) {
    require(servers.length > 0, "No servers available");

    uint minRequestCount = servers[0].requestCount;
    uint minIndex = 0;

    for (uint i = 1; i < servers.length; i++) {
        if (servers[i].requestCount < minRequestCount) {
            minRequestCount = servers[i].requestCount;
            minIndex = i;
        }
    }

    return servers[minIndex].url;
}


    function incrementRequestCount(string memory serverUrl) public {
        for (uint i = 0; i < servers.length; i++) {
            if (keccak256(abi.encodePacked(servers[i].url)) == keccak256(abi.encodePacked(serverUrl))) {
                servers[i].requestCount++;
                break;
            }
        }
    }
}
