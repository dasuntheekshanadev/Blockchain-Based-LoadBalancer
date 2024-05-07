// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract StringArrays {
    string[] private stringArray;

    constructor() {
        stringArray.push("Hello");
        stringArray.push("World");
    }

    function getStringArray() public view returns (string[] memory) {
        return stringArray;
    }
}
