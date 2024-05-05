// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ServerRegistry {
    string[] public serverURLs;

    function addServerURL(string memory url) public {
        serverURLs.push(url);
    }

    function getServerURLs() public view returns (string[] memory) {
        return serverURLs;
    }
}
