//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Greeter is ERC20 {
    constructor(uint256 initialBalance) public ERC20("Basic", "BSC") {
        _mint(msg.sender, initialBalance);
    }
}
